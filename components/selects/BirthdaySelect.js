import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_UNIT } from '../../constants/screen'
import { Colors } from '../../styles/Colors'
import { textMediumSize } from '../../constants/fontSize'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM, ICON_MEDIUM_PLUS } from '../../constants/iconSize'

export default function BirthdaySelect({onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{fontSize: textMediumSize, color: Colors.grey}}>21/02/2002</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name='calendar-month'/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height: BASE_UNIT*0.13,
        borderRadius: BASE_UNIT*0.015,
        borderWidth: 1,
        borderColor: Colors.grey,
        paddingHorizontal: BASE_UNIT*0.04,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})