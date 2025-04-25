import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { BASE_UNIT } from "../../styles/constants/screen";
import { textLargeButton } from "../../styles/constants/fontSize";

export default function LargeButton({ text, color, textColor, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled === false ? color : 'grey',
        width: BASE_UNIT * 0.9,
        height: BASE_UNIT * 0.12,
        borderRadius: BASE_UNIT * 0.1,
        marginTop: BASE_UNIT * 0.03,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: textLargeButton,
          color: textColor,
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
