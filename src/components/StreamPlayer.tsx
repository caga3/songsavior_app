import React from 'react';
import {Alert, StyleSheet} from 'react-native';

import {Button, View} from './Themed';
import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';

interface Props {
  nav: {
    navigate: (
      screenName: string,
      params?: {
        item: string;
        filter: string;
      },
    ) => void;
  };
}

const StreamPlayer: React.FC<Props> = ({nav}) => {
  const {byGenres, checkBoxSelected} = useFilter();
  const handleStream = () => {
    if (!checkBoxSelected) {
      Alert.alert('Error', 'Please select a category first');
    } else {
      nav.navigate('PlayerRating', {
        item: checkBoxSelected,
        filter: byGenres ? 'genres' : 'artists',
      });
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <Button
        style={[Typography.button, styles.buttonContainer]}
        label="Launch Stream"
        onPress={handleStream}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWrapper: {
    paddingTop: 5,
    paddingBottom: 0,
    width: '100%',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default StreamPlayer;
