import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useAuth} from '../context/AuthContext';
import {View} from '../components/Themed';
import {DarkTheme} from '../constants/Themes';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNav = () => {
  const {isLoading, userToken} = useAuth();
  if (isLoading) {
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>;
  }
  return (
    <NavigationContainer theme={DarkTheme}>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNav;
