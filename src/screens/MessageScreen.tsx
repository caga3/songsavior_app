import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Text, TextInput, View} from '../components/Themed';
import Typography from '../constants/Typography';
import GoBack from '../components/GoBack';
import AddIcon from '../constants/icons/AddIcon';
import IconSvg from '../components/IconsSvg';
import RestApiServer from '../constants/RestApiServer';
import {formatTimestamp} from '../constants/Helper';
import {useAuth} from '../context/AuthContext';
import {SITE_ROOT} from '../../global';
interface Info {
  ID: number;
  avatar_url: string;
  user_display_name: string;
}

interface DataItem {
  created_at: string;
  id: number;
  info: Info;
  sender_id: number;
  recipient_id: number;
  text: string;
}
interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const MessageScreen: React.FC<Props> = ({navigation}) => {
  const {userInfo, userToken} = useAuth();
  const [loading, setLoading] = useState(true);
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;
  const default_avatar = `${SITE_ROOT}/uploads/2024/07/default_avatar.jpg`;
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<DataItem[]>([]);

  const handleGoChat = () => {
    navigation.navigate('ChatScreen');
  };

  const fetchConversations = async () => {
    if (getUserInfo.id && userToken) {
      const msg = await RestApiServer.fetchConversations(
        getUserInfo.id,
        userToken,
      );
      setConversations(msg);
      setLoading(false);
    }
  };

  const searchMessages = async (text: string) => {
    try {
      setSearch(text);
      if (text.length > 2) {
        const msgs = await RestApiServer.filterConversations(
          getUserInfo.id,
          text,
          userToken,
        );
        setConversations(msgs);
      } else if (text.length === 0) {
        const msg = await RestApiServer.fetchConversations(
          getUserInfo.id,
          userToken,
        );
        setConversations(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const renderItem = ({item}: {item: DataItem}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatScreen', {
          conversationId: item.id,
        })
      }>
      <View style={styles.message}>
        <Image
          source={{
            uri: item.info.avatar_url || default_avatar,
          }}
          style={styles.profileImg}
        />
        <View style={{flex: 1}}>
          <Text style={[Typography.h3, Typography.mb0]}>
            {item.info.user_display_name}
          </Text>
          <View style={Typography.flexAroundStart}>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={[Typography.size1, Typography.text4]}>
                {item.text}
              </Text>
            </View>
            <View>
              <Text style={[Typography.size1, Typography.text4]}>
                {formatTimestamp(new Date(item.created_at).getTime())}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, ...Typography.container}}>
        <GoBack />
        <View style={Typography.headerWrapper}>
          <Text style={[Typography.h3, Typography.textCenter]}>MESSAGES</Text>
        </View>
        <TouchableOpacity style={Typography.menuRight} onPress={handleGoChat}>
          <AddIcon />
        </TouchableOpacity>
        <View style={{position: 'relative'}}>
          <IconSvg
            style={styles.searchIcon}
            path="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            width="24"
            height="24"
          />
        </View>
        <TextInput
          style={styles.inputGap}
          placeholder="Search"
          value={search}
          onChangeText={text => searchMessages(text)}
        />
        <View style={styles.scrollView}>
          <FlatList
            data={conversations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    top: 16,
    left: 15,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    marginTop: 15,
    marginBottom: -20,
  },
  message: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  inputGap: {
    marginTop: 0,
    marginBottom: 10,
    paddingLeft: 50,
  },

  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
});

export default MessageScreen;
