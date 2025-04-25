import apiClient from '../apiClient';

export const sendRequest = async (phoneNumber, token) => {
  try {
    const res = await apiClient.post(
      '/friend/request',
      { phoneNumber: phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log('❌ Lỗi acceptFriend:', err.response?.data || err.message);
    throw err;
  }
};
