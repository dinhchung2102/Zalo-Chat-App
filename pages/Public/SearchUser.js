import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { textLargeSize, textMediumSize } from "../../constants/fontSize";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { findUserState } from "../../state/FriendState";
import { getShortNameRegister } from "../../utils/getShortName";
import { loginResultState } from "../../state/PrimaryState";
import { sendRequest } from "../../api/friend/sendRequest";
import AddFriendButton from "../../components/screens/AddFriend/AddFriendButton";
import SendMessageButton from "../../components/screens/Chat/SendMessageButton";

export default function SearchUser() {
  const navigation = useNavigation();
  const searchUser = useRecoilValue(findUserState);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <ImageBackground
          source={{
            uri: "https://th.bing.com/th/id/OIP.LFOfkRli5gE7UH17ixHtjwHaEK?rs=1&pid=ImgDetMain",
          }}
          style={{ width: "100%", height: BASE_UNIT * 0.5 }}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={ICON_MEDIUM} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={ICON_MEDIUM}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: "white",
          position: "absolute",
          top: BASE_UNIT * 0.4,
          borderRadius: 50,
          borderWidth: 5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            height: 95,
            width: 95,
            borderRadius: 50,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: textLargeSize * 0.6, color: "white" }}>
              {getShortNameRegister(searchUser.user.fullName)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginTop: BASE_UNIT * 0.16,
          fontSize: textMediumSize * 1.2,
          fontWeight: "500",
        }}
      >
        {searchUser.user.fullName}
      </Text>

      {searchUser.status === null ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //backgroundColor: "red",
            width: BASE_UNIT,
            justifyContent: "space-evenly",
            marginTop: BASE_UNIT * 0.03,
          }}
        >
          <AddFriendButton targetUser={searchUser} />
          <SendMessageButton disabled={true} />
        </View>
      ) : searchUser.status === "pending" ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //backgroundColor: "red",
            width: BASE_UNIT,
            justifyContent: "space-evenly",
            marginTop: BASE_UNIT * 0.03,
          }}
        >
          <AddFriendButton targetUser={searchUser} />
          <SendMessageButton disabled={true} />
        </View>
      ) : searchUser.status === "accepted" ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //backgroundColor: "red",
            width: BASE_UNIT,
            justifyContent: "space-evenly",
            marginTop: BASE_UNIT * 0.03,
          }}
        >
          <AddFriendButton targetUser={searchUser} />
          {/* <SendMessageButton
            disabled={false}
            onPress={() => {
              navigation.navigate("PersonChat", { userInfo: searchUser.user });
            }}
          /> */}
        </View>
      ) : searchUser.status === "blocked" ? (
        <View>
          <Text style={{ marginTop: BASE_UNIT * 0.03, textAlign: "center" }}>
            Bạn đã bị chặn, không thể nhắn tin.
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: BASE_UNIT * 0.02,
    paddingTop: BASE_UNIT * 0.02,
  },
  content: {
    marginTop: BASE_UNIT * 0.2,
    alignItems: "center",
  },
});
