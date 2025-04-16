// src/redux/auth/authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, getMeApi } from "./authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, REGISTER } from "./authTypes";

export const loginThunk = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await loginApi(data);
        await AsyncStorage.setItem("token", res.data.token);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Đăng nhập thất bại");
    }
});

export const registerThunk = createAsyncThunk(REGISTER, async (data, thunkAPI) => {
    try {
        const res = await registerApi(data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Đăng ký thất bại");
    }
});

export const getMeThunk = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
    try {
        const res = await getMeApi();
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Không thể lấy thông tin người dùng");
    }
});
