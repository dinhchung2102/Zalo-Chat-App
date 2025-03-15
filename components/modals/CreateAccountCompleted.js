import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { textMediumSize } from "../../constants/fontSize";

const CreateAccountCompleted = ({ visible, onClose }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        if (onClose) onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal transparent visible={showModal} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <MaterialIcons name="check-circle" color={'green'} size={ICON_MEDIUM}/>
          <Text style={styles.modalText}>Tạo tài khoản mới thành công</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    width: BASE_UNIT*0.5,
    padding: BASE_UNIT*0.05,
    backgroundColor: "#fff",
    borderRadius: BASE_UNIT*0.025,
    alignItems: "center"
  },
  modalText: {
    fontSize: textMediumSize,
    fontWeight: "bold",
    marginTop: BASE_UNIT*0.03,
    marginBottom: BASE_UNIT*0.02,
    textAlign: "center"
  },
});

export default CreateAccountCompleted;
