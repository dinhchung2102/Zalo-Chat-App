import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { useTextLanguage } from "../../hooks/useTextLanguage";

export default function SelectGenderModal({selectedGender, setSelectedGender, modalVisible, setModalVisible}) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.viewModal}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              paddingTop: BASE_UNIT * 0.05,
            }}
          >
            <Text
              style={{
                fontSize: textMediumSize,
                fontWeight: "500",
                marginBottom: BASE_UNIT * 0.04,
              }}
            >
              {useTextLanguage({vietnamese:"Chọn giới tính" , english: "Select Gender"})}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("male");
                setModalVisible(false);
              }}
              style={{
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                height: BASE_UNIT * 0.15,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: textMediumSize }}>Nam</Text>
              {selectedGender === "male" && (
                <MaterialIcons name="check" size={ICON_MEDIUM} color={'#006DFE'}/>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("female");
                setModalVisible(false);
              }}
              style={{
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
                width: "100%",
                height: BASE_UNIT * 0.15,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: textMediumSize }}>Nữ</Text>
              {selectedGender === "female" && (
                <MaterialIcons name="check" size={ICON_MEDIUM} color={'#006DFE'}/>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("none");
                setModalVisible(false);
              }}
              style={{
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
                width: "100%",
                height: BASE_UNIT * 0.15,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: textMediumSize }}>Không chia sẻ</Text>
              {selectedGender === "none" && (
                <MaterialIcons name="check" size={ICON_MEDIUM} color={'#006DFE'}/>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  viewModal: {
    width: BASE_UNIT,
    height: BASE_UNIT * 0.600,
    backgroundColor: "white",
    borderTopRightRadius: BASE_UNIT * 0.05,
    borderTopLeftRadius: BASE_UNIT * 0.05,
    alignItems: "flex-end",
    padding: BASE_UNIT * 0.01,
  },
});
