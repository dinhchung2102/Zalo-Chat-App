import React from "react";
import { BASE_UNIT } from "../../../../styles/constants/screen";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontMediumSize } from "../../../../styles/constants/fontSize";
import { ICON_MEDIUM } from "../../../../styles/constants/iconSize";
import { useTextLanguage } from "../../../../hooks/useTextLanguage";

export default function LanguageSelect({ onPress }) {
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
          {useTextLanguage({ vietnamese: "Tiếng Việt", english: "English" })}
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
