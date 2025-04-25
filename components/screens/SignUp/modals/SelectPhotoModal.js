import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { ICON_MEDIUM, ICON_MEDIUM_PLUS } from "@styles/constants/iconSize";
import { Colors } from "@styles/Colors";
import { textMediumSize } from "@styles/constants/fontSize";
import { BASE_UNIT } from "@styles/constants/screen";

const SelectPhotoModal = ({ visible, onClose, onTakePhoto, onPickPhoto }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={styles.viewModal}>
          <TouchableOpacity style={styles.optionButton} onPress={onTakePhoto}>
            <MaterialIcons
              name="add-a-photo"
              size={ICON_MEDIUM_PLUS}



              
              color={Colors.grey}
            />
            <Text style={styles.optionText}>Chụp ảnh mới</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={onPickPhoto}>
            <MaterialIcons
              name="add-photo-alternate"
              size={ICON_MEDIUM_PLUS}
              color={Colors.grey}
            />
            <Text style={styles.optionText}>Chọn ảnh trên máy</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  viewModal: {
    backgroundColor: "#fff",
    padding: BASE_UNIT*0.02,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
  },
  optionButton: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
  },
  optionText: {
    fontSize: textMediumSize,
    marginLeft: BASE_UNIT * 0.03,
  },
});

export default SelectPhotoModal;
