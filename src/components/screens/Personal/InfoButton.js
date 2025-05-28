import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function InfoButton({ iconName, value, title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        paddingBottom: 10,
        marginBottom: 10,
      }}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={20} color={'grey'} />
      <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
        {value && <Text style={{ color: 'grey' }}>{value}</Text>}
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color={'grey'} />
    </TouchableOpacity>
  );
}
