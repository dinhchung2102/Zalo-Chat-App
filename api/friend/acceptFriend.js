import apiClient from '../apiClient';

export const acceptFriend = async (reqId, token) => {
  try {
    const res = await apiClient.post(
      "/friend/accept",
      { requestId: reqId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log("❌ Lỗi acceptFriend:", err.response?.data || err.message);
    throw err;
  }
};

