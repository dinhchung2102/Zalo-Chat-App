import apiClient from "../apiClient";

export const login = async (phone, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      phoneNumber: phone,
      password: password,
    });

    console.log("Đăng nhập thành công:", response.data);
    return response.data;
  } catch (error) {
    // Kiểm tra nếu lỗi có phản hồi từ server
    if (error.response) {
      console.error(
        "Lỗi khi đăng nhập:",
        error.response.data?.message || error.message
      );
      throw error.response.data?.message || "Login failed";
    }

    // Nếu không có phản hồi từ server (ví dụ: không có kết nối)
    console.error("Lỗi khi kết nối tới server:", error.message);
    throw "Không thể kết nối đến server";
  }
};
