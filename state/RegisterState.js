import { atom } from "recoil";

export const phoneNumberRegister = atom({
    key:"phoneNumberRegister",
    default: ''
})

export const nameRegister = atom({
    key:"nameRegister",
    default:''
})

export const emailRegister = atom({
    key:"emailRegister",
    default:''
})

export const passwordRegister = atom({
    key:"passwordRegister",
    default:'Abcd@12345'
})

export const genderRegister = atom({
    key: "genderRegister",
    default: ''
})