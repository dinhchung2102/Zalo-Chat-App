import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { textMediumSize } from "../../constants/fontSize";
import LinkButton from "../buttons/LinkButton";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM_PLUS } from "../../constants/iconSize";

export default function AgreeTerms({ term, textColor }) {
  const [checked, setChecked] = useState(false);
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
          I agree to
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
