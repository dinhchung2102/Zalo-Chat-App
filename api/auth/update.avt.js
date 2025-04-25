import * as ImagePicker from 'expo-image-picker';
import apiClient from '../apiClient';

export const updateAvatar = async (userId, imageUri) => {
  try {
    const formData = new FormData();

    const fileName = imageUri.split('/').pop();
    const fileType = fileName.split('.').pop();

    // Tải file từ URI và chuyển thành Blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Thêm file vào FormData
    formData.append('profilePic', {
      uri: imageUri,
      name: fileName,
      type: `image/${fileType}`,
    });
    formData.append('folder', 'zalo-folder');

    // Gửi request
    const res = await apiClient.put('/auth/update-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Cập nhật ảnh đại diện thành công:', res.data);
    return res.data;
  } catch (error) {
    console.error(
      'Lỗi khi cập nhật ảnh đại diện:',
      error.response ? error.response.data : error.message
    );
    throw error.response?.data || 'Update avatar failed';
  }
};
