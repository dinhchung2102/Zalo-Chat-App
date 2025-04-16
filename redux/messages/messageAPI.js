import axiosInstance from "../api/axiosInstance";

const MessageAPI = {
  sendMessage: (data) => axiosInstance.post("/messages/sendMessage", data),
  sendFile: (formData) => axiosInstance.post("/messages/send-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  getMessages: (conversationId, query = {}) =>
    axiosInstance.get(`/messages/getMessages/${conversationId}`, {
      params: query,
    }),
};

export default MessageAPI;
