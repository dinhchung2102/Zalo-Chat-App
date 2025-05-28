export function formatPhoneNumber(phoneNumber) {
  // Loại bỏ tất cả khoảng trắng và ký tự không phải số
  let cleaned = phoneNumber.replace(/\D/g, '');

  // Nếu số đã có "+84", giữ nguyên
  if (cleaned.startsWith('+84')) {
    return cleaned;
  }

  if (cleaned.startsWith('0')) {
    return '+84' + cleaned.slice(1);
  }

  // Nếu số bắt đầu với "84" nhưng thiếu dấu "+", thêm vào
  if (cleaned.startsWith('84')) {
    return '+84' + cleaned.slice(2);
  }

  // Mặc định thêm "+84" vào trước nếu chưa có
  return '+84' + cleaned;
}
