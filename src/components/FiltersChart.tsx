import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {Button, View, Text, TextInputIcon, TextInput} from './Themed';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import {useState} from 'react';
import ModalBottom from './ModalBottom';
import DownCarret from '../constants/icons/DownCarret';
import HbarIcon from '../constants/icons/HBarIcon';
import LocationIcon from '../constants/icons/LocationIcon';

interface ChartFilterProps {
  onApplyFilter: (filter: FilterOptions) => void;
}

interface FilterOptions {
  genre?: string;
}

const FiltersChart: React.FC<ChartFilterProps> = ({onApplyFilter}) => {
  const genreOptions = [
    {label: 'Overall', value: '*'},
    {label: 'Pop', value: 'pop'},
    {label: 'Rock', value: 'rock'},
    {label: 'Country', value: 'country'},
    {label: 'R&B', value: 'rb'},
    {label: 'Hip-Hop', value: 'hiphop'},
    {label: 'EDM', value: 'danceelectronic'},
  ];

  const [genre, setGenre] = useState<string | undefined>('*');
  const [genreTitle, setGenreTitle] = useState<string | undefined>('Overall');
  const [modalVisible, setModalVisible] = useState(false);
  const applyFilter = () => {
    const selectedOption = genreOptions.find(option => option.value === genre);
    const label = selectedOption ? selectedOption.label : 'Overall';
    onApplyFilter({genre});
    setGenreTitle(label);
    setModalVisible(false);
  };

  return (
    <>
      <View style={Typography.flexBetween}>
        <View style={styles.containerWrapper}>
          <IconSvg
            width="24"
            height="24"
            color="#FDF15D"
            path="M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17ZM10 17V4H20V17M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17ZM10 8H20"
          />
          <Text style={[Typography.size2, Typography.ms]}>{genreTitle}</Text>
        </View>
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

      <ModalBottom
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={[modal.modalContent]}>
          <Text
            style={[
              Typography.size,
              Typography.textCenter,
              Typography.highlight,
            ]}>
            More filters will be available post-beta.
          </Text>
          <Text style={[Typography.disabled, styles.label]}>Search</Text>
          <TextInputIcon
            iconPath="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            iconColor="rgba(255,255,255,0.24)"
            editable={false}
            placeholder="Search Song or Artist"
          />
          <HbarIcon style={styles.hbar} />
          <Text style={styles.labelHead}>Sort By</Text>
          <Text style={styles.label}>Genre</Text>
          <View style={[modal.pickerContainer]}>
            <IconSvg
              style={modal.leftIcon}
              width="21"
              height="21"
              color="#FDF15D"
              path="M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17ZM10 17V4H20V17M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17ZM10 8H20"
            />
            <View style={modal.iconLeftPaddingSm}>
              <RNPickerSelect
                darkTheme={true}
                onValueChange={value => setGenre(value)}
                items={genreOptions}
                value={genre}
                style={pickerStyleDocument}
              />
            </View>
            <DownCarret stroke="white" style={modal.caretIcon} />
          </View>
          <Text style={[Typography.disabled, styles.label]}>
            Artist Location
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
              placeholder="Location"
            />
          </View>
          <Text style={[Typography.disabled, styles.label]}>Release</Text>
          <View>
            <TextInput editable={false} placeholder="Past Month" />
            <DownCarret
              stroke="rgba(255,255,255,0.24)"
              style={modal.caretIcon}
            />
          </View>
          <Button
            style={[Typography.button, modal.buttonModalContainer]}
            label="Filter"
            onPress={applyFilter}
          />
        </View>
      </ModalBottom>
    </>
  );
};

export default FiltersChart;

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 7,
  },
  labelHead: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: 600,
  },
  hbar: {
    marginVertical: 10,
  },
});

const modal = StyleSheet.create({
  modalWrapper: {
    margin: 'auto',
    width: 260,
  },
  modalTitle: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    height: 620,
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#131314',
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

const pickerStyleDocument = {
  inputIOS: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: '#E3E3DD',
    fontSize: 15,
  },
  placeholder: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: '#E3E3DD',
    fontSize: 15,
  },
  inputAndroid: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: '#E3E3DD',
    fontSize: 15,
  },
};
