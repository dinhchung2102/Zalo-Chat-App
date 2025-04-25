import React from "react";
import { BASE_UNIT } from "../../../../styles/constants/screen";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { textMediumSize } from "../../../../styles/constants/fontSize";
import { ICON_MEDIUM } from "../../../../styles/constants/iconSize";
import { Colors } from "../../../../styles/Colors";

export default function CountrySelect({ onPress }) {
  return (
    <View
      style={{
        borderTopLeftRadius: BASE_UNIT * 0.03,
        borderBottomLeftRadius: BASE_UNIT * 0.03,
        width: BASE_UNIT * 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.grey,
        backgroundColor:Colors.lightGrey,
        height:'100%'

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
          style={{ fontSize: textMediumSize}}
        >
          +84
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={ICON_MEDIUM}
          color={Colors.grey}
        />
      </TouchableOpacity>
    </View>
  );
}
