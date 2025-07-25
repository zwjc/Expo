import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose }) => {
  const colorScheme = useColorScheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>{title}</Text>
          <Text style={[styles.modalText, { color: Colors[colorScheme ?? 'light'].text }]}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={onClose}
          >
            <Text style={[styles.textStyle, { color: Colors[colorScheme ?? 'light'].background }]}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
