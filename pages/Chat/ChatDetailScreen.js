import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Linking,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessagesThunk,
  sendFileThunk,
  sendMessageThunk,
} from "../../redux/messages/messageThunk";
import * as ImagePicker from "expo-image-picker";
import io from "socket.io-client";
import {
  getSocket,
  initializeSocket,
} from "../../redux/messages/socketMessage";

const ChatDetailScreen = ({ navigation, route }) => {
  const { conversationId, isGroup, name, groupName, avatar } = route.params;
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const currentUserId = user._id;

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessagesThunk({ conversationId }));
    }

    // Initialize socket and connect
    initializeSocket(currentUserId);

    // Handle incoming messages from socket
    const socket = getSocket();
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        dispatch(fetchMessagesThunk({ conversationId }));
      });
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [conversationId]);

  const formatFileSize = (bytes) => {
    if (typeof bytes !== "number") return "";
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleOpenFile = async (fileInfo) => {
    if (!fileInfo?.fileUrl) return;

    try {
      const canOpen = await Linking.canOpenURL(fileInfo.fileUrl);
      if (canOpen) {
        await Linking.openURL(fileInfo.fileUrl);
      } else {
        Alert.alert(
          "Không thể mở file",
          "Không có ứng dụng phù hợp để mở file này",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Lỗi khi mở file:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi mở file", [{ text: "OK" }]);
    }
  };

  const renderItem = ({ item }) => {
    const isMine = item.senderId._id === currentUserId;

    return (
      <View
        style={[
          styles.messageContainer,
          item.messageType === "image" && { padding: 0, borderWidth: 2 },
          isMine ? styles.myMessage : styles.partnerMessage,
        ]}
      >
        {item.messageType === "text" ? (
          <Text style={styles.messageText}>{item.content}</Text>
        ) : item.messageType === "image" ? (
          <Image
            source={{ uri: item.fileInfo?.fileUrl }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        ) : (
          <TouchableOpacity
            style={styles.fileMessageContainer}
            onPress={() => handleOpenFile(item.fileInfo)}
          >
            <View style={styles.fileIcon}>
              <MaterialIcons
                name="insert-drive-file"
                size={24}
                color="#2f80ed"
              />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {item.fileInfo?.fileName || item.content}
              </Text>
              <Text style={styles.fileSize}>
                {item.fileInfo?.fileSize
                  ? formatFileSize(item.fileInfo.fileSize)
                  : "Unknown size"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      conversationId,
      content: message,
      senderId: currentUserId,
      timestamp: new Date().toISOString(),
      sending: true,
      sent: false,
    };

    dispatch(sendMessageThunk(messageData));

    const socket = getSocket();
    if (socket) {
      socket.emit("sendMessage", messageData);
    }

    setMessage("");
  };

  const handleSendFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        const fileType = pickedFile.type || "application/octet-stream";

        const formData = new FormData();
        formData.append("conversationId", conversationId);
        formData.append("senderId", currentUserId);
        formData.append("file", {
          uri: pickedFile.uri,
          type: fileType,
          name: pickedFile.fileName || `file_${Date.now()}`,
        });

        dispatch(sendFileThunk(formData));
      }
    } catch (error) {
      console.log("Error picking file:", error);
      Alert.alert("Error", "Failed to select file");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.partnerName}>{name || groupName}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconRight}>
            <Ionicons name="call-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconRight}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={[...messages].reverse()}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContent}
        inverted
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.fileButton} onPress={handleSendFile}>
          <MaterialIcons name="attach-file" size={24} color={Colors.grey} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          multiline={true}
          returnKeyType="default"
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  partnerName: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRight: {
    marginLeft: 12,
  },
  chatContent: {
    padding: 15,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    maxWidth: "75%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
  },
  partnerMessage: {
    backgroundColor: "red",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "white",
  },
  fileMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f7ff",
    borderRadius: 8,
    borderWidth: 0.1,
    borderColor: "#d0e3ff",
    maxWidth: 250,
  },
  fileIcon: {
    backgroundColor: "#d0e3ff",
    borderRadius: 4,
    padding: 6,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontWeight: "500",
    color: "#2f80ed",
    fontSize: 14,
  },
  fileSize: {
    fontSize: 12,
    color: "#7f8fa6",
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  fileButton: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
  },
});
