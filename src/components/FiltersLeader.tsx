import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {Button, View, Text, TextInput, RadioButton} from './Themed';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import {useState} from 'react';
import ModalBottom from './ModalBottom';
import DownCarret from '../constants/icons/DownCarret';
import LocationIcon from '../constants/icons/LocationIcon';
import GraphArrowIcon from '../constants/icons/GraphArrowIcon';
import HbarIcon from '../constants/icons/HBarIcon';

interface LeaderFilterProps {
  onApplyFilter: (filter: FilterOptions) => void;
}

interface FilterOptions {
  sort?: string;
}

const FiltersLeader: React.FC<LeaderFilterProps> = ({onApplyFilter}) => {
  const [sort, setSort] = useState<string | undefined>('votes');
  const [modalVisible, setModalVisible] = useState(false);

  const applyFilter = () => {
    onApplyFilter({sort});
    setModalVisible(false);
  };

  const sortOptions = [
    {label: 'Votes', value: 'votes'},
    {label: 'Total Ratings', value: 'total-ratings'},
  ];

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
          <Text style={[Typography.size2, Typography.ms]}>Overall</Text>
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
              Some filters not available in beta.
            </Text>
          </View>
          <View style={modal.wrapper}>
            <Text style={[Typography.disabled, styles.label]}>Genre</Text>
            <View>
              <IconSvg
                style={modal.leftIcon}
                width="21"
                height="21"
                color="rgba(255,255,255,0.24)"
                path="M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17ZM10 17V4H20V17M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17ZM10 8H20"
              />
              <TextInput
                style={modal.iconLeftPadding}
                editable={false}
                placeholder="Overall"
              />
              <DownCarret
                stroke="rgba(255,255,255,0.24)"
                style={modal.caretIcon}
              />
            </View>
            <Text style={styles.label}>Sort By</Text>
            <View style={[modal.pickerContainer]}>
              <GraphArrowIcon style={modal.leftIcon} />
              <View style={modal.iconLeftPaddingSm}>
                <RNPickerSelect
                  darkTheme={true}
                  onValueChange={value => setSort(value)}
                  items={sortOptions}
                  value={sort}
                  style={pickerStyleDocument}
                />
              </View>
              <DownCarret stroke="white" style={modal.caretIcon} />
            </View>
            <Text style={[Typography.disabled, styles.label]}>
              Status Level
            </Text>
            <View>
              <TextInput editable={false} placeholder="Overall" />
              <DownCarret
                stroke="rgba(255,255,255,0.24)"
                style={modal.caretIcon}
              />
            </View>
            <Text style={[Typography.disabled, styles.label]}>
              User Location
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
            <View>
              <RadioButton>
                <Text style={[Typography.disabled, styles.label]}>
                  Prioritize Accuracy
                </Text>
              </RadioButton>
            </View>
            <Button
              style={[Typography.button, modal.buttonModalContainer]}
              label="Filter"
              onPress={applyFilter}
            />
          </View>
        </View>
      </ModalBottom>
    </>
  );
};

export default FiltersLeader;

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
});
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
    height: 670,
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
    borderColor: 'rgba(255,255,255,0.24)',
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
