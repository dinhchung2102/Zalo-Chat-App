import { View, Text } from "react-native";
import React from "react";
import { textMediumSize } from "../../../constants/fontSize";

export default function HeaderDesText({ text, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{ textAlign: "center", color: color, fontSize: textMediumSize }}
      >
        {text}
      </Text>
    </View>
  );
}
