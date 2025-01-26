import { atom } from "recoil";

export const languageState = atom({
  key: "languageState",
  default: "vie",
});

export const modalLanguageState = atom({
  key: "modalLanguageState",
  default: false
})

export const modalAuthRegister = atom({
  key:'modalAuthRegister',
  default: false
})
