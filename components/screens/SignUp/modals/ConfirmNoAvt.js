import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { BASE_UNIT } from "@styles/constants/screen";
import { textMediumSize } from "@styles/constants/fontSize";
import { Colors } from "@styles/Colors";

const ConfirmNoAvt = ({ visible, title, text, onSkip, onAddPhoto }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={onAddPhoto}>
              <Text style={styles.buttonText}>Thêm ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: BASE_UNIT*0.7,
    padding: BASE_UNIT*0.07,
    backgroundColor: "#fff",
    borderRadius: BASE_UNIT*0.03,
    alignItems: "center",
  },
  title: {
    fontSize: textMediumSize,
    fontWeight: "bold",
    marginBottom: BASE_UNIT*0.03,
  },
  text: {
    fontSize: textMediumSize*0.9,
    textAlign: "left",
    marginBottom: BASE_UNIT*0.05,

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  skipButton: {
    flex: 1,
    padding: BASE_UNIT*0.03,
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
    marginRight: BASE_UNIT*0.02
  },
  addButton: {
    flex: 1,
    padding: BASE_UNIT*0.03,
    backgroundColor: Colors.primary,
    marginLeft:BASE_UNIT*0.02,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ConfirmNoAvt;
