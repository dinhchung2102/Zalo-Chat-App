import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      return result.assets[0].uri;
    }

    return null;
  };

  // Chụp ảnh
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Bạn cần cấp quyền để sử dụng camera!");
      return null;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      return result.assets[0].uri;
    }

    return null;
  };

  return {
    imageUri,
    pickImage,
    takePhoto,
  };
};

export default useImagePicker;
