import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import RestApiServer from '../constants/RestApiServer';
import {Alert} from 'react-native';
interface AuthContextType {
  isLoading: boolean;
  userToken: string;
  userInfo: {};
  setLogIn: (username: string, password: string) => void;
  setLogout: () => void;
  setRegister: (
    username: string,
    fullname: string,
    email: string,
    password: string,
  ) => void;
}

const initialContext: AuthContextType = {
  isLoading: false,
  userToken: '',
  userInfo: {},
  setLogIn: () => {},
  setLogout: () => {},
  setRegister: () => {},
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const setLogIn = async (username: string, password: string) => {
    const tokenJson = await RestApiServer.getRestToken(username, password);
    if (tokenJson) {
      if (tokenJson.token) {
        const tokenData = tokenJson.token;
        const userData = tokenJson.profile;
        await AsyncStorage.setItem('userToken', tokenData);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        setIsLoading(true);
        setUserToken(tokenData);
        setUserInfo(JSON.stringify(userData));
      } else {
        Alert.alert(
          'Error',
          'The username, email or password does not match or exist.',
        );
      }
    } else {
      Alert.alert(
        'Error',
        'The username, email or password does not match or exist.',
      );
    }
  };

  const setRegister = async (
    username: string,
    fullname: string,
    email: string,
    password: string,
  ) => {
    const tokenJson = await RestApiServer.callRegister(
      username,
      fullname,
      email,
      password,
    );
    if (tokenJson) {
      if (tokenJson.token) {
        const tokenData = tokenJson.token;
        const userData = tokenJson.profile;
        await AsyncStorage.setItem('userToken', tokenData);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        setIsLoading(true);
        setUserToken(tokenData);
        setUserInfo(JSON.stringify(userData));
      } else if (tokenJson.message) {
        Alert.alert('Error', tokenJson.message);
      } else {
        Alert.alert(
          'Error',
          'Unable to create an account. Please send us a email at support@songsavior.com',
        );
      }
    } else {
      Alert.alert(
        'Error',
        'Unable to create an account. Please send us a email at support@songsavior.com',
      );
    }
  };

  const setLogout = async () => {
    setUserToken('');
    setUserInfo({});
    setIsLoading(false);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
  };

  const isLoggedIn = async () => {
    try {
      // await AsyncStorage.removeItem('userToken');
      // await AsyncStorage.removeItem('userInfo');
      let tokenData = await AsyncStorage.getItem('userToken');
      let userData = await AsyncStorage.getItem('userInfo');
      if (tokenData) {
        setUserToken(tokenData);
      }
      if (userData) {
        setUserInfo(userData);
      }
    } catch (e) {
      Alert.alert('Error', `Enable to validate your account ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        setLogIn,
        setLogout,
        setRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
