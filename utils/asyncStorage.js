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


export const saveLoginResult = async (loginResult) => {
  try {
    await AsyncStorage.setItem("loginResult", JSON.stringify(loginResult)); 
    console.log("Lưu thông tin đăng nhập:", loginResult);
  } catch (error) {
    console.error("Lỗi khi lưu thông tin đăng nhập:", error);
  }
};

// Lấy thông tin đăng nhập
export const getLoginResult = async () => {
  try {
    const loginResult = await AsyncStorage.getItem("loginResult");
    return loginResult ? JSON.parse(loginResult) : null; 
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đăng nhập:", error);
    return null;
  }
};

// Xóa thông tin đăng nhập
export const removeLoginResult = async () => {
  try {
    await AsyncStorage.removeItem("loginResult");
    console.log("Thông tin đăng nhập đã bị xóa khỏi AsyncStorage");
  } catch (error) {
    console.error("Lỗi khi xóa thông tin đăng nhập:", error);
  }
};