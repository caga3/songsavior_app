import React from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, View, Text, SelectOption} from './Themed';
import IconSvg from './IconsSvg';
//import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';
import {useState} from 'react';

export function FiltersChart() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.containerWrapper}>
        <IconSvg
          width="24"
          height="24"
          color="#FDF15D"
          path="M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17ZM10 17V4H20V17M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17ZM10 8H20"
        />
        <Text style={[Typography.size2, Typography.ms]}>Overall</Text>
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
              <Text style={(Typography.size1, styles.label2)}>Release</Text>
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
              label="Confirm Settings"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 600,
    marginBottom: 15,
  },
  label2: {
    marginBottom: 4,
  },
  modalGoBack: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    left: 20,
  },
});
