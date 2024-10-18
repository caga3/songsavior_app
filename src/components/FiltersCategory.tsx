import React from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, View, TextInput, Text, SelectOption} from './Themed';
import IconSvg from './IconsSvg';
import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';
import {useState} from 'react';

export function FiltersCategory() {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    byGenres,
    byArtists,
    searchArtists,
    handleSelection,
    handleSearchArtists,
  } = useFilter();

  return (
    <View>
      <View style={styles.containerWrapper}>
        <View style={[styles.buttonContainer, Typography.tab]}>
          <View style={styles.buttonWrapper}>
            <Button
              style={
                byGenres
                  ? [Typography.button, styles.button]
                  : [Typography.tab, styles.button]
              }
              styleText={styles.buttonText}
              onPress={() => handleSelection('genres')}
              label="By Genras"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              style={
                byArtists
                  ? [Typography.button, styles.button]
                  : [Typography.tab, styles.button]
              }
              styleText={styles.buttonText}
              onPress={() => handleSelection('artists')}
              label="By Artists"
            />
          </View>
        </View>
        <View style={styles.containerGroup}>
          <View style={[Typography.tab, styles.buttonFilters]}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <IconSvg
                width="24"
                height="24"
                path="M16 6C16 7.10457 15.1046 8 14 8C12.8954 8 12 7.10457 12 6M16 6C16 4.89543 15.1046 4 14 4C12.8954 4 12 4.89543 12 6M16 6H20M12 6H4M10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12M10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12M10 12H20M6 12H4M19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18M19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18M19 18H20M15 18H4"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {byArtists && (
        <TextInput
          style={styles.inputGap}
          placeholder="Similar Artists"
          value={searchArtists}
          onChangeText={text => handleSearchArtists(text)}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}> 
        <View style={styles.modalContainer}>
          <View style={styles.modalGoBack}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <IconSvg
                width="24"
                height="24"
                path="M20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303L8.24264 17.3033C8.53553 17.5962 9.01041 17.5962 9.3033 17.3033C9.59619 17.0104 9.59619 16.5355 9.3033 16.2426L5.06066 12L9.3033 7.75736C9.59619 7.46447 9.59619 6.98959 9.3033 6.6967C9.01041 6.40381 8.53553 6.40381 8.24264 6.6967L3.46967 11.4697ZM20 11.25H4V12.75H20V11.25Z"
              />
            </TouchableOpacity>
          </View>
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
              onPress={() => handleSelection('advance')}
              label="Confirm Settings"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
  },
  containerGroup: {
    marginLeft: 10,
    width: '9%',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 6,
    width: '89%',
  },
  buttonWrapper: {
    flex: 1,
    margin: 4,
  },
  button: {
    height: 32,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 500,
  },
  buttonFilters: {
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGap: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: '#131314',
  },
  modalContent: {  
    height:'50%', 
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
  },
});
