import { saveLoginResult } from "../../utils/asyncStorage";
import apiClient from "../apiClient";
import {formatPhoneNumber} from "../../utils/formatPhoneNumber"

export const login = async (phone, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      phoneNumber: formatPhoneNumber(phone),
      password: password,
      deviceType: "app",
    });

    console.log("Đăng nhập thành công:", response.data);
    saveLoginResult(response.data); 
    return response;
  } catch (error) {
    if (error.response) {
      // console.error(
      //   "Lỗi khi đăng nhập:",
      //   error.response.data?.message || error.message
      // );
      console.log("error response:", error.response.data?.message);
      return error.response.data?.message;  
    }
    console.error("Lỗi khi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
