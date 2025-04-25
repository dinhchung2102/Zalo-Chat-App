import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { textHeaderSize } from "@styles/constants/fontSize";

export default function HeaderText({ text, color, style }) {
  return (
    <View style={style ? style : {
      width: "100%",
      alignItems:'center',
    }}>
      <Text
        style={{ fontSize: textHeaderSize, fontWeight: "500", color: color , textAlign:'center'}}
      >
        {text}
      </Text>
    </View>
  );
}

