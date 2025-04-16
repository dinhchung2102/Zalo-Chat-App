// src/redux/api/axiosInstance.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, API_PORT } from "@env";

const instance = axios.create({

  baseURL: `http://${API_BASE_URL}:${API_PORT}/api`,// hoặc IP máy thật nếu mobile
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
