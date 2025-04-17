import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_UNIT } from "../../constants/screen";
import {
  textLargeSize,
  textMediumPlus,
  textMediumSize,
} from "../../constants/fontSize";
import { Colors } from "../../styles/Colors";
import { getLoginResult } from "../../utils/asyncStorage";
import { getListConversation } from "../../api/chat/conversation";
import { getTimeAlong } from "../../utils/getTimeAlong";
import { useTextLanguage } from "../../hooks/useTextLanguage";
import { getShortNameRegister } from "../../utils/getShortName";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { conversationState, messagesByConversationState } from "../../state/ChatState";
import { getMessages } from "../../api/chat/messages";
import { loginResultState } from "../../state/PrimaryState";

export default function MessageTitleRender() {
  const [dataConversations, setDataConversations] = useRecoilState(conversationState);
  const [messageDetail, setMessageDetail] = useRecoilState(messagesByConversationState)
  const locale = useTextLanguage({ vietnamese: "vi", english: "en" });
  const navigation = useNavigation();
  const [loginResult, setLoginResult] = useRecoilState(loginResultState);

  useEffect(() => {
    const fetchLoginResult = async () => {
      const result = await getLoginResult();
  
      if (result && result.token) {
        setLoginResult(result); // <<< THÊM DÒNG NÀY
        const conversations = await getListConversation(result.token);
        setDataConversations(conversations.data);
        console.log(conversations.data);
      }
    };
  
    fetchLoginResult();
  }, []);
  
  //Sample data test render item:
  return (
    <View style={styles.container}>
      {dataConversations.map((item) => {
        return (
          <TouchableOpacity
            key={item._id}
            style={{
              paddingBottom: BASE_UNIT * 0.05,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={async () => {
              //console.log(`item sẽ truyền:`,item._id);
              //console.log(loginResult.token);
              const messages = await getMessages(loginResult.token, item._id)
              navigation.navigate("PersonChat", {userInfo: item, messagesData: messages});
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary,
                height: BASE_UNIT * 0.15,
                width: BASE_UNIT * 0.15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: BASE_UNIT * 0.15,
              }}
            >
              {item.avatar ? (
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    width: BASE_UNIT * 0.15,
                    height: BASE_UNIT * 0.15,
                    borderRadius: BASE_UNIT * 0.15,
                  }}
                />
              ) : item.participants.length === 1 ? (
                <Image
                  source={{
                    uri: "https://imgur.com/1L0lWDZ.png", // hoặc link nào bạn muốn dùng mặc định
                  }}
                  style={{
                    width: BASE_UNIT * 0.12,
                    height: BASE_UNIT * 0.12,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: BASE_UNIT * 0.15,
                    height: BASE_UNIT * 0.15,
                    borderRadius: BASE_UNIT * 0.15,
                    backgroundColor: Colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: textMediumPlus, color: "white" }}>
                    {getShortNameRegister(item.recipient.fullName)}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                height: "100%",
                paddingLeft: BASE_UNIT * 0.03,
                paddingVertical: BASE_UNIT * 0.01,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: textMediumSize * 1.1,
                    marginBottom: BASE_UNIT * 0.01,
                  }}
                >
                  {item.groupName || item.name}
                </Text>
                <Text style={{ color: Colors.grey }}>
                  {getTimeAlong(item.updatedAt, locale)}
                </Text>
              </View>

              <Text
                style={{ fontSize: textMediumSize * 0.9, color: Colors.grey }}
              >
                {item.lastMessage ? item.lastMessage.content : "Nhắn tin"}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
