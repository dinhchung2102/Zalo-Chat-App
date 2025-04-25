import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { textMediumSize } from "@styles/constants/fontSize";
import LinkButton from "../shared/LinkButton";
import { Colors } from "@styles/Colors";
import { BASE_UNIT } from "@styles/constants/screen";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM_PLUS } from "@styles/constants/iconSize";
import { useTextLanguage } from "@hooks/useTextLanguage";

export default function AgreeTerms({ term, textColor, checked, setChecked }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          setChecked(!checked);
        }}
      >
        {(checked && (
          <MaterialIcons
            name="check-box"
            size={ICON_MEDIUM_PLUS}
            color={Colors.primary}
          />
        )) || (
          <MaterialIcons
            name="check-box-outline-blank"
            size={ICON_MEDIUM_PLUS}
            color={Colors.grey}
          />
        )}
        <Text
          style={{ fontSize: textMediumSize, marginLeft: BASE_UNIT * 0.02 }}
        >
          {useTextLanguage({
            vietnamese: "Tôi đồng ý với",
            english: "I agree to",
          })}
        </Text>
      </TouchableOpacity>

      <LinkButton text={term} textColor={textColor} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: BASE_UNIT * 0.04,
    marginTop: BASE_UNIT * 0.01,
  },
});
