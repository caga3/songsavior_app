import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Button, View, Text} from './Themed'; 
import Typography from '../constants/Typography'; 

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
        onRequestClose={onClose}>  
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[styles.modalContent]}>
                  <View style={styles.wrapper}>
                    <Text
                      style={[Typography.h2, Typography.textCenter, Typography.highlight]}>
                      Feature Not Available {'\n'}... Yet
                    </Text>
                    <Text style={styles.title}>
                      {children}
                    </Text>
                  </View>
                  <Button
                    style={[Typography.button, styles.buttonModalContainer]}
                    onPress={onClose}
                    label="Confirm Settings"
                  />
                </View> 
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
      </Modal>
  );
}

const styles = StyleSheet.create({ 
  wrapper: { 
    margin: 'auto',
    width: 260,
  },
  title: {
    fontSize: 15, 
    marginBottom: 20,
    textAlign: 'center'
  },      
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {  
    height:'28%', 
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

export default ModalBottom;