import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatHeader from "../../components/headers/ChatHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_UNIT } from "../../constants/screen";
import { ICON_MEDIUM_PLUS } from "../../constants/iconSize";
import { Colors } from "../../styles/Colors";
import { textMediumSize } from "../../constants/fontSize";
import { useRecoilValue } from "recoil";
import { loginResultState } from "../../state/PrimaryState";
import { sendFile, sendMessage } from "../../api/chat/messages";
import useSocketEvents from "../../hooks/useSocketEvents";
import { getShortNameRegister } from "../../utils/getShortName";

export default function PersonChat() {
  const route = useRoute();
  const { userInfo, messagesData } = route.params;
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);

  // console.log(`<<<userInfo>>>: `,userInfo);
  //console.log(`<<<messagesData>>>`, messagesData);

  const [messages, setMessages] = useState("");
  const [messageList, setMessageList] = useState(messagesData.data);

  const handleSendFile = async () => {
    const conversationId = "chuaco";
    const senderId = loginResult.user._id;
    loginResult.token;
    const file = selectedFile; // lấy từ input hoặc picker

    const response = await sendFile(conversationId, file, senderId, token);
    console.log("Kết quả gửi file:", response);
  };

  console.log(messageList);

  useSocketEvents(loginResult.user._id, (newMessage) => {
    if (newMessage.conversationId === messagesData.data[0].conversationId) {
      setMessageList((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);
        if (!exists) {
          return [...prev, newMessage];
        }
        return prev;
      });
    }
  });

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messageList]);

  // console.log("<<<Login result>>>",loginResult);
  // const conversation = useRecoilValue(conversationState)
  // console.log("<<ConversationState: Lấy hết ko đúng>>", conversation);

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage(
        messagesData.data[0].conversationId,
        messages,
        loginResult.token
      );

      console.log("Tin nhắn gửi thành công: ", response);

      setMessages("");

      // 👇 Kiểm tra xem đã có tin nhắn này chưa (dựa vào _id)
      setMessageList((prev) => {
        const exists = prev.some((msg) => msg._id === response._id);
        if (!exists) {
          return [...prev, response];
        }
        return prev;
      });
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        linearPrimary={true}
        iconColor={"white"}
        userInfo={userInfo}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: BASE_UNIT * 0.2 }}
      >
        {messageList.map((item, index, array) => {
          const isMe = item.senderId._id === loginResult.user._id;
          const isFirstMessageFromSender =
            index === 0 || item.senderId._id !== array[index - 1].senderId._id;

          if (isMe) {
            return (
              <View
                key={item._id}
                style={{
                  flexDirection: "row-reverse",
                  padding: BASE_UNIT * 0.01,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#d4f1ff",
                    padding: BASE_UNIT * 0.02,
                    borderRadius: BASE_UNIT * 0.02,
                    maxWidth: BASE_UNIT * 0.7,
                    marginLeft: isFirstMessageFromSender ? BASE_UNIT * 0.12 : 0,
                    minHeight: BASE_UNIT * 0.12,
                    borderWidth: 1,
                    borderColor: "#d2e7f2",
                  }}
                >
                  <Text style={{ fontSize: textMediumSize }}>
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View
                key={item._id}
                style={{ flexDirection: "row", padding: BASE_UNIT * 0.01 }}
              >
                {isFirstMessageFromSender &&
                  (item.senderId.profilePic ? (
                    <Image
                      source={{ uri: item.senderId.profilePic }}
                      height={BASE_UNIT * 0.1}
                      width={BASE_UNIT * 0.1}
                      style={{
                        borderRadius: BASE_UNIT * 0.05,
                        marginRight: BASE_UNIT * 0.02,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: BASE_UNIT * 0.1,
                        width: BASE_UNIT * 0.1,
                        backgroundColor: Colors.primary,
                        borderRadius: BASE_UNIT * 0.05,
                        marginRight: BASE_UNIT * 0.02,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {getShortNameRegister(item.senderId.fullName)}
                      </Text>
                    </View>
                  ))}

                <View
                  style={{
                    backgroundColor: "white",
                    padding: BASE_UNIT * 0.02,
                    borderRadius: BASE_UNIT * 0.02,
                    maxWidth: BASE_UNIT * 0.7,
                    marginLeft: isFirstMessageFromSender ? 0 : BASE_UNIT * 0.12,
                    minHeight: BASE_UNIT * 0.1,
                  }}
                >
                  <Text style={{ fontSize: textMediumSize, flexShrink: 1 }}>
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          paddingHorizontal: BASE_UNIT * 0.02,
          minHeight: BASE_UNIT * 0.13,
          backgroundColor: "white",
          width: BASE_UNIT,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGrey,
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name="happy-outline"
            size={ICON_MEDIUM_PLUS}
            color={"grey"}
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Tin nhắn"
          multiline={true}
          value={messages}
          onChangeText={setMessages}
          style={{
            fontSize: textMediumSize,
            marginLeft: BASE_UNIT * 0.02,
            //backgroundColor: "red",
            flex: 1,
            paddingHorizontal: BASE_UNIT * 0.03,
            minHeight: BASE_UNIT * 0.13,
            maxHeight: BASE_UNIT * 0.4,
          }}
        />
        {messages.trim().length != 0 ? (
          <>
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons
                name="send-sharp"
                size={ICON_MEDIUM_PLUS}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={ICON_MEDIUM_PLUS}
                color={"grey"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: BASE_UNIT * 0.05 }}>
              <Ionicons
                name="mic-outline"
                size={ICON_MEDIUM_PLUS}
                color={"grey"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: BASE_UNIT * 0.05 }}>
              <Ionicons
                name="image-outline"
                size={ICON_MEDIUM_PLUS}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e8f3",
  },
});
