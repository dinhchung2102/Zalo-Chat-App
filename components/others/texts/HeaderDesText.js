import { View, Text } from "react-native";
import React from "react";
import { textMediumSize } from "@styles/constants/fontSize";

export default function HeaderDesText({ text, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ textAlign: "center", color: color, fontSize: textMediumSize }}>{text}</Text>
    </View>
  );
}
