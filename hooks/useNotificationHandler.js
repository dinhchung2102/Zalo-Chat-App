import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import {
  selectedConversationState,
  messagesByConversationState,
  conversationState,
} from '@state/ChatState';
import { getConversationById, getMessagesByConversationId } from '@api/chat/conversation';
import { loginResultState } from '@state/PrimaryState';
import { useRecoilValue } from 'recoil';

export default function useNotificationHandler() {
  const navigation = useNavigation();
  const setSelectedConversation = useSetRecoilState(selectedConversationState);
  const setMessages = useSetRecoilState(messagesByConversationState);
  const setConversations = useSetRecoilState(conversationState);
  const loginResult = useRecoilValue(loginResultState);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const data = response.notification.request.content.data;

      if (data.type === 'newMessage' && data.conversationId) {
        try {
          // Gọi API lấy thông tin conversation và messages
          const conversation = await getConversationById(loginResult.token, data.conversationId);
          const messages = await getMessagesByConversationId(
            loginResult.token,
            data.conversationId
          );

          // Set lại Recoil state
          setSelectedConversation(conversation);
          setMessages({ data: messages });

          // Reset unseen count (nếu cần)
          setConversations((prev) =>
            prev.map((c) => (c._id === conversation._id ? { ...c, unseenCount: 0 } : c))
          );

          // Điều hướng đến màn hình chat
          navigation.navigate('PersonChat');
        } catch (error) {
          console.log('❌ Lỗi khi xử lý thông báo:', error);
        }
      }

      if (data.type === 'friendRequest') {
        navigation.navigate('RequestFriend');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [loginResult.token, navigation, setSelectedConversation, setMessages, setConversations]);
}
