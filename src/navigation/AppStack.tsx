import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import TabBarIcons from '../components/TabBarIcons';
import {View} from '../components/Themed';
import {DarkTheme} from '../constants/Themes';
import {ThemeProvider} from '@react-navigation/native';

import PlayerScreen from '../screens/PlayerScreen';
import FeedScreen from '../screens/FeedScreen';
import ChartScreen from '../screens/ChartScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

import PlayerRatingScreen from '../screens/PlayerRatingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';
import {Pressable} from 'react-native';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const PlayerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PlayerScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen name="PlayerRating" component={PlayerRatingScreen} />
    </Stack.Navigator>
  );
};

const MessageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MessageScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator: React.FC<Props> = ({navigation}) => {
  const colorScheme = 'dark';
  const tabIcon = Colors[colorScheme].tabIcon;
  const handlePlayerTabPress = () => {
    navigation.navigate('PlayerScreen');
  };
  return (
    <ThemeProvider value={DarkTheme}>
      <View style={{flex: 1, backgroundColor: Colors[colorScheme].background}}>
        <Tabs.Navigator
          initialRouteName="Player"
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme].highlight,
            tabBarStyle: {
              backgroundColor: Colors[colorScheme].tab,
              paddingTop: 5,
              paddingBottom: 15,
              height: 76,
              margin: 8,
              borderRadius: 24,
            },
            headerShown: false,
          }}>
          <Tabs.Screen
            name="Player"
            component={PlayerStack}
            options={() => ({
              tabBarDefaultScreen: 'PlayerScreen',
              tabBarIcon: ({focused}) => (
                <TabBarIcons
                  name="Player"
                  color={focused ? Colors[colorScheme].highlight : tabIcon}
                  fill={
                    focused
                      ? Colors[colorScheme].highlight
                      : Colors[colorScheme].tab
                  }
                />
              ),
              tabBarButton: props => (
                <Pressable {...props} onPress={() => handlePlayerTabPress()} />
              ),
            })}
          />
          <Tabs.Screen
            name="Feed"
            component={FeedScreen}
            options={() => ({
              tabBarIcon: ({focused}) => (
                <TabBarIcons
                  name="Feed"
                  color={focused ? Colors[colorScheme].highlight : tabIcon}
                  fill={
                    focused
                      ? Colors[colorScheme].highlight
                      : Colors[colorScheme].tab
                  }
                />
              ),
            })}
          />
          <Tabs.Screen
            name="Charts"
            component={ChartScreen}
            options={() => ({
              tabBarIcon: ({focused}) => (
                <TabBarIcons
                  name="Charts"
                  color={focused ? Colors[colorScheme].highlight : tabIcon}
                  fill={Colors[colorScheme].tab}
                />
              ),
            })}
          />
          <Tabs.Screen
            name="Leaderboards"
            component={LeaderboardScreen}
            options={() => ({
              tabBarIcon: ({focused}) => (
                <TabBarIcons
                  name="Leaderboards"
                  color={focused ? Colors[colorScheme].highlight : tabIcon}
                  fill={
                    focused
                      ? Colors[colorScheme].highlight
                      : Colors[colorScheme].tab
                  }
                />
              ),
            })}
          />
        </Tabs.Navigator>
      </View>
    </ThemeProvider>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Messages" component={MessageStack} />
    </Stack.Navigator>
  );
};
export default AppStack;
