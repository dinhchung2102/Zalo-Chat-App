import { removeLoginResult, removeTempToken } from "../../utils/asyncStorage";
import apiClient from "../apiClient";
export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout", {});
    console.log("Đăng xuất thành công:", response.data);

    await removeTempToken();
    await removeLoginResult();

    return response;
  } catch (error) {
    await removeTempToken();
    await removeLoginResult();

    if (error.response) {
      console.log("error logout response:", error.response.data?.message);
      return error.response.data?.message;  
    }

    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
