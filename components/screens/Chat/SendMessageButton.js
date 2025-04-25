import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BASE_UNIT } from "@styles/constants/screen";

export default function SendMessageButton({ disabled, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: BASE_UNIT * 0.2,
        backgroundColor: "grey",
        height: BASE_UNIT * 0.08,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: BASE_UNIT * 0.05,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>Nhắn tin</Text>
    </TouchableOpacity>
  );
}
