import React from 'react';
import {ScrollView} from 'react-native';

import {Text, View} from '../components/Themed';
import {FiltersCategory} from '../components/FiltersCategory';
import {FilterCategoryProvider} from '../context/FilterCategoryContext';
import Categories from '../components/Categories';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';
import StreamPlayer from '../components/StreamPlayer';

interface Props {
  navigation: {
    navigate: (screenName: string) => void;
  };
}

const PlayerScreen: React.FC<Props> = ({navigation}) => {
  return (
    <FilterCategoryProvider>
      <ScrollView>
        <ProfileNav />
        <View style={Typography.container}>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>
              CREATE STREAM
            </Text>
          </View>
          <FiltersCategory />
          <Categories />
        </View>
      </ScrollView>
      <StreamPlayer nav={navigation} />
    </FilterCategoryProvider>
  );
};

export default PlayerScreen;
