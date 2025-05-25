import apiClient from '../apiClient';

export const updateProfile = async (id, fullName, dateOfBirth, gender, token) => {
  try {
    const response = await apiClient.put(
      `/auth/update-profile/${id}`,
      {
        fullName,
        dateOfBirth,
        gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Cập nhật thành công:', response.data);
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
  }
};

export const updatePassword = async (token, oldPassword, newPassword) => {
  try {
    const response = await apiClient.put(
      `/auth/update-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    // console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
    return error.response.data;
  }
};

export const updateEmail = async (id, email, token) => {
  try {
    const response = await apiClient.put(
      `/auth/update-profile/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Cập nhật thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
  }
};
