import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_LARGE, ICON_MEDIUM } from "../../constants/iconSize";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { textMediumSize } from "../../constants/fontSize";
import { useTextLanguage } from "../../hooks/useTextLanguage";

export default function SearchHeader({
  textColor = "white",
  onPress,
  linearPrimary,
  iconColor,
  backgroundColor,
  iconName,
  iconNameSize,
  iconName2,
  iconName2Size
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
            name="search"
            size={ICON_LARGE * 0.8}
            color={iconColor}
          />
        </TouchableOpacity>

        <TextInput
          style={{
            fontSize: textMediumSize,
            paddingLeft: BASE_UNIT * 0.05,
            height: BASE_UNIT,
            flex: 1,
            color: textColor,
          }}
          placeholderTextColor={Colors.grey}
          placeholder={useTextLanguage({
            vietnamese: "Tìm kiếm",
            english: "Search here",
          })}
        />

        <TouchableOpacity style={{ marginRight: BASE_UNIT * 0.05 }}>
          <MaterialIcons
            name={iconName}
            size={ICON_LARGE * 0.7}
            color={iconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons
            name={iconName2}
            size={iconName2Size || ICON_LARGE * 0.95}
            color={iconColor}
          />
        </TouchableOpacity>
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
            name="search"
            size={ICON_LARGE * 0.8}
            color={iconColor}
          />
        </TouchableOpacity>

        <TextInput
          style={{
            fontSize: textMediumSize,
            paddingLeft: BASE_UNIT * 0.05,
            height: BASE_UNIT,
            flex: 1,
            color: textColor,
          }}
          placeholderTextColor={Colors.grey}
          placeholder={useTextLanguage({
            vietnamese: "Tìm kiếm",
            english: "Search here",
          })}
        />

        <TouchableOpacity style={{ marginRight: BASE_UNIT * 0.05 }}>
          <MaterialIcons
            name="qr-code-scanner"
            size={ICON_LARGE * 0.7}
            color={iconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons
            name="add"
            size={ICON_LARGE * 0.95}
            color={iconColor}
          />
        </TouchableOpacity>
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
});
