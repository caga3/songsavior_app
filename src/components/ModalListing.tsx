import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Text, View} from './Themed';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import StarsIcon from '../constants/icons/StarsIcon';

const default_song = require('../assets/images/card-image.jpg');

interface ModalProp {
  isVisible: boolean;
  data: any;
  title: string;
  hasVotes?: boolean;
  navigation: any;
  onClose: () => void;
}
interface StarsIconProps {
  rating: number;
}

const StarRating: React.FC<StarsIconProps> = ({rating}) => {
  const maxStars = 5;
  return (
    <View style={Typography.flex}>
      {Array.from({length: maxStars}, (_, index) => (
        <StarsIcon
          key={index}
          fill={index < rating ? '#fdf15d' : '#717172'}
          width="18"
          height="18"
        />
      ))}
    </View>
  );
};

const ModalListing: React.FC<ModalProp> = ({
  isVisible,
  data,
  title,
  hasVotes,
  navigation,
  onClose,
}) => {
  const handlePlayerScreen = ($item: string) => {
    navigation.navigate('PlayerRating', {
      allow: false,
      item: $item,
      filter: 'track',
      redirect: 'Charts',
    });
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={[styles.modalContent]}>
          <TouchableOpacity
            style={{paddingTop: 15, width: 40, zIndex: 1}}
            onPress={onClose}>
            <IconSvg
              stroke={false}
              fill="#fff"
              path="M20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303L8.24264 17.3033C8.53553 17.5962 9.01041 17.5962 9.3033 17.3033C9.59619 17.0104 9.59619 16.5355 9.3033 16.2426L5.06066 12L9.3033 7.75736C9.59619 7.46447 9.59619 6.98959 9.3033 6.6967C9.01041 6.40381 8.53553 6.40381 8.24264 6.6967L3.46967 11.4697ZM20 11.25H4V12.75H20V11.25Z"
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={[Typography.h3, Typography.textCenter]}>{title}</Text>
          </View>
          <View style={styles.wrapper}>
            <FlatList
              data={data}
              scrollEnabled={true}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    key={index}
                    style={[Typography.flex, Typography.mb]}
                    onPress={() => handlePlayerScreen(item.song_id)}>
                    <Image
                      source={{uri: item.image || default_song}}
                      style={styles.gridImage}
                    />
                    <View style={styles.wrap}>
                      <Text
                        style={[
                          Typography.text,
                          Typography.size,
                          Typography.bold,
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                    {hasVotes && item.vote && (
                      <View style={Typography.flex}>
                        <StarRating rating={item.vote} />
                      </View>
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    paddingBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    height: '100%',
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 0,
    fontSize: 14,
    backgroundColor: '#131314',
  },
  gridImage: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    width: 56,
    height: 56,
  },
  title: {
    position: 'absolute',
    zIndex: 0,
    top: 35,
    right: 0,
    left: 0,
    margin: 'auto',
  },
  wrap: {
    width: '56%',
  },
});

export default ModalListing;
