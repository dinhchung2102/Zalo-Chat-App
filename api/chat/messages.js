import apiClient from '../apiClient';

export const getMessages = async (token, conversationId) => {
  try {
    const response = await apiClient.get(`/messages/getMessages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Lấy tin nhắn theo conversationid: ', response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('error response:', error.response.data?.message);
      return error.response.data?.message;
    }
    console.error('Lỗi khi kết nối tới server:', error.message);
    return 'Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.';
  }
};

export const sendMessage = async (conversationId, messageText, token) => {
  try {
    const res = await apiClient.post(
      `/messages/sendMessage`,
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
    console.error('❌ Lỗi gửi message:', err);
  }
};

export const sendFile = async (conversationId, file, senderId, token) => {
  try {
    // Kiểm tra file trước khi gửi
    if (!file || !file.uri) {
      console.error('❌ File không hợp lệ hoặc thiếu URI!');
      return { error: 'File không hợp lệ!' };
    }

    const formData = new FormData();
    formData.append('conversationId', conversationId);
    formData.append('file', {
      uri: file.uri,
      name: file.name || 'file.jpg', // Đặt tên mặc định nếu file không có tên
      type: file.type || 'image/jpeg', // Đặt loại mặc định nếu file không có loại
    });
    formData.append('senderId', senderId);

    const res = await apiClient.post(`/messages/send-file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Kết quả gửi file: ', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Lỗi gửi file:', err);
    return { error: 'Đã xảy ra lỗi khi gửi tệp. Vui lòng thử lại!' };
  }
};

export const recallMessage = async (messageId, token) => {
  try {
    const res = await apiClient.post(
      `/messages/recall-message`,
      {
        messageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('API recall message res.data: ', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Lỗi gửi message:', err);
    return err.message;
  }
};

export const deleteMessage = async (messageId, token) => {
  try {
    const res = await apiClient.post(
      `/messages/delete-message`,
      {
        messageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('API recall message res.data: ', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Lỗi gửi message:', err);
    return err.message;
  }
};
