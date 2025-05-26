import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import {
  selectedConversationState,
  messagesByConversationState,
  conversationState,
} from '@state/ChatState';
import { getConversationById, unseenMessages } from '@api/chat/conversation';
import { getMessages } from '@api/chat/messages';
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
          const conversation = await getConversationById(loginResult.token, data.conversationId);
          const messages = await getMessages(loginResult.token, data.conversationId);

          // Set lại conversation & message để navigate
          setSelectedConversation(conversation);
          setMessages(messages);

          // Reset unseen count (nếu cần)
          setConversations((prev) =>
            prev.map((c) => (c._id === conversation._id ? { ...c, unseenCount: 0 } : c))
          );
          // Điều hướng đến màn hình chat
          navigation.navigate('PersonChat');
          await unseenMessages(loginResult.token, item._id, loginResult.user._id);
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
