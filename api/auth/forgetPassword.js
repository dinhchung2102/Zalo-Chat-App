import apiClient from '../apiClient';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

export const requestForgetPwd = async (phone) => {
  try {
    const response = await apiClient.post('/auth/forgot-password/request', {
      phoneNumber: formatPhoneNumber(phone),
      platform: 'app',
    });
    //console.log('DEBUG:Response', response.data);

    return response;
  } catch (error) {
    if (error.response) {
      //console.log('[ERROR]: Lỗi khi call API login: ', error.response.data?.message);
      return error.response.data?.message;
    }
    //console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};

export const verifyOTPForPasswordReset = async (phoneNumber, otp, tempToken) => {
  try {
    const response = await apiClient.post('/auth/forgot-password/verify-otp', {
      phoneNumber: formatPhoneNumber(phoneNumber),
      otp,
      tempToken,
    });
    //console.log('DEBUG:Response', response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      //console.log('[ERROR]: Lỗi khi call API login: ', error.response.data?.message);
      return error.response.data?.message;
    }
    //console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};

export const resetPassword = async (phoneNumber, newPassword, confirmPassword, resetToken) => {
  try {
    const response = await apiClient.post('/auth/forgot-password/reset', {
      phoneNumber,
      newPassword,
      confirmPassword,
      resetToken,
    });
    //console.log('Response API:', response);

    return response;
  } catch (error) {
    if (error.response) {
      //console.log('[ERROR]: Lỗi khi call API login: ', error.response.data?.message);
      return error.response.data?.message;
    }
    //console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};
