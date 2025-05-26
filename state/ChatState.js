import { atom } from 'recoil';

export const conversationState = atom({
  key: 'conversationState',
  default: [],
});

export const messagesByConversationState = atom({
  key: 'messagesByConversationState',
  default: [],
});

export const selectedConversationState = atom({
  key: 'selectedConversationState',
  default: null,
});

export const totalUnseenCountState = atom({
  key: 'totalUnseenCountState',
  default: 0,
});

export const aiChatState = atom({
  key: 'aiChatState',
  default: [
    {
      _id: 'default-1',
      content:
        'Ê, chào bạn! Mình là trợ lý trò chuyện của Nhóm 7 môn công nghệ mới do thầy Tôn Long Phước giảng dạy nè. Gọi mình là gì cũng được, coi như là bạn học cùng nhóm ha! Rất vui được làm quen với bạn! 😉',
      senderId: {
        _id: 'bot-id',
        fullName: 'Trợ lý ảo',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      status: 'sent',
    },
  ],
});
