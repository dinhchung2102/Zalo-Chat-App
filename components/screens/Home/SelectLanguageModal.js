import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";

import { useRecoilState } from "recoil";
import { languageState, modalLanguageState } from "../../../state/PrimaryState";
import { BASE_UNIT } from "../../../constants/screen";
import { textMediumSize } from "../../../constants/fontSize";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../../constants/iconSize";
import { useTextLanguage } from "../../../hooks/useTextLanguage";

export default function SelectLanguageModal() {
  const [modalvisible, setModalVisible] = useRecoilState(modalLanguageState);
  const [selectedLanguage, setSelectLanguage] = useRecoilState(languageState);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalvisible}
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
              {useTextLanguage({
                vietnamese: "Chọn ngôn ngữ",
                english: "Select Language",
              })}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectLanguage("vie");
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
              <Text style={{ fontSize: textMediumSize }}>Tiếng Việt</Text>
              {selectedLanguage === "vie" && (
                <MaterialIcons
                  name="check"
                  size={ICON_MEDIUM}
                  color={"#006DFE"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectLanguage("eng");
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
              <Text style={{ fontSize: textMediumSize }}>English</Text>
              {selectedLanguage === "eng" && (
                <MaterialIcons
                  name="check"
                  size={ICON_MEDIUM}
                  color={"#006DFE"}
                />
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
    height: BASE_UNIT * 0.465,
    backgroundColor: "white",
    borderTopRightRadius: BASE_UNIT * 0.05,
    borderTopLeftRadius: BASE_UNIT * 0.05,
    alignItems: "flex-end",
    padding: BASE_UNIT * 0.01,
  },
});
