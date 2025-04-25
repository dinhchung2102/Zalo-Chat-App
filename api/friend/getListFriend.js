import apiClient from '../apiClient';

export const getListFriend = async (token) => {
  try {
    const response = await apiClient.get(`/friend/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('[ERROR]: Lỗi khi get List Friend', error.response.data?.message);
      return error.response.data?.message;
    }
    console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};
