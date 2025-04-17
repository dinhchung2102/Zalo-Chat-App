import apiClient from '../apiClient';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

export const findUser = async (phoneNumber) => {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber); // Đảm bảo rằng số điện thoại được chuẩn hóa
    console.log(encodeURIComponent(formattedPhone));
    
    
    const response = await apiClient.get(`/users/get-by-phone/${encodeURIComponent(formattedPhone)}`);
    console.log("📲 Kết quả tìm người dùng:", response.data);

    // Kiểm tra nếu API trả về kết quả hợp lệ
    if (response.data && response.data.user) {
      return response.data.user; // Trả về user nếu tìm thấy
    } else {
      return null; // Trả về null nếu không tìm thấy user
    }
  } catch (error) {
    // Kiểm tra lỗi từ API
    if (error.response) {
      console.warn("❌ Không tìm thấy user:", error.response.data?.message || "Không có dữ liệu");
      return null; // Trả về null nếu không tìm thấy user
    }
    // Lỗi kết nối mạng
    console.error("🚫 Lỗi kết nối tới server:", error.message);
    return "Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
