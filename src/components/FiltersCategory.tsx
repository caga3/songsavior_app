import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Button, View, TextInputIcon} from './Themed';
import IconSvg from './IconsSvg';
import {useFilter} from '../context/FilterCategoryContext';
import Typography from '../constants/Typography';
import ModalBottom from './ModalBottom';
import HbarIcon from '../constants/icons/HBarIcon';

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
            Search is unavailable during the beta phase.
          </Text>
        </>
      )}

      <ModalBottom
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={[styles.modalContent]}>
          <View style={styles.modalWrapper}>
            <Text
              style={[
                Typography.h3,
                Typography.textCenter,
                Typography.highlight,
                Typography.mb0,
              ]}>
              Feature Not Available Yet!
            </Text>
            <HbarIcon style={styles.hbar} />
            <Text style={[styles.modalTitle, Typography.text]}>
              Filtering is unavailable during the beta phase
            </Text>
          </View>
          <Button
            style={[Typography.button, styles.buttonModalContainer]}
            onPress={() => setModalVisible(false)}
            label="Confirm Settings"
          />
        </View>
      </ModalBottom>
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
  label: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
  },
  modalWrapper: {
    margin: 'auto',
    width: 280,
  },
  modalTitle: {
    fontSize: 13,
    marginBottom: 15,
    textAlign: 'center',
  },
  hbar: {
    marginVertical: 10,
  },
  modalContent: {
    height: '28%',
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#131314',
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
});
