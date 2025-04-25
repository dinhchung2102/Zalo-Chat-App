import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '@styles/Colors';

const FileIcon = ({ fileType }) => {
  const fileIconMap = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-word-o',  // Word file
    'application/pdf': 'file-pdf-o', // PDF file
    'image/jpeg': 'file-image-o', // JPG image
    'image/png': 'file-image-o', // PNG image
    'application/vnd.ms-excel': 'file-excel-o', 
    'audio/mpeg': 'file-audio-o', // Audio file
    'video/mp4': 'file-video-o', // Video file
    // Add more file types here
  };

  const iconName = fileIconMap[fileType] || 'file-o'; 
  return (
    <View style={styles.iconContainer}>
      <Icon name={iconName} size={30} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10,
  },
});

export default FileIcon;
