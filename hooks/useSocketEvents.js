import { useEffect, useRef } from 'react';
import { createSocket } from '@services/socketService';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { requestState } from '@state/FriendState';
import {
  conversationState,
  messagesByConversationState,
  selectedConversationState,
} from '@state/ChatState';
import * as Notifications from 'expo-notifications';
import { unseenMessages } from '@api/chat/conversation';
import { loginResultState } from '@state/PrimaryState';
import { navigate } from '@services/RootNavigation';
import { getCurrentRouteName } from '@services/RootNavigation';

export default function useSocketEvents(userId, onNewMessage) {
  const setRequests = useSetRecoilState(requestState);
  const setMessages = useSetRecoilState(messagesByConversationState);
  const setConversationData = useSetRecoilState(conversationState);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationState);
  const selectedConversationRef = useRef(selectedConversation);
  const loginResult = useRecoilValue(loginResultState);

  const socketRef = useRef(null);

  // Cập nhật ref khi selectedConversation thay đổi
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!userId) {
      console.log('⚠️ Không có userId, không thể kết nối socket.');
      return;
    }

    // Tạo socket mới mỗi khi userId thay đổi
    const socket = createSocket(userId);
    socketRef.current = socket;

    // Connect socket
    socket.connect();

    // Event handlers
    const onConnect = () => {
      console.log('✅ Socket connected với ID:', socket.id);
    };

    const onConnectError = (err) => {
      console.log('❌ Socket connect error:', err.message);
    };

    const onFriendRequest = (data) => {
      console.log('📨 Nhận yêu cầu kết bạn:', data);

      //Chưa fix được - set để hiển thị ở giao diện liên hệ
      setRequests((prev) => {
        const isRequestExist = prev.data?.requests.some((r) => r._id === data._id);
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
        return prev;
      });
      //console.log(requests.data.requests);
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lời mời kết bạn',
          body: `${data.senderInfo.fullName} đã gửi cho bạn một lời mời kết bạn`,
          sound: 'default',
          data: { type: 'friendRequest' },
        },
        trigger: null,
      });
    };

    const onFriendRequestAccepted = (data) => {
      console.log('✅ Lời mời đã được chấp nhận:', data);
    };

    const onNewMessageHandler = (data) => {
      if (onNewMessage) onNewMessage(data);

      const currentSelected = selectedConversationRef.current;

      //Hàm xử lý trạng thái xem tin nhắn
      const handleUnseenMessage = async () => {
        await unseenMessages(loginResult.token, data.conversationId, loginResult.user._id);
      };

      //Khi có tin nhắn mới, set lại
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
              unseenCount: data.senderId._id !== userId ? (convo.unseenCount || 0) + 1 : 0,
            };
          }
          return convo;
        });
        updated.sort((a, b) => new Date(b.latestActivityTime) - new Date(a.latestActivityTime));
        return updated;
      });

      //Nếu người gửi không phải user hiện tại
      if (data.senderId._id !== userId) {
        //Nếu message gửi cho cuộc trò chuyện đang mở
        if (currentSelected?._id === data.conversationId) {
          //Thêm vào đoạn tin nhắn đang nhắn
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

          //Cập nhật thời gian cho UI conversation
          setConversationData((prevData) => {
            const updated = prevData.map((convo) => {
              if (convo._id === data.conversationId) {
                return { ...convo, unseenCount: 0 };
              }
              return convo;
            });
            updated.sort((a, b) => new Date(b.latestActivityTime) - new Date(a.latestActivityTime));
            return updated;
          });

          //Đã xem tin nhắn
          handleUnseenMessage();

          //Nếu có người thu hồi tin nhắn
          if (data.status === 'recalled') {
            setMessages((prev) => {
              if (!prev?.data || !Array.isArray(prev.data)) return prev;

              const updatedData = prev.data.map((msg) => {
                if (msg._id === data._id) {
                  return {
                    ...msg,
                    status: 'recalled',
                  };
                }
                return msg;
              });

              return {
                ...prev,
                data: updatedData,
              };
            });
          }
        } else {
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
    };

    const onLeaveGroup = (data) => {
      // console.log('SOCKET onleaveGroup:', data);
      // console.log('data.memberId: ', data.memberId);
      // console.log('loginResult.user._id', loginResult.user._id);
      // console.log('selectedConversation', selectedConversation);
      const currentSelected = selectedConversationRef.current;
      if (data.memberId === userId) {
        if (!currentSelected || currentSelected._id !== data.conversationId) {
          setConversationData((prevData) => {
            const updated = prevData.filter((prev) => prev._id !== data.conversationId);
            updated.sort((a, b) => new Date(b.latestActivityTime) - new Date(a.latestActivityTime));
            return [...updated];
          });
        } else {
          setTimeout(() => {
            //setSelectedConversation(null);
            navigate('HomeMessage');
            //Đợi 1 giây cho nó về homemessage trước// Lỗi null nếu còn screens đang cần dùng selectedConversation
          }, 1000);
        }
      }
    };

    const onGroupUpdated = (data) => {
      const currentScreen = getCurrentRouteName();
      if (currentScreen === 'HomeMessage') {
        navigate('HomeMessage');
      }
    };
    // Đăng ký sự kiện
    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('friendRequest', onFriendRequest);
    socket.on('friendRequestAccepted', onFriendRequestAccepted);
    socket.on('newMessage', onNewMessageHandler);
    socket.on('leaveGroup', onLeaveGroup);
    socket.on('groupUpdated', onGroupUpdated);

    // Cleanup khi unmount hoặc userId thay đổi
    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('friendRequest', onFriendRequest);
      socket.off('friendRequestAccepted', onFriendRequestAccepted);
      socket.off('newMessage', onNewMessageHandler);
      socket.off('leaveGroup', onLeaveGroup);
      socket.off('groupUpdated', onGroupUpdated);

      socket.disconnect();
      socketRef.current = null;
    };
  }, [
    userId,
    onNewMessage,
    loginResult.token,
    loginResult.user._id,
    setConversationData,
    setMessages,
    setRequests,
  ]);

  return null;
}
