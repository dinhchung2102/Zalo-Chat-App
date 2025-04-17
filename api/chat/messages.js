import apiClient from '../apiClient';

export const getMessages = async (token, conversationId) => {
  try {
    const response = await apiClient.get(`/messages/getMessages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log('Lấy tin nhắn theo conversationid: ',response.data);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("error response:", error.response.data?.message);
      return error.response.data?.message;
    }
    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};

export const sendMessage = async (conversationId, messageText, token) => {
  try {
    const res = await apiClient.post(`/messages/sendMessage`,
      {
        conversationId,
        content: messageText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("❌ Lỗi gửi message:", err);
  }
}

export const sendFile = async (conversationId, file, senderId, token) => {
  try {
    const formData = new FormData();
    formData.append("conversationId", conversationId);
    formData.append("file", file);
    formData.append("senderId", senderId);

    const res = await apiClient.post(`/messages/send-file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Lỗi gửi file:", err);
  }
};

