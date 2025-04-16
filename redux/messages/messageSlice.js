import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMessagesThunk,
  sendMessageThunk,
  sendFileThunk,
} from "./messageThunk";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send message
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

      // Send file
      .addCase(sendFileThunk.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
