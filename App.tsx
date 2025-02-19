import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();

function App() {
  useEffect(() => {
    const checkForUpdate = async () => {
      const currentVersion = DeviceInfo.getVersion();
      const storedVersion = await AsyncStorage.getItem('appVersion');
      if (storedVersion !== currentVersion) {
        await AsyncStorage.setItem('appVersion', currentVersion);
        await AsyncStorage.clear();
      }
    };
    // Check for Updates to Clear Data
    if (Platform.OS === 'ios') {
      checkForUpdate();
    }
  }, []);
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
