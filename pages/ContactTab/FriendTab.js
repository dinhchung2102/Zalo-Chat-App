import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "@styles/constants/iconSize";
import { Colors } from "@styles/Colors";
import { BASE_UNIT } from "@styles/constants/screen";
import { textMediumSize } from "@styles/constants/fontSize";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getRequests } from "@api/friend/getRequests";
import { getLoginResult } from "@services/storageService";
import { useRecoilState } from "recoil";
import second, { requestState } from "@state/FriendState";
import { useNavigation } from "@react-navigation/native";

export default function FriendTab() {
  const [requests, setRequests] = useRecoilState(requestState);
  const [error, setError] = useState(""); // Lưu lỗi nếu có
  const [loginResult, setLoginResult] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLoginResult = async () => {
      const result = await getLoginResult();
      setLoginResult(result);
      //console.log("📦 Login info:", result);
    };

    fetchLoginResult();
  }, []);

  //console.log(requests);

  useEffect(() => {
    const fetchRequests = async () => {
      // Kiểm tra token trước khi gọi API
      if (loginResult && loginResult.token) {
        const result = await getRequests(
          loginResult.token,
          loginResult.user._id
        );
        if (typeof result === "string") {
          setError(result); // Nếu có lỗi, set lỗi
        } else {
          // Nếu không có lỗi, cập nhật danh sách yêu cầu kết bạn
          setRequests(result);
          //console.log(result);
        }
      } else {
        setError("Token không hợp lệ hoặc chưa đăng nhập.");
      }
    };

    if (loginResult) {
      fetchRequests(); // Gọi hàm khi loginResult thay đổi
    }
  }, [loginResult]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RequestFriend");
        }}
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
          {`Lời mời kết bạn (${requests.data?.totalRequests})`}
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
