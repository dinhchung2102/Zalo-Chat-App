// hooks/useResetAllAtoms.js
import { useRecoilTransaction_UNSTABLE } from 'recoil';

// ChatState
import { conversationState, messagesByConversationState } from '../state/ChatState';

// FriendState
import { requestState, findUserState } from '../state/FriendState';

// PrimaryState
import {
  languageState,
  modalLanguageState,
  modalAuthRegister,
  modalValidatorPhoneNumber,
  navigationState,
  loginResultState,
} from '../state/PrimaryState';

// RegisterState
import {
  phoneNumberRegister,
  nameRegister,
  emailRegister,
  passwordRegister,
  genderRegister,
  profilePicRegister,
} from '../state/RegisterState';

const allAtoms = [
  // Chat
  conversationState,
  messagesByConversationState,

  // Friend
  requestState,
  findUserState,

  // Primary
  languageState,
  modalLanguageState,
  modalAuthRegister,
  modalValidatorPhoneNumber,
  navigationState,
  loginResultState,

  // Register
  phoneNumberRegister,
  nameRegister,
  emailRegister,
  passwordRegister,
  genderRegister,
  profilePicRegister,
];

const useResetAllAtoms = () =>
  useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    allAtoms.forEach(reset);
  });

export default useResetAllAtoms;
