import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Button, Text, View} from './Themed';
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
  const [submited, setSubmited] = useState(1);
  const handleStream = () => {
    if (byGenres) {
      if (checkBoxSelected) {
        setSubmited(1);
        nav.navigate('PlayerRating', {
          item: checkBoxSelected,
          filter: byGenres ? 'genres' : 'artists',
        });
      } else {
        setSubmited(2);
      }
    }
  };

  return (
    <View style={styles.containerWrapper}>
      {!checkBoxSelected && byGenres && submited === 2 && (
        <Text
          style={[Typography.mt, Typography.textCenter, Typography.highlight]}>
          Please select a Genre first.
        </Text>
      )}
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
