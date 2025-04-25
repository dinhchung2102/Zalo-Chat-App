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
