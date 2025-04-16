import { createAsyncThunk } from "@reduxjs/toolkit";
import MessageAPI from "./messageAPI";

// Get messages
export const fetchMessagesThunk = createAsyncThunk(
  "message/fetchMessages",
  async ({ conversationId, query }, { rejectWithValue }) => {
    try {
      const res = await MessageAPI.getMessages(conversationId, query);

      return res.data.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message || "Lỗi khi lấy tin nhắn");
    }
  }
);

// Send text message
export const sendMessageThunk = createAsyncThunk(
  "message/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await MessageAPI.sendMessage(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi gửi tin nhắn");
    }
  }
);

// Send file
export const sendFileThunk = createAsyncThunk(
  "message/sendFile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await MessageAPI.sendFile(formData);

      console.log(res)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi gửi file");
    }
  }
);
