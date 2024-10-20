import React, {useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, SelectOption, Text, View} from '../components/Themed';
import OverallLeader from '../components/OverallLeader';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';
import IconSvg from '../components/IconsSvg';
import {FiltersChart} from '../components/FiltersChart';
import ModalNotYet from '../components/ModalNotYet'; 

interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const LeaderboardScreen: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <ProfileNav />
        <View style={Typography.container}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              setModalVisible(true);
            }}>
            <IconSvg width="24" height="24" path="M4 6H12M4 12H20M4 18H16" />
          </TouchableOpacity>
          <View style={Typography.headerWrapper}>
            <Text style={[Typography.h3, Typography.textCenter]}>
              LEADERBOARD
            </Text>
          </View>
          <FiltersChart />
          <OverallLeader nav={navigation} />
        </View>
      </View>
      <ModalNotYet isVisible={modalVisible} onClose={() => setModalVisible(false)}>
          Update feed is unavailable during the beta phase.
      </ModalNotYet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ 
  filterBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    left: 20,
  }, 
});

export default LeaderboardScreen;
