import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";
import LinkButton from "../buttons/LinkButton";

export default function RuleList({ rule, url, term, color, valid }) {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginTop: BASE_UNIT * 0.015,
      }}
    >
      <MaterialIcons
        name="check-circle-outline"
        size={ICON_MEDIUM}
        color={valid ? Colors.primary : color}
      />
      <Text style={{ color: valid? Colors.primary : color, marginLeft: BASE_UNIT * 0.025, fontSize: BASE_UNIT*0.033 }}>{rule}</Text>
      <LinkButton text={term} textColor={Colors.primary} textSize={BASE_UNIT*0.033}/>
    </View>
  );
}
