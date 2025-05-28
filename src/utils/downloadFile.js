import RNFS from 'react-native-fs';

export const downloadFile = async (fileInfo) => {
  const { fileName, fileUrl } = fileInfo;

  // Chọn nơi lưu trữ
  const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const options = {
    fromUrl: fileUrl,
    toFile: localPath,
  };

  try {
    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      console.log('Tải file thành công:', localPath);
      return localPath; // trả lại đường dẫn file đã lưu
    } else {
      console.warn('Tải file thất bại với mã:', result.statusCode);
    }
  } catch (err) {
    console.error('Lỗi tải file:', err);
  }
};
