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
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessagesThunk, sendFileThunk, sendMessageThunk } from "../../redux/messages/messageThunk";

import * as ImagePicker from "expo-image-picker";
import io from "socket.io-client";
import { getSocket, initializeSocket } from "../../redux/messages/socketMessage";


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
                // Khi có tin nhắn mới, bạn có thể cập nhật lại danh sách tin nhắn nếu cần
                dispatch(fetchMessagesThunk({ conversationId }));
            });
        }

        // Clean up socket connection when the component is unmounted
        return () => {
            const socket = getSocket();
            if (socket) {
                socket.off("newMessage"); // Remove the event listener to prevent memory leaks
            }
        };
    }, [conversationId]);

    const renderItem = ({ item }) => {
        const isMine = item.senderId._id === currentUserId;
    
        return (
            <View
                style={[
                    styles.messageContainer, item.messageType === "image" && { padding: 0, borderWidth:2 },
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
                ) : null}
            </View>
        );
    };
    


    const handleSendMessage = () => {
        if (message.trim() === "") return; // Kiểm tra nếu không có tin nhắn

        const messageData = {
            conversationId,
            content: message,
            senderId: currentUserId,
            timestamp: new Date().toISOString(),
            sending: true,  // Đánh dấu tin nhắn là đang gửi
            sent: false,    // Chưa gửi thành công
        };

        // Thêm tin nhắn vào state (cho trạng thái "đang gửi")
        dispatch(sendMessageThunk(messageData)); // Lưu tin nhắn vào Redux để UI hiển thị

        const socket = getSocket();
        if (socket) {
            socket.emit("sendMessage", messageData); // Gửi tin nhắn qua socket
        }

        setMessage(""); // Clear the input field
    };

    const handleSendFile = async () => {
        try {
            // Mở thư viện để chọn ảnh
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedImage = result.assets[0];

                const formData = new FormData();
                formData.append("conversationId", conversationId);
                formData.append("senderId", currentUserId);
                formData.append("file", {
                    uri: pickedImage.uri,
                    type: "image/jpeg", // <- Gán cố định nếu ảnh
                    name: pickedImage.fileName || `image_${Date.now()}.jpg`,
                });

                console.log(formData)

                dispatch(sendFileThunk(formData));
            }
        } catch (error) {
            console.log("Error picking image:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={90}
        >
            {/* Header */}
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
                        <Ionicons name="information-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Messages */}
            <FlatList
                data={[...messages].reverse()} // Đảo ngược để hiển thị đúng thứ tự
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.chatContent}
                inverted
            />

            {/* Input */}
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
}

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
