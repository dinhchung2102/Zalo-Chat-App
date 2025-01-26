import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { textMediumSize } from "../../constants/fontSize";
import { BASE_UNIT } from "../../constants/screen";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";

export default function LinkButton({ text, onPress, icon, textColor }) {
  return (
    <View
      style={{ marginTop: BASE_UNIT * 0.05, paddingLeft: BASE_UNIT * 0.01 }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{ alignItems: "center", flexDirection: "row" }}
      >
        <Text
          style={{
            fontSize: textMediumSize,
            color: textColor,
            fontWeight: "500",
          }}
        >
          {text}
        </Text>
        <MaterialIcons name={icon} size={ICON_MEDIUM} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}
