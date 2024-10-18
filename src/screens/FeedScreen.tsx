import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import Typography from '../constants/Typography';

const FeedScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text
          style={[Typography.h1, Typography.textCenter, Typography.highlight]}>
          Feature Not Available ... Yet
        </Text>
        <Text style={styles.title}>
          Update feed is unavailable during the beta phase.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default FeedScreen;
