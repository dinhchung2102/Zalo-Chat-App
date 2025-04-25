import { atom } from 'recoil';

export const requestState = atom({
  key: 'requestState',
  default: {},
});

export const findUserState = atom({
  key: 'findUserState',
  default: {},
});
