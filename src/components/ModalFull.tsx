import React from 'react';
import {Modal, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {View} from './Themed';
import IconSvg from './IconsSvg';

interface ModalProp {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalFull: React.FC<ModalProp> = ({isVisible, onClose, children}) => {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={[styles.modalContent]}>
          <TouchableOpacity
            style={{paddingTop: 15, width: 40}}
            onPress={onClose}>
            <IconSvg
              stroke={false}
              fill="#fff"
              path="M20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM3.46967 11.4697C3.17678 11.7626 3.17678 12.2374 3.46967 12.5303L8.24264 17.3033C8.53553 17.5962 9.01041 17.5962 9.3033 17.3033C9.59619 17.0104 9.59619 16.5355 9.3033 16.2426L5.06066 12L9.3033 7.75736C9.59619 7.46447 9.59619 6.98959 9.3033 6.6967C9.01041 6.40381 8.53553 6.40381 8.24264 6.6967L3.46967 11.4697ZM20 11.25H4V12.75H20V11.25Z"
            />
          </TouchableOpacity>
          <View style={styles.wrapper}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    height: '100%',
    width: '100%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 0,
    fontSize: 14,
    backgroundColor: '#131314',
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
});

export default ModalFull;
