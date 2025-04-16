import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../../components/headers/SearchHeader";
import MessageTitleRender from "../../components/renderItems/MessageTitleRender";
import { BASE_UNIT } from "../../constants/screen";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Colors } from "../../styles/Colors";
import { getLoginResult } from "../../utils/asyncStorage";
import second from '../../hooks/useSocketEvents'
import useSocketEvents from "../../hooks/useSocketEvents";
import socket from "../../services/socketService";

export default function HomeMessage() {
  const [loginResult, setLoginResult] = useState(null);

  useEffect(() => {
    const fetchLoginResult = async () => {
      const result = await getLoginResult();
      setLoginResult(result);
      console.log("📦 Login info:", result);
    };

    fetchLoginResult();
  }, []);

  // ✅ Gọi hook ở ngoài điều kiện (tránh vi phạm quy tắc hook)
  useSocketEvents(loginResult?.user?._id);

  // ✅ socket.on phải đặt trong useEffect nếu không sẽ bị lặp
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      console.log("Query params:", socket.handshake.query);
    });

    return () => {
      socket.off("connect");
    };
  }, []);
  
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        textColor="white"
        iconName={"qr-code-outline"}
        iconName2={"add"}
      />
      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.05,
          paddingVertical: BASE_UNIT * 0.03,
        }}
      >
        <MessageTitleRender />
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
    backgroundColor: "white",
  },
});
