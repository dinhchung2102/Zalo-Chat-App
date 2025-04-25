import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_UNIT } from '../../styles/constants/screen'
import { Colors } from '../../styles/Colors'

export default function ChooseButton({text, onPress, textColor, textSize}) {
  return (
    <TouchableOpacity style={{borderBottomWidth: BASE_UNIT*0.005, borderBottomColor: Colors.lightGrey, paddingVertical: BASE_UNIT*0.025, justifyContent:'center'}} onPress={onPress}>
      <Text style={{color: textColor, fontSize: textSize}}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})