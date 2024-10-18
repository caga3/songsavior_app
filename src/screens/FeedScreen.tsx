import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed'; 
import Typography from '../constants/Typography';
import ProfileNav from '../components/ProfileNav'; 

const FeedScreen: React.FC = () => {
  return ( 
    <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ProfileNav />
            <View style={[Typography.container, { flex: 1 }]}>
              <View style={Typography.headerWrapper}>
                <Text style={[Typography.h3, Typography.textCenter]}>
                  FEED
                </Text>
              </View> 
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
                <View style={styles.wrapper}>
                  <Text
                    style={[Typography.h1, Typography.textCenter, Typography.highlight]}>
                    Feature Not Available ... Yet
                  </Text>
                  <Text style={styles.title}>
                    Update feed is unavailable during the beta phase.
                  </Text>
                </View>
              </View> 
            </View>
          </ScrollView>  
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
