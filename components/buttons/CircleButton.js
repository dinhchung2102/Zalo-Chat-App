import { View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";

export default function CircleButton() {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        borderRadius: "50%",
        height: BASE_UNIT * 0.13,
        width: BASE_UNIT * 0.13,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="arrow-forward"
          size={ICON_MEDIUM}
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
}
