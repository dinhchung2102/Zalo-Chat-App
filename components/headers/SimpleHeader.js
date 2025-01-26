import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { textMediumSize } from "../../constants/fontSize";

export default function SimpleHeader({
  text,
  onPress,
  linearPrimary,
  iconColor,
  backgroundColor,
}) {
  if (linearPrimary) {
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.primary, "#00BCFA"]}
      >
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons
            name="arrow-back"
            size={ICON_MEDIUM}
            color={iconColor}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: backgroundColor,
          flexDirection: "row",
          alignItems: "center",
          height: BASE_UNIT * 0.13,
          paddingHorizontal: BASE_UNIT * 0.02,
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons
            name="arrow-back"
            size={ICON_MEDIUM}
            color={iconColor}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    height: BASE_UNIT * 0.13,
    paddingHorizontal: BASE_UNIT * 0.02,
  },
  text: {
    marginLeft: BASE_UNIT * 0.04,
    color: "white",
    fontSize: textMediumSize,
    fontWeight: "500",
  },
});
