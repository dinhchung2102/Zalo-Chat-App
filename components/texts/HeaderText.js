import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { textHeaderSize } from "../../constants/fontSize";

export default function HeaderText({ text, color }) {
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: textHeaderSize, fontWeight: "500", color: color , textAlign:'center'}}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems:'center'
  },
});
