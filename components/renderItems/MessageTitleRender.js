import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumPlus, textMediumSize } from "../../constants/fontSize";
import { Colors } from "../../styles/Colors";
import { getListConversation, unseenMessages } from "../../api/chat/conversation";
import { getTimeAlong } from "../../utils/getTimeAlong";
import { useTextLanguage } from "../../hooks/useTextLanguage";
import { getShortNameRegister } from "../../utils/getShortName";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationState,
  messagesByConversationState,
} from "../../state/ChatState";
import { getMessages } from "../../api/chat/messages";
import { loginResultState } from "../../state/PrimaryState";

export default function MessageTitleRender() {
  const locale = useTextLanguage({ vietnamese: "vi", english: "en" });
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);

  const [dataConversations, setDataConversations] =
    useRecoilState(conversationState);
  const [messages, setMessages] = useRecoilState(messagesByConversationState);
  console.log("<<<[DEBUG]: dataConversations: ", dataConversations);
  //console.log('[DEBUG]: messages: ', messages);

  //Cần nghiên cứu lại
  useEffect(() => {
    const fetchConversations = async () => {
      const conversations = await getListConversation(loginResult.token);
      setDataConversations(conversations.data);
      //console.log("<<<[DEBUG]: Conversations.data:", conversations.data);
    };
    fetchConversations();
  }, [loginResult, messages]);

  return (
    <View style={styles.container}>
      {dataConversations ? (
        dataConversations.map((item) => {
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
                const messages = await getMessages(loginResult.token, item._id);
                await unseenMessages(loginResult.token, item._id, loginResult.user._id);
                setMessages(messages);
                navigation.navigate("PersonChat", {
                  userInfo: item,
                });
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
                      uri: "https://imgur.com/1L0lWDZ.png",
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
                      {getShortNameRegister(
                        item?.recipient?.fullName || item?.groupName || "Nhóm"
                      )}
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
                      fontWeight: item.unseenCount > 0 ? "bold" : "normal",
                    }}
                  >
                    {item.groupName || item.name}
                  </Text>
                  <Text style={{ color: Colors.grey }}>
                    {getTimeAlong(item.updatedAt, locale)}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: item.unseenCount > 0 ? "bold" : "normal",
                    fontSize: textMediumSize * 0.9,
                    color: item.unseenCount > 0 ? "black" : Colors.grey,
                  }}
                >
                  {item.lastMessage
                    ? item.lastMessage.sender._id === loginResult.user._id
                      ? "Bạn: " + item.lastMessage.content
                      : item.isGroup === false
                      ? item.lastMessage.content
                      : item.lastMessage.sender.fullName +
                        ": " +
                        item.lastMessage.content
                    : "Nhắn tin"}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: BASE_UNIT*0.03,
                    height: BASE_UNIT * 0.05,
                    width: BASE_UNIT * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: BASE_UNIT*0.05,
                    backgroundColor: item.unseenCount > 0 ? "red" :"transparent",
                  }}
                >
                  <Text style={{color:"white"}}>{item.unseenCount > 0 ? item.unseenCount : ""}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View>
          <Text>Không thể tải dữ liệu...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
