import React from "react";
import { useRecoilState } from "recoil";
import { languageState } from "../../state/PrimaryState";
import { BASE_UNIT } from "../../constants/screen";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontMediumSize } from "../../constants/fontSize";
import { ICON_MEDIUM } from "../../constants/iconSize";

export default function LanguageSelect({ onPress }) {
  const [selectedLanguage, setSelectLanguage] = useRecoilState(languageState);
  return (
    <View
      style={{
        borderRadius: BASE_UNIT * 0.5,
        borderWidth: 1,
        width: BASE_UNIT * 0.3,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#c4c4c4",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={onPress}
      >
        <Text
          style={{ fontSize: fontMediumSize, marginRight: BASE_UNIT * 0.03 }}
        >
          {selectedLanguage === "vie" ? "Tiếng Việt" : "English"}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={ICON_MEDIUM}
          color={"#c4c4c4"}
        />
      </TouchableOpacity>
    </View>
  );
}
