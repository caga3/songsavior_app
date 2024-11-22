import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

interface TooltipProps {
  isVisible: boolean;
  message: string;
  position: {x: number; y: number} | null;
  onNext: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  isVisible,
  message,
  position,
  onNext,
}) => {
  if (!position) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.tooltipContainer,
            {top: position.y, left: position.x},
          ]}>
          <Text style={styles.tooltipText}>{message}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tooltipContainer: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {fontSize: 16, marginBottom: 10},
  nextButton: {padding: 10, backgroundColor: '#007BFF', borderRadius: 5},
  nextButtonText: {color: 'white', fontWeight: 'bold'},
});

export default Tooltip;
