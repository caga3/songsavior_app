import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {View} from './Themed';

interface ModalProp {
  isVisible: boolean;
  height: number;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalCenter: React.FC<ModalProp> = ({
  isVisible,
  height,
  onClose,
  children,
}) => {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{height: height, ...styles.modalContent}}>
              {children}
            </View>
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
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#131314',
  },
  buttonModalContainer: {
    marginVertical: 0,
  },
});

export default ModalCenter;
