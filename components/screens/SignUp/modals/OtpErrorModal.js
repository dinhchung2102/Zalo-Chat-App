import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../../styles/Colors";
import { BASE_UNIT } from "../../../../constants/screen";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../../../constants/iconSize";
import { textMediumSize } from "../../../../constants/fontSize";

const OtpErrorModal = ({ visible, onClose }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal transparent visible={showModal} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <MaterialIcons name="error" color={"red"} size={ICON_MEDIUM} />
          <Text style={styles.modalText}>Mã OTP không hợp lệ. Vui lòng thử lại!</Text>
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
    width: BASE_UNIT * 0.5,
    padding: BASE_UNIT * 0.05,
    backgroundColor: "#fff",
    borderRadius: BASE_UNIT * 0.025,
    alignItems: "center"
  },
  modalText: {
    fontSize: textMediumSize,
    fontWeight: "bold",
    marginTop: BASE_UNIT * 0.03,
    marginBottom: BASE_UNIT * 0.02,
    textAlign: "center",
    color: "red"
  }
});

export default OtpErrorModal;