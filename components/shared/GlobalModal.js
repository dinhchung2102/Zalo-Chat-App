import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GlobalModal({ visible, message, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.button}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 },
  text: { fontSize: 16 },
  button: { marginTop: 20, textAlign: 'center', color: 'blue' },
});
