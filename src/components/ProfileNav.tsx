import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootAppStackParamList} from '../types/types';

import {View} from './Themed';
import {useAuth} from '../context/AuthContext';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';

interface ProfileProp {
  show?: boolean;
}

type ProfileScreenProp = NativeStackNavigationProp<RootAppStackParamList>;

const ProfileNav: React.FC<ProfileProp> = ({show = true}) => {
  const navigation = useNavigation<ProfileScreenProp>();
  const {userInfo} = useAuth();
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleMesages = () => {
    navigation.navigate('Messages');
  };

  return (
    <View style={[show && getUserInfo && styles.offSet, Typography.menuRight]}>
      <View style={styles.wrapper}>
        {show && getUserInfo && (
          <TouchableOpacity onPress={handleProfile}>
            <Image
              source={{uri: getUserInfo.avatar}}
              style={[styles.gridImage]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.messages} onPress={handleMesages}>
          <IconSvg path="M12 12V12.01M8 12V12.01M16 12V12.01M3 20L4.3 16.1C3.17644 14.4383 2.76999 12.4704 3.15622 10.5623C3.54244 8.65419 4.69506 6.93567 6.39977 5.72628C8.10447 4.51688 10.2453 3.8989 12.4241 3.98724C14.6029 4.07559 16.6715 4.86424 18.2453 6.20656C19.819 7.54889 20.7909 9.35354 20.9801 11.285C21.1693 13.2164 20.563 15.1432 19.2739 16.7071C17.9848 18.271 16.1007 19.3656 13.9718 19.7874C11.8429 20.2091 9.6142 19.9293 7.7 19L3 20Z" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offSet: {
    position: 'relative',
    marginTop: -7,
  },
  wrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messages: {
    width: 40,
    height: 40,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ProfileNav;
