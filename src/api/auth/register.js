import apiClient from '../apiClient';

import axios from 'axios';

export const sendOTP = async (phone) => {
  try {
    const response = await apiClient.post('/auth/send-otp', {
      phoneNumber: phone,
    });
    console.log('Kết quả từ API:', response.data);
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
  }
};

export const verifyOTP = async (phone, otpCode) => {
  try {
    const response = await apiClient.post('/auth/verify-otp', {
      phoneNumber: phone,
      otp: otpCode,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error.response?.data || 'Verify OTP failed';
  }
};

export const signup = async (name, phone, selectedDate, password, tempToken, gender) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      fullName: name,
      phoneNumber: phone,
      dateOfBirth: selectedDate,
      gender: gender,
      password,
      tempToken,
    });

    console.log('Đăng ký thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error.response ? error.response.data : error.message);
    throw error.response?.data || 'Signup failed';
  }
};
