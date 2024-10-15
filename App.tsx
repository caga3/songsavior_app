import React from 'react';
import { enableScreens } from 'react-native-screens';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

enableScreens();

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
