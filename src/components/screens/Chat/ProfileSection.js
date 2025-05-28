import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileSection = ({ name, avatar, description, isGroup, onEditName }) => {
  return (
    <View style={styles.profileSection}>
      <View style={styles.imageContainer}>
        <Image
          source={avatar ? { uri: avatar } : require('../../../../assets/default-avatar.jpg')}
          style={styles.avatar}
        />
        {isGroup && (
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        {onEditName && (
          <TouchableOpacity onPress={onEditName}>
            <Ionicons name="pencil" size={18} color="#777" />
          </TouchableOpacity>
        )}
      </View>

      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default ProfileSection;
