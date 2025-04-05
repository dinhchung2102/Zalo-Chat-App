import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "../components/navigation/NavigationBar";
import SearchHeader from "../components/headers/SearchHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_LARGE, ICON_MEDIUM } from "../constants/iconSize";
import { Colors } from "../styles/Colors";
import { BASE_UNIT } from "../constants/screen";
import { textMediumSize } from "../constants/fontSize";
import FeatureButton from "../components/buttons/FeatureButton";
import { getLoginResult } from "../utils/asyncStorage";
import { useRecoilValue } from "recoil";
import { nameRegister, profilePicRegister } from "../state/RegisterState";

export default function Profile() {
  const profilePic = useRecoilValue(profilePicRegister);
  const name = useRecoilValue(nameRegister)
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        iconName2={"settings"}
        iconName2Size={ICON_MEDIUM * 1.2}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: BASE_UNIT * 0.03,
          paddingHorizontal: BASE_UNIT * 0.02,
        }}
      >
        <Image
          source={{ uri: profilePic }}
          style={{
            height: ICON_LARGE,
            width: ICON_LARGE,
            borderRadius: ICON_LARGE,
            backgroundColor: "red",
          }}
        />
        <View style={{ paddingLeft: BASE_UNIT * 0.04, flex: 1 }}>
          <Text style={{ fontSize: textMediumSize }}>{name}</Text>
          <Text style={{ color: Colors.grey }}>Xem trang cá nhân</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons
            name="manage-accounts"
            size={ICON_MEDIUM}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{ paddingVertical: BASE_UNIT * 0.015 }}>
        <FeatureButton
          feature={"zCloud"}
          icon={"cloud"}
          description={"Không gian lưu trữ dữ liệu trên đám mây"}
        />
        <FeatureButton
          feature={"zStyle - Nổi bật trên Zalo"}
          icon={"auto-fix-high"}
          description={"Hình nền và nhạc chờ cho cuộc gọi Zalo"}
        />
      </View>

      <View style={{ paddingVertical: BASE_UNIT * 0.002 }}>
        <FeatureButton
          feature={"Cloud của tôi"}
          icon={"cloud-queue"}
          description={"Lưu trữ các tin nhắn quan trọng"}
        />
        <FeatureButton
          feature={"Dữ liệu trên máy"}
          icon={"pie-chart"}
          description={"Quản lý dữ liệu Zalo của bạn"}
        />
      </View>
      <View style={{ paddingVertical: BASE_UNIT * 0.015 }}>
        <FeatureButton feature={"Tài khoản và bảo mật"} icon={"security"} />
        <FeatureButton feature={"Quyền riêng tư"} icon={"lock-person"} />
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
});
