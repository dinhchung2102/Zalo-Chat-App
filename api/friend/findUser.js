import apiClient from "../apiClient";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

export const findUser = async (phoneNumber) => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber); // chuẩn hóa
    //console.log("📞 Tìm user theo số:", encodeURIComponent(formattedPhone));

    const response = await apiClient.get(
      `/users/get-by-phone/${encodeURIComponent(formattedPhone)}`
    );
    console.log("📲 Kết quả tìm người dùng:", response.data);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.warn(
        "❌ Không tìm thấy user:",
        error.response.data?.message || "Không có dữ liệu"
      );
      return null;
    }
    console.error("🚫 Lỗi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
