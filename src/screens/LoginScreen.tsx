import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAuth} from '../context/AuthContext';
import {Text, View, TextInputIcon, ButtonIcon} from '../components/Themed';
import Typography from '../constants/Typography';
interface Props {
  navigation: {
    navigate: (screenName: string) => void;
  };
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [emailaddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userToken, setLogIn} = useAuth();

  const handleLogin = () => {
    if (emailaddress === '' || password === '') {
      Alert.alert('Error', 'Username and password are required');
    } else {
      setEmail('');
      setPassword('');
      setLogIn(emailaddress, password);
    }
  };
  const goToRegister = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    const checkScreen = async () => {
      if (!userToken) {
        setTimeout(function () {
          setIsOpaque(true);
        }, 1000);
      }
    };
    checkScreen();
  }, []);

  return (
    <>
      <Image
        source={require('../assets/images/login_bkg.jpg')}
        style={[Typography.backgroundImage, styles.backgroundImage]}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        extraHeight={100}>
        <ScrollView
          contentContainerStyle={
            (isOpaque ? styles.opaque : styles.transparent,
            {flexGrow: 1, justifyContent: 'center'})
          }>
          <View style={Typography.containerTrans}>
            <View>
              <Image
                source={require('../assets/images/songsavior-logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
              <Text
                style={[
                  Typography.h1,
                  Typography.textCenter,
                  Typography.highlight,
                ]}>
                Welcome
              </Text>
              <Text
                style={[
                  Typography.textCenter,
                  Typography.size1,
                  Typography.muted,
                  styles.gap,
                ]}>
                Login to access your account
              </Text>
              <TextInputIcon
                iconPath="M6.168 18.849C6.41551 18.0252 6.92197 17.3032 7.61225 16.79C8.30252 16.2768 9.13985 15.9997 10 16H14C14.8613 15.9997 15.6996 16.2774 16.3904 16.7918C17.0812 17.3062 17.5875 18.0298 17.834 18.855M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                iconColor="#fdf15d"
                style={Typography.mb}
                placeholder="Username or Email Address"
                value={emailaddress}
                onChangeText={text => setEmail(text)}
              />
              <TextInputIcon
                iconPath="M4 8V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M4 16V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16M10 11V9C10 8.46957 10.2107 7.96086 10.5858 7.58579C10.9609 7.21071 11.4696 7 12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9V11M9 11H15C15.5523 11 16 11.4477 16 12V15C16 15.5523 15.5523 16 15 16H9C8.44772 16 8 15.5523 8 15V12C8 11.4477 8.44772 11 9 11Z"
                iconColor="#fdf15d"
                style={Typography.mb}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
              />
              <ButtonIcon
                style={[
                  Typography.button,
                  Typography.mb,
                  styles.buttonContainer,
                ]}
                label="Login"
                onPress={handleLogin}
              />
            </View>
            <View style={[Typography.flexCenter, Typography.mb]}>
              <Text>Don’t have an account yet? </Text>
              <TouchableOpacity onPress={goToRegister}>
                <Text style={Typography.bold}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  opaque: {
    opacity: 1,
  },
  transparent: {
    opacity: 0,
  },
  backgroundImage: {
    opacity: 0.08,
  },
  title: {
    textAlign: 'center',
    width: '100%',
    letterSpacing: 5,
    marginTop: 20,
  },
  gap: {
    marginBottom: 25,
  },
  logo: {
    width: 270,
    height: 148,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default LoginScreen;
