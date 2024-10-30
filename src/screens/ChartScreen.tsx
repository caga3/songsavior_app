import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {Text, View} from '../components/Themed';
import OverallChart from '../components/OverallChart';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';

interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const ChartScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ProfileNav />
        <View style={Typography.container}>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>CHARTS</Text>
          </View>
          <OverallChart nav={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChartScreen;
