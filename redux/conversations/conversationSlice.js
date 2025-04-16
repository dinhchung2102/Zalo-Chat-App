import { createSlice } from "@reduxjs/toolkit";
import { getConversationsThunk, getConversationByIdThunk } from "./conversationThunk";

const initialState = {
  conversations: [],
  currentConversation: null,
  isLoading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConversationsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getConversationsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversationsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getConversationByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getConversationByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentConversation = action.payload;
      })
      .addCase(getConversationByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default conversationSlice.reducer;
