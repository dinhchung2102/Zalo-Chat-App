import { View, Text } from 'react-native'
import React from 'react'
import { textMediumSize } from '../../constants/fontSize'
import { Colors } from '../../styles/Colors'

export default function NoteText({text}) {
  return (
    <View>
      <Text style={{fontSize: textMediumSize, color: Colors.grey}}>{text}</Text>
    </View>
  )
}