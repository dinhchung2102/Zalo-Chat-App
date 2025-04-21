import { useEffect } from "react";
import socket from "../services/socketService";
import { useRecoilState } from "recoil";
import { requestState } from "../state/FriendState";
import { messagesByConversationState } from "../state/ChatState";
import * as Notifications from "expo-notifications"; // Thêm import cho Notifications

export default function useSocketEvents(userId, onNewMessage) {
  const [requests, setRequests] = useRecoilState(requestState);
  const [messages, setMessages] = useRecoilState(messagesByConversationState);
  useEffect(() => {
    if (!userId) {
      console.log("⚠️ Không có userId, không thể kết nối socket.");
      return;
    }

    console.log("🚀 Đang chuẩn bị kết nối socket với userId:", userId);

    // Cập nhật lại query trước khi connect
    socket.io.opts.query = {
      userId,
      deviceType: "app",
    };

    if (!socket.connected) {
      socket.connect(); // chỉ connect sau khi set query
    }

    // Khi socket kết nối thành công
    socket.on("connect", () => {
      console.log("✅ Socket connected với ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket connect error:", err.message);
    });

    socket.on("friendRequest", (data) => {
      console.log("📨 Nhận yêu cầu kết bạn:", data);
      setRequests((prev) => {
        // Kiểm tra xem _id của yêu cầu có trùng trong danh sách requests không
        const isRequestExist = prev.data?.requests.some(
          (request) => request._id === data._id
        );

        // Nếu không trùng, tiến hành cập nhật
        if (!isRequestExist) {
          return {
            ...prev,
            data: {
              ...prev.data,
              totalRequests: (prev.data?.totalRequests || 0) + 1,
              requests: [...(prev.data?.requests || []), data],
            },
          };
        }
        return prev; // Không thay đổi state
      });
    });

    socket.on("friendRequestAccepted", (data) => {
      console.log("✅ Lời mời đã được chấp nhận:", data);
    });

    socket.on("newMessage", (data) => {
      console.log("💬 Tin nhắn đến:", data);
      // TODO: cập nhật messageState hoặc truyền callback tùy nơi xử lý
      if (onNewMessage) {
        onNewMessage(data);
      }
      setMessages((prev) => {
        const conversationId = data.conversationId;
        const newMessage = data.message;
        const existingMessages = prev[conversationId] || [];
        const updatedMessages = [...existingMessages, newMessage];

        return {
          ...prev,
          [conversationId]: updatedMessages,
        };
      });
      if (data.senderId._id != userId) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Tin nhắn mới",
            body: `${data.senderId.fullName}: ${data.content}`,
            sound: "default",
          },
          trigger: null, // Thông báo ngay lập tức
        });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("friendRequest");
      socket.off("friendRequestAccepted");
      socket.off("newMessage");
    };
  }, []);
}
