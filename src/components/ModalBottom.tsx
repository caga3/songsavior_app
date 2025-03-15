import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {View} from './Themed';

interface ModalProp {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBottom: React.FC<ModalProp> = ({isVisible, onClose, children}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {children}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
});

export default ModalBottom;
