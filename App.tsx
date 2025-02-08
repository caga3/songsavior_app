import React, {useEffect} from 'react';
import { enableScreens } from 'react-native-screens';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();

function App() {
  useEffect(() => {
    const checkForUpdate = async () => {
      const currentVersion = await DeviceInfo.getVersion();

      checkIfKeyExists('appVersion').then((exists) => {
  console.log(exists ? 'Key exists!' : 'Key does not exist.');
});
      try {
        const storedVersion = await AsyncStorrage.getItem('appVersion');
        console.log(currentVersion);
        console.log(storedVersion);

        if (storedVersion !== currentVersion) {
          //await AsyncStorage.setItem('appVersion', currentVersion);
          //await AsyncStorage.clear(); // Clear storage
        }
      } catch(error) {
        console.error(123);
        return null;
      }
    };

    checkForUpdate();
  }, []);
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
