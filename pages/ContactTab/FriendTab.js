import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function FriendTab() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: BASE_UNIT * 0.01,
          marginBottom: BASE_UNIT * 0.03,
          paddingHorizontal: BASE_UNIT * 0.01,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: BASE_UNIT * 0.1,
            height: BASE_UNIT * 0.1,
            borderRadius: BASE_UNIT * 0.03,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
          }}
        >
          <Ionicons name="accessibility" size={ICON_MEDIUM} color={"white"} />
        </View>
        <Text
          style={{ marginLeft: BASE_UNIT * 0.03, fontSize: textMediumSize }}
        >
          Lời mời kết bạn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: BASE_UNIT * 0.01,
          marginBottom: BASE_UNIT * 0.03,
          paddingHorizontal: BASE_UNIT * 0.01,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: BASE_UNIT * 0.1,
            height: BASE_UNIT * 0.1,
            borderRadius: BASE_UNIT * 0.03,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
          }}
        >
          <Ionicons name="accessibility" size={ICON_MEDIUM} color={"white"} />
        </View>
        <Text
          style={{ marginLeft: BASE_UNIT * 0.03, fontSize: textMediumSize }}
        >
          Danh bạ máy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: BASE_UNIT * 0.01,
          marginBottom: BASE_UNIT * 0.03,
          paddingHorizontal: BASE_UNIT * 0.01,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: BASE_UNIT * 0.1,
            height: BASE_UNIT * 0.1,
            borderRadius: BASE_UNIT * 0.03,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
          }}
        >
          <Ionicons name="accessibility" size={ICON_MEDIUM} color={"white"} />
        </View>
        <Text
          style={{ marginLeft: BASE_UNIT * 0.03, fontSize: textMediumSize }}
        >
          Sinh nhật
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          borderTopWidth: BASE_UNIT * 0.03,
          borderTopColor: Colors.lightGrey,
          paddingHorizontal: BASE_UNIT * 0.01,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: BASE_UNIT * 0.03,
          }}
        >
          <TouchableOpacity
            style={{
              width: "auto",
              borderRadius: BASE_UNIT * 0.1,
              borderWidth: 1,
              padding: BASE_UNIT * 0.015,
              borderColor: Colors.grey,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tất cả (100)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: BASE_UNIT * 0.02,
              width: "auto",
              borderRadius: BASE_UNIT * 0.1,
              borderWidth: 1,
              padding: BASE_UNIT * 0.015,
              borderColor: Colors.grey,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Mới truy cập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
