import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Text, View} from './Themed';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import {SITE_ROOT} from '../../global';

interface ModalProp {
  isVisible: boolean;
  data: any;
  title: string;
  onClose: () => void;
}

const ModalUsers: React.FC<ModalProp> = ({isVisible, data, title, onClose}) => {
  const default_avatar = `${SITE_ROOT}/uploads/2024/07/default_avatar.jpg`;

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
            <View style={[styles.tabContainer, Typography.mb]}>
              <View style={[styles.buttonWrapper]}>
                <Text style={[Typography.size, Typography.textCenter]}>
                  Users
                </Text>
              </View>
              <View style={[styles.buttonWrapperMuted]}>
                <Text
                  style={[
                    Typography.size,
                    Typography.textCenter,
                    Typography.muted,
                  ]}>
                  Artists
                </Text>
              </View>
            </View>
            <FlatList
              data={data}
              scrollEnabled={true}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View key={index} style={[Typography.flex, Typography.mb]}>
                    <Image
                      source={{uri: item.avatar_url || default_avatar}}
                      style={styles.gridImage}
                    />
                    <View style={styles.wrap}>
                      <Text
                        style={[
                          Typography.text,
                          Typography.size,
                          Typography.bold,
                        ]}>
                        {item.user_display_name} {item.online}
                      </Text>
                    </View>
                  </View>
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
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    borderRadius: 0,
    borderColor: '#fdf15d',
    paddingBottom: 7,
    borderBottomWidth: 2,
  },
  buttonWrapperMuted: {
    flex: 1,
    margin: 4,
    justifyContent: 'center',
    borderRadius: 0,
    borderColor: 'transparent',
    paddingBottom: 7,
    borderBottomWidth: 2,
  },
});

export default ModalUsers;
