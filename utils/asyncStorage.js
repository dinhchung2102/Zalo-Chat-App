import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTempToken = async (token) => {
  try {
    await AsyncStorage.setItem("tempToken", token);
    console.log("Token đã lưu vào AsyncStorage");
  } catch (error) {
    console.error("Lỗi khi lưu token:", error);
  }
};

export const getTempToken = async () => {
  try {
    const token = await AsyncStorage.getItem("tempToken");
    return token;
  } catch (error) {
    console.error("Lỗi khi lấy token:", error);
    return null;
  }
};

export const removeTempToken = async () => {
  try {
    await AsyncStorage.removeItem("tempToken");
    console.log("Token đã bị xóa khỏi AsyncStorage");
  } catch (error) {
    console.error("Lỗi khi xóa token:", error);
  }
};
