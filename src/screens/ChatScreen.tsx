import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Text, TextInput, View} from '../components/Themed';
import Typography from '../constants/Typography';
import GoBack from '../components/GoBack';
import IconSvg from '../components/IconsSvg';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import {formatTimestamp} from '../constants/Helper';
import io from 'socket.io-client';
import RestApiServer from '../constants/RestApiServer';
import {SOCKET_URL, SITE_ROOT} from '../../global';

interface Info {
  ID: string;
  avatar_url: string;
  user_display_name: string;
}

interface DataItem {
  conversation_id: number;
  created_at: string;
  id?: number;
  info: Info;
  sender_id: number;
  text: string;
}

type RootStackParamList = {
  Chat: {conversationId: number};
};
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const socket = io(SOCKET_URL);
  const [loading, setLoading] = useState(true);
  const route = useRoute<ChatScreenRouteProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<DataItem[]>([]);
  const {userInfo, userToken} = useAuth();
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;
  const default_avatar = `${SITE_ROOT}/uploads/2024/07/default_avatar.jpg`;

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: false});
  };

  const handleSendMessage = async () => {
    const convId = route.params.conversationId;
    if (getUserInfo) {
      if (newMessage.trim() !== '') {
        await RestApiServer.sendMessages(
          convId,
          getUserInfo.id,
          newMessage,
          userToken,
        );
        const messageObj = {
          conversation_id: convId,
          created_at: new Date(),
          id: messages.length + 1,
          info: {
            ID: getUserInfo.id,
            avatar_url: getUserInfo.avatar_url,
            user_display_name: getUserInfo.user_display_name,
          },
          sender_id: getUserInfo.id,
          text: newMessage,
        };
        socket.emit('message', messageObj);
        setNewMessage('');
      }
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (userToken && route.params) {
        const convId = route.params.conversationId;
        const msg = await RestApiServer.fetchMessages(convId, userToken);
        setMessages(msg);
        scrollToBottom();
        setLoading(false);
      }
    };
    fetchMessages();
    socket.connect();
    socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
      scrollToBottom();
    });
    return () => {
      socket.disconnect();
      setMessages([]);
    };
  }, []);

  const renderItem = ({item}: {item: DataItem}) => (
    <View style={styles.message}>
      {item.info.ID !== getUserInfo.id ? (
        <>
          <Image
            source={{
              uri: item.info.avatar_url || default_avatar,
            }}
            style={styles.profileImg}
          />
          <View style={{flex: 1}}>
            <View style={{flex: 1, ...Typography.flexTop}}>
              <View style={[Typography.card, Typography.mb0]}>
                <Text style={Typography.size1}>{item.text}</Text>
              </View>
              <Text style={Typography.text4}>
                {formatTimestamp(new Date(item.created_at).getTime())}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 1, ...Typography.flexBottom}}>
            <View style={[Typography.card, Typography.mb0]}>
              <Text style={Typography.size1}>{item.text}</Text>
            </View>
            <Text style={[Typography.text4, Typography.textEnd]}>
              {formatTimestamp(new Date(item.created_at).getTime())}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={Typography.vertCenter}>
        <ActivityIndicator
          size={'large'}
          color="rgba(255,255,255, 0.35)"
          style={{opacity: 0.35, height: 400}}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, ...Typography.container}}>
        <GoBack />
        {messages && (
          <>
            <View style={styles.userMessage}>
              <View style={Typography.flex}>
                <Image
                  source={{
                    uri: messages[0]?.info?.avatar_url || default_avatar,
                  }}
                  style={styles.profileImg}
                />
                <View>
                  <Text style={[Typography.h3, Typography.mb0, Typography.mt3]}>
                    {getUserInfo.user_display_name}
                  </Text>
                  <Text style={Typography.text4}>Active Now</Text>
                </View>
              </View>
            </View>
            <ScrollView
              style={styles.scrollView}
              ref={scrollViewRef}
              onContentSizeChange={scrollToBottom}>
              <FlatList
                style={styles.listInvert}
                scrollEnabled={false}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputGap}
          value={newMessage}
          placeholder="Type your message..."
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          style={[Typography.button, styles.send]}
          onPress={handleSendMessage}>
          <IconSvg
            path="M10.3209 14L21.3209 3M10.3209 14L13.8209 21C13.8647 21.0957 13.9352 21.1769 14.0238 21.2338C14.1125 21.2906 14.2156 21.3209 14.3209 21.3209C14.4262 21.3209 14.5293 21.2906 14.6179 21.2338C14.7066 21.1769 14.777 21.0957 14.8209 21L21.3209 3M10.3209 14L3.32087 10.5C3.22513 10.4561 3.144 10.3857 3.08712 10.2971C3.03024 10.2084 3 10.1053 3 10C3 9.89468 3.03024 9.79158 3.08712 9.70295C3.144 9.61431 3.22513 9.54387 3.32087 9.5L21.3209 3"
            width="24"
            height="24"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userMessage: {
    position: 'relative',
    left: 40,
    top: 2,
  },
  listInvert: {
    flex: 1,
    transform: [{scaleY: -1}],
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 36,
    transform: [{scaleY: -1}],
  },
  message: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputGap: {
    marginBottom: 0,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 7,
    backgroundColor: '#131314',
  },
  send: {
    position: 'absolute',
    right: 17,
    bottom: 17,
    borderRadius: 8,
    padding: 6,
  },
});

export default ChatScreen;
