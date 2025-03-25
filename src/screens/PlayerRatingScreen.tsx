import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {Text, View} from '../components/Themed';
import ProfileNav from '../components/ProfileNav';
import GoBack from '../components/GoBack';
import Typography from '../constants/Typography';
import RateSongs from '../components/RateSongs';

type RootStackParamList = {
  // Define your screen names and their params here
  Rating: {item: string; filter: string; redirect?: any};
};

const PlayerRatingScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Rating'>>();
  const params = route.params;
  useFocusEffect(
    useCallback(() => {
      activateKeepAwake();
      return () => {
        deactivateKeepAwake();
      };
    }, []),
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <GoBack name={params.redirect} />
        <ProfileNav />
        <View style={Typography.container}>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>PLAYER</Text>
          </View>
          <RateSongs
            item={params.item}
            filter={params.filter}
            redirect={params.redirect}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerRatingScreen;
