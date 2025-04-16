import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi, getConversationByIdApi } from "./conversationApi";

export const getConversationsThunk = createAsyncThunk("conversations/getList", async (_, thunkAPI) => {
    try {
        const res = await getConversationsApi();
        return res.data.data; // Assuming the response structure has a 'data' field
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Lỗi khi lấy danh sách cuộc trò chuyện");
    }
});

export const getConversationByIdThunk = createAsyncThunk("conversations/getById", async (id, thunkAPI) => {
    try {
        const res = await getConversationByIdApi(id);
        return res.data; // Assuming the response contains the conversation
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Lỗi khi lấy thông tin cuộc trò chuyện");
    }
});
