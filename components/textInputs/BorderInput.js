import { View, TextInput } from "react-native";
import React from "react";
import { textMediumSize } from "../../constants/fontSize";
import { BASE_UNIT } from "../../constants/screen";

export default function BorderInput({ placeholder, borderColor }) {
  return (
    <View
      style={{
        borderWidth: 1,
        width: "100%",
        paddingHorizontal: "2%",
        borderColor: borderColor,
        borderRadius: BASE_UNIT * 0.024,
      }}
    >
      <TextInput
        placeholder={placeholder}
        style={{ fontSize: textMediumSize }}
        autoFocus={true}
      />
    </View>
  );
}
