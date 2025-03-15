import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Button, View, TextInputIcon, RadioButton, TextInput} from './Themed';
import IconSvg from './IconsSvg';
import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';
import ModalBottom from './ModalBottom';
// import RNPickerSelect from 'react-native-picker-select';
// import GraphArrowIcon from '../constants/icons/GraphArrowIcon';
import DownCarret from '../constants/icons/DownCarret';
import LocationIcon from '../constants/icons/LocationIcon';
import HbarIcon from '../constants/icons/HBarIcon';

export function FiltersCategory() {
  // const [sort, setSort] = useState<string | undefined>('past-week');
  const [modalVisible, setModalVisible] = useState(false);
  const {
    byGenres,
    byArtists,
    searchArtists,
    handleSelection,
    handleSearchArtists,
  } = useFilter();

  // const sortOptions = [{label: 'Past Week', value: 'past-week'}];

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
              label="By Genres"
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
        <>
          <TextInputIcon
            style={styles.inputGap}
            placeholder="Similar Artists"
            value={searchArtists}
            editable={false}
            onChangeText={text => handleSearchArtists(text)}
            iconColor="rgba(255,255,255,0.24)"
            iconPath="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          />
          <Text
            style={[
              Typography.size,
              Typography.mt,
              Typography.textCenter,
              Typography.highlight,
            ]}>
            This feature is unavailable during the beta phase.
          </Text>
        </>
      )}

      <ModalBottom
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={[modal.modalContent]}>
          <View style={[modal.wrapper, Typography.mb5]}>
            <Text
              style={[
                modal.title,
                Typography.textCenter,
                Typography.highlight,
                Typography.mb0,
              ]}>
              Feature Not Available Yet!
            </Text>
            <HbarIcon style={modal.hbar} />
            <Text style={[modal.message, Typography.text]}>
              Advanced filters not available in beta.
            </Text>
          </View>
          <View style={modal.wrapper}>
            <Text style={[Typography.text, Typography.bold, styles.label]}>
              Advance Options
            </Text>
            <View>
              <LocationIcon
                width="20"
                height="21"
                stroke="rgba(255,255,255,0.24)"
                style={modal.leftIcon}
              />
              <TextInput
                style={modal.iconLeftPadding}
                editable={false}
                placeholder="Ex: Houston, TX"
              />
            </View>
            <Text style={[Typography.disabled, styles.label]}>Release</Text>
            <View>
              <TextInput
                style={Typography.disabled}
                editable={false}
                placeholder="Past Week"
              />
              <DownCarret
                stroke="rgba(255,255,255,0.24)"
                style={modal.caretIcon}
              />
            </View>
            <View>
              <RadioButton>
                <Text style={[Typography.disabled, styles.label]}>
                  Include Low Rating Songs?
                </Text>
              </RadioButton>
            </View>
            <Button
              style={[Typography.button, modal.buttonModalContainer]}
              onPress={() => setModalVisible(false)}
              label="Confirm Settings"
            />
          </View>
        </View>
      </ModalBottom>
    </View>
  );
}

const modal = StyleSheet.create({
  wrapper: {
    margin: 'auto',
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#131314',
  },
  hbar: {
    marginVertical: 13,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
  },
  modalContent: {
    height: 490,
    width: '100%',
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
  pickerContainer: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    position: 'relative',
    borderColor: '#1e1e1f',
    backgroundColor: 'rgba(227, 227, 221, 0.04)',
  },
  iconLeftPadding: {
    paddingLeft: 45,
  },
  iconLeftPaddingSm: {
    paddingLeft: 30,
  },
  caretIcon: {
    position: 'absolute',
    top: 17,
    right: 18,
    pointerEvents: 'none',
  },
  leftIcon: {
    position: 'absolute',
    top: 17,
    left: 15,
    pointerEvents: 'none',
  },
});
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
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
});

// const pickerStyleDocument = {
//   inputIOS: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderWidth: 0,
//     color: '#E3E3DD',
//     fontSize: 15,
//   },
//   placeholder: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderWidth: 0,
//     color: '#E3E3DD',
//     fontSize: 15,
//   },
//   inputAndroid: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderWidth: 0,
//     color: '#E3E3DD',
//     fontSize: 15,
//   },
// };
