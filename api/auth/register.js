import apiClient from "../apiClient";

import axios from "axios";

export const sendOTP = async (phone) => {
  try {
    const response = await apiClient.post("/auth/send-otp", {
      phoneNumber: phone,
    });
    console.log("Kết quả từ API:", response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
  }
};

export const verifyOTP = async (phoneNumber, otpCode) => {
    try {
        const response = await apiClient.post('/auth/verify-otp', { phoneNumber, otpCode });
        return response.data; 
    } catch (error) {
        throw error.response?.data || 'Verify OTP failed';
    }
};