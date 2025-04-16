// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import conversationReducer from "./conversations/conversationSlice";
import messageReducer from "./messages/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationReducer,
    message: messageReducer,
  },
});
