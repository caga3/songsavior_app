import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootAppStackParamList} from '../types/types';
import {Button, Text, TextInput, View} from '../components/Themed';
import {useAuth} from '../context/AuthContext';
import HBars from '../constants/icons/HBarIcon';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import {launchImageLibrary} from 'react-native-image-picker';
import ModalFull from './ModalFull';

interface ProfileProp {
  show?: boolean;
}
interface ImageAsset {
  uri: string;
  type: string;
  fileName: string;
  extension: string;
}

type ProfileScreenProp = NativeStackNavigationProp<RootAppStackParamList>;

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const ProfileNav: React.FC<ProfileProp> = ({show = true}) => {
  const navigation = useNavigation<ProfileScreenProp>();
  const {userInfo, setLogout, setProfile} = useAuth();

  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [successProfileMessage, setSuccessProfileMessage] = useState('');
  const [failedProfileMessage, setFailedProfileMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const getUserInfo =
    typeof userInfo === 'string' ? JSON.parse(userInfo) : null;

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleMesages = () => {
    navigation.navigate('Messages');
  };

  const editProfile = () => {
    setSelectedImage(null);
    setSuccessProfileMessage('');
    setFailedProfileMessage('');
    setModalEditVisible(true);
  };

  const updateProfile = async () => {
    setSuccessProfileMessage('');
    setFailedProfileMessage('');
    // Push Updates
    const responds = await setProfile(
      getUserInfo.id,
      displayName,
      password,
      selectedImage,
    );
    setDisplayName('');
    setPassword('');
    // console.log('PROFILENAV', responds);
    if (responds) {
      setSuccessProfileMessage('Profile has been updated.');
    } else {
      setFailedProfileMessage('Profile failed to update.');
    }
  };

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel || response.errorMessage) {
        setSelectedImage(null);
        return;
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        if (!image.uri || !image.type || !image.fileName) {
          setFailedProfileMessage('Invalid image file. Please try again.');
          setSelectedImage(null);
          return;
        }
        // Extract file extension
        const extension = image.fileName.split('.').pop()?.toLowerCase();
        if (!extension || !ALLOWED_FILE_TYPES.includes(extension)) {
          setFailedProfileMessage(
            'Invalid image file. Please select a JPG, PNG, or GIF file.',
          );
          return;
        }
        setSelectedImage({
          uri: image.uri,
          type: image.type,
          fileName: image.fileName,
          extension,
        });
      }
    });
  };

  return (
    <>
      <View
        style={[show && getUserInfo && styles.offSet, Typography.menuRight]}>
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
          {!show && getUserInfo && (
            <TouchableOpacity style={styles.edit} onPress={editProfile}>
              <IconSvg
                path="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                path2="m19.622 10.395l-1.097-2.65L20 6l-2-2l-1.735 1.483l-2.707-1.113L12.935 2h-1.954l-.632 2.401l-2.645 1.115L6 4L4 6l1.453 1.789l-1.08 2.657L2 11v2l2.401.656L5.516 16.3L4 18l2 2l1.791-1.46l2.606 1.072L11 22h2l.604-2.387l2.651-1.098C16.697 18.832 18 20 18 20l2-2l-1.484-1.75l1.098-2.652l2.386-.62V11z"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.messages} onPress={handleMesages}>
            <IconSvg path="M12 12V12.01M8 12V12.01M16 12V12.01M3 20L4.3 16.1C3.17644 14.4383 2.76999 12.4704 3.15622 10.5623C3.54244 8.65419 4.69506 6.93567 6.39977 5.72628C8.10447 4.51688 10.2453 3.8989 12.4241 3.98724C14.6029 4.07559 16.6715 4.86424 18.2453 6.20656C19.819 7.54889 20.7909 9.35354 20.9801 11.285C21.1693 13.2164 20.563 15.1432 19.2739 16.7071C17.9848 18.271 16.1007 19.3656 13.9718 19.7874C11.8429 20.2091 9.6142 19.9293 7.7 19L3 20Z" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalFull
        isVisible={modalEditVisible}
        onClose={() => setModalEditVisible(false)}>
        <View>
          <Text
            style={[Typography.size2, Typography.textCenter, Typography.mb]}>
            Update Profile
          </Text>
          <HBars style={Typography.mb} />
          <Text style={modal.label}>Display Name</Text>
          <TextInput
            placeholder="Display Name"
            value={displayName}
            onChangeText={text => setDisplayName(text)}
          />
          <Text style={modal.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Text style={modal.label}>Profile Image</Text>
          <View>
            <Button
              style={[Typography.button, uploadStyle.button]}
              label="Upload Image"
              onPress={pickImage}
            />
            {selectedImage && (
              <Image
                source={{uri: selectedImage.uri}}
                style={uploadStyle.image}
              />
            )}
          </View>
          {successProfileMessage && (
            <View style={modal.alertSuccess}>
              <Text style={modal.alertSuccessTxt}>{successProfileMessage}</Text>
            </View>
          )}
          {failedProfileMessage && (
            <View style={modal.alertFail}>
              <Text style={modal.alertFailTxt}>{failedProfileMessage}</Text>
            </View>
          )}
          <Button
            style={[Typography.button, modal.buttonModalContainer]}
            label="Update Profile"
            onPress={updateProfile}
          />
          <Button
            style={[
              Typography.button,
              Typography.mt,
              modal.buttonModalContainer,
            ]}
            label="Logout"
            onPress={setLogout}
          />
        </View>
      </ModalFull>
    </>
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
  edit: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messages: {
    width: 40,
    height: 40,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

const modal = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 7,
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
  alertSuccess: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 148, 15, 0.6)',
    borderRadius: 16,
    width: '100%',
  },
  alertSuccessTxt: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
  },
  alertFail: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 16,
    width: '100%',
  },
  alertFailTxt: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
  },
});

const uploadStyle = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#303030',
  },
  button: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 165, 243, 0.05)',
    borderWidth: 2,
    borderColor: '#1277a5',
    borderStyle: 'dashed',
  },
  message: {
    marginTop: 10,
    color: 'blue',
  },
});

export default ProfileNav;
