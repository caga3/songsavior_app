import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {Button, View, Text} from './Themed';
import IconSvg from './IconsSvg';
import Typography from '../constants/Typography';
import {useState} from 'react';
import ModalBottom from './ModalBottom';
import DownArrow from '../constants/icons/DownArrow';

interface LeaderFilterProps {
  onApplyFilter: (filter: FilterOptions) => void;
}

interface FilterOptions {
  sort?: string;
}

const FiltersLeader: React.FC<LeaderFilterProps> = ({onApplyFilter}) => {
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const applyFilter = () => {
    onApplyFilter({sort});
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
        <View style={[styles.modalContent]}>
          <Text style={styles.label}>Sort By</Text>
          <View style={[styles.pickerContainer]}>
            <Picker
              style={styles.picker}
              selectedValue={sort}
              onValueChange={(itemValue: string | undefined) =>
                setSort(itemValue)
              }>
              <Picker.Item label="Accuracy" value="accuracy" />
              <Picker.Item label="Votes" value="votes" />
            </Picker>
            <DownArrow fill="white" style={styles.caretIcon} />
          </View>
          <Button
            style={[Typography.button, styles.buttonModalContainer]}
            label="Filter"
            onPress={applyFilter}
          />
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
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
  },
  label2: {
    marginBottom: 4,
  },
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
    height: 220,
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
  picker: {
    fontSize: 16,
    color: '#E3E3DD',
  },
  selectedValue: {
    flex: 1,
    fontSize: 16,
    color: '#E3E3DD',
  },
  caretIcon: {
    position: 'absolute',
    top: 17,
    right: 22,
    pointerEvents: 'none',
  },
});