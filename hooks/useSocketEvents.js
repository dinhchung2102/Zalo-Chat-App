import { useEffect, useRef } from 'react';
import socket from '@services/socketService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { requestState } from '@state/FriendState';
import {
  conversationState,
  messagesByConversationState,
  selectedConversationState,
} from '@state/ChatState';
import * as Notifications from 'expo-notifications';
import { unseenMessages } from '@api/chat/conversation';
import { loginResultState } from '@state/PrimaryState';

export default function useSocketEvents(userId, onNewMessage) {
  const setRequests = useSetRecoilState(requestState);
  const setMessages = useSetRecoilState(messagesByConversationState);
  const setConversationData = useSetRecoilState(conversationState);
  const selectedConversation = useRecoilValue(selectedConversationState);
  const selectedConversationRef = useRef(selectedConversation);
  const loginResult = useRecoilValue(loginResultState);
  const socketEventsRegisteredRef = useRef(false);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!userId) {
      console.log('⚠️ Không có userId, không thể kết nối socket.');
      return;
    }
    if (!userId || socketEventsRegisteredRef.current) return;

    socketEventsRegisteredRef.current = true;

    console.log('🚀 Đang chuẩn bị kết nối socket với userId:', userId);

    // Cập nhật lại query trước khi connect
    socket.io.opts.query = {
      userId,
      deviceType: 'app',
    };

    if (!socket.connected) {
      socket.connect(); // chỉ connect sau khi set query
    }

    // Khi socket kết nối thành công
    socket.on('connect', () => {
      console.log('✅ Socket connected với ID:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.log('❌ Socket connect error:', err.message);
    });

    socket.on('friendRequest', (data) => {
      console.log('📨 Nhận yêu cầu kết bạn:', data);
      setRequests((prev) => {
        // Kiểm tra xem _id của yêu cầu có trùng trong danh sách requests không
        const isRequestExist = prev.data?.requests.some((request) => request._id === data._id);

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
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lời mời kết bạn',
          body: `${data.senderInfo.fullName} đã gửi cho bạn một lời mời kết bạn`,
          sound: 'default',
          data: {
            type: 'friendRequest',
          },
        },
        trigger: null,
      });
    });

    socket.on('friendRequestAccepted', (data) => {
      console.log('✅ Lời mời đã được chấp nhận:', data);
    });

    //Handle khi có tin nhắn mới -------------------------------------------------------------------
    socket.on('newMessage', (data) => {
      if (onNewMessage) {
        onNewMessage(data);
      }
      const currentSelected = selectedConversationRef.current;
      const handleUnseenMessage = async () => {
        await unseenMessages(loginResult.token, data.conversationId, loginResult.user._id);
      };

      //Set lại ở màn screen hiện list Conversation
      setConversationData((prevData) => {
        const updated = prevData.map((convo) => {
          if (convo._id === data.conversationId) {
            return {
              ...convo,
              lastMessage: {
                _id: data._id,
                content: data.content,
                sender: { _id: data.senderId._id, fullName: data.senderId.fullName },
                timestamp: data.createdAt,
              },
              latestActivityTime: data.createdAt,
              unseenCount: data.senderId._id != userId ? convo.unseenCount + 1 : 0,
            };
          }
          return convo;
        });
        // Sắp xếp lại theo thời gian hoạt động mới nhất
        updated.sort((a, b) => new Date(b.latestActivityTime) - new Date(a.latestActivityTime));
        return updated;
      });

      if (data.senderId._id != userId) {
        //Nếu đang mở tin nhắn đó thì chỉ setTin nhắn mà không nhận thông báo
        if (currentSelected?._id === data.conversationId) {
          setMessages((prev) => {
            const exists = prev.data.some((msg) => msg._id === data._id);
            if (!exists) {
              return {
                ...prev,
                data: [...prev.data, data],
              };
            }
            return prev;
          });

          //Set lại trạng thái đã xem
          setConversationData((prevData) => {
            const updated = prevData.map((convo) => {
              if (convo._id === data.conversationId) {
                return {
                  ...convo,
                  unseenCount: 0,
                };
              }
              return convo;
            });

            // Sắp xếp lại theo thời gian hoạt động mới nhất
            updated.sort((a, b) => new Date(b.latestActivityTime) - new Date(a.latestActivityTime));
            return updated;
          });
          handleUnseenMessage();
        } else {
          //Chỉ thông báo cho user không thấy
          console.log('💬 Tin nhắn đến:', data);
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Tin nhắn mới',
              body: `${data.senderId.fullName}: ${data.content}`,
              sound: 'default',
              data: {
                type: 'newMessage',
                conversationId: data.conversationId,
              },
            },

            trigger: null,
          });
        }
      }
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('friendRequest');
      socket.off('friendRequestAccepted');
      socket.off('newMessage');
      socketEventsRegisteredRef.current = false; // Cho phép gán lại nếu cần
    };
  }, [userId]);
}
