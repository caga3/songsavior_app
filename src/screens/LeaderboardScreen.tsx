import React from 'react';
import {SafeAreaView} from 'react-native';

import {Text, View} from '../components/Themed';
import OverallLeader from '../components/OverallLeader';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';

interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const LeaderboardScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, flexGrow: 1}}>
      <View style={{flexGrow: 1}}>
        <ProfileNav />
        <View style={Typography.container}>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>
              LEADERBOARD
            </Text>
          </View>
          <OverallLeader nav={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
