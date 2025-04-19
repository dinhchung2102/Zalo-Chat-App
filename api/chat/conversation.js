import apiClient from "../apiClient";
export const getListConversation = async (token) => {
  try {
    const response = await apiClient.get("/conversations/getList", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
export const unseenMessages = async (token, conversationId, userId) => {
  try {
    const response = await apiClient.post(
      `/conversations/${conversationId}/reset-unseen`,
      { userId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("[ERROR]: Khi unseen Message", error.response.data?.message);
      return error.response.data?.message;
    }
    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
