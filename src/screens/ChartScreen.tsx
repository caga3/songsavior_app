import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Button, SelectOption, Text, View} from '../components/Themed';
import OverallChart from '../components/OverallChart';
import ProfileNav from '../components/ProfileNav';
import Typography from '../constants/Typography';
import IconSvg from '../components/IconsSvg';
import {FiltersChart} from '../components/FiltersChart';

interface Props {
  navigation: {
    navigate: (screenName: string, params?: {}) => void;
  };
}

const ChartScreen: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
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
            <Text style={[Typography.h3, Typography.textCenter]}>CHARTS</Text>
          </View>
          <FiltersChart />
          <OverallChart nav={navigation} />
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalGoBack}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <IconSvg
                width="24"
                height="24"
                path="M20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303L8.24264 17.3033C8.53553 17.5962 9.01041 17.5962 9.3033 17.3033C9.59619 17.0104 9.59619 16.5355 9.3033 16.2426L5.06066 12L9.3033 7.75736C9.59619 7.46447 9.59619 6.98959 9.3033 6.6967C9.01041 6.40381 8.53553 6.40381 8.24264 6.6967L3.46967 11.4697ZM20 11.25H4V12.75H20V11.25Z"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent]}>
              <View>
                <Text style={styles.label}>Release</Text>
                <SelectOption
                  options={[
                    {
                      label: 'Artist Release',
                      value: '',
                    },
                    {label: 'Past Week', value: 'past-week'},
                    {label: 'Past Month', value: 'past-month'},
                    {label: 'Past 6 Months', value: 'past-6-months'},
                    {label: 'Past 12 Month', value: 'past-12-months'},
                    {label: 'Last Year', value: 'last-year'},
                    {label: 'Last 5 Year', value: 'last-5-year'},
                    {label: "2020's", value: '2020'},
                    {label: "2010's", value: '2010'},
                  ]}
                />
              </View>
              <Button
                style={[Typography.button, styles.buttonModalContainer]}
                onPress={() => {}}
                label="Filter"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131314',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 8,
  },
  modalGoBack: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    left: 20,
  },
});

export default ChartScreen;
