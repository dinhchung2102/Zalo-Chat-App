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

export const createNewGroup = async (token, groupName, participantIds) => {
  try {
    const response = await apiClient.post(
      `/conversations/createGroup`,
      {
        groupName,
        participantIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("[ERROR]: Khi Tạo nhóm", error.response.data?.message);
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

export const addNewMembers = async (token, conversationId, newMemberIds)=>{
  try {
    const response = await apiClient.post(
      `/conversations/add-members`,
      {
        conversationId,
        newMemberIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("[ERROR]: Khi Thêm thành viên mới", error.response.data?.message);
      return error.response.data?.message;
    }
    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
}


export const getConversationById  = async (token, conversationId) =>{
  try {
    const response = await apiClient.get(`/conversations/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("[ERROR]: Lỗi khi get Conversation by Id", error.response.data?.message);
      return error.response.data?.message;
    }
    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }

}