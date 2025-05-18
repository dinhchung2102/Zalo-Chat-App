import { atom } from 'recoil';
import uuid from 'react-native-uuid';

export const tempTokenState = atom({
  key: 'tempTokenState',
  default: '',
});

export const resetTokenState = atom({
  key: 'resetTokenState',
  default: '',
});

export const phoneNumberRegister = atom({
  key: 'phoneNumberRegister',
  default: '',
});

export const nameRegister = atom({
  key: 'nameRegister',
  default: '',
});

export const emailRegister = atom({
  key: 'emailRegister',
  default: '',
});

export const passwordRegister = atom({
  key: 'passwordRegister',
  default: 'Abc1234@',
});

export const genderRegister = atom({
  key: 'genderRegister',
  default: '',
});

export const profilePicRegister = atom({
  key: 'profilePic',
  default: '',
});
