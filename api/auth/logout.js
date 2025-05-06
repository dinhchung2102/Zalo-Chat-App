import { removeLoginResult, removeTempToken } from '@services/storageService';
import apiClient from '../apiClient';

export const logout = async (token) => {
  try {
    const response = await apiClient.post(
      '/auth/logout',
      {
        deviceType: 'app',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Đăng xuất thành công:', response.data);

    await removeTempToken();
    await removeLoginResult();

    return response;
  } catch (error) {
    if (error.response) {
      console.log('error logout response:', error.response.data?.message);
      return error.response.data?.message;
    }

    console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};
