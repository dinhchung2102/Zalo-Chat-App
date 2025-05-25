import { View, Text, StyleSheet, Image } from 'react-native';

const FileIcon = ({ fileType }) => {
  const fileIconMap = {
    RAR: require('../../assets/fileIcon/zip.png'),
    ZIP: require('../../assets/fileIcon/zip.png'),
    //Định dạng doc cũ office 2003??
    DOC: require('../../assets/fileIcon/doc.png'),
    DOCX: require('../../assets/fileIcon/docx.png'),
    TXT: require('../../assets/fileIcon/txt.png'),
    PDF: require('../../assets/fileIcon/pdf.png'),
    PPT: require('../../assets/fileIcon/ppt.png'),
    PPTX: require('../../assets/fileIcon/ppt.png'),
    JPG: require('../../assets/fileIcon/image.png'),
    JPEG: require('../../assets/fileIcon/image.png'),
    PNG: require('../../assets/fileIcon/image.png'),
    MP4: require('../../assets/fileIcon/video.png'),
    MPEG: require('../../assets/fileIcon/record.png'),
    XLS: require('../../assets/fileIcon/xls.png'),
    XLSX: require('../../assets/fileIcon/xlsx.png'),
    // Add more file types here
  };

  const iconName = fileIconMap[fileType] || require('../../assets/fileIcon/file.png');
  return (
    <View style={styles.iconContainer}>
      <Image source={iconName} style={{ height: 50, width: 50 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10,
  },
});

export default FileIcon;
