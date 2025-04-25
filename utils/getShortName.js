export const getShortNameRegister = (name) => {
  if (!name || typeof name !== 'string') return '';

  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase(); // Nếu 1 từ, lấy 2 chữ cái đầu
  } else if (words.length === 2) {
    return (words[0][0] + words[1][0]).toUpperCase(); // Nếu 2 từ, lấy ký tự đầu tiên của 2 từ
  } else {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase(); // Nếu 3 từ trở lên, lấy ký tự đầu tiên của từ đầu & cuối
  }
};
