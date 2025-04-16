import axiosInstance from "../api/axiosInstance";

// API call to get conversations list
export const getConversationsApi = () => axiosInstance.get("/conversations/getList");

// API call to get conversation by ID
export const getConversationByIdApi = (id) => axiosInstance.get(`/conversations/${id}`);
