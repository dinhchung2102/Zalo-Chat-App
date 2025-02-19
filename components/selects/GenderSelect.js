import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_UNIT } from '../../constants/screen'
import { Colors } from '../../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM_PLUS } from '../../constants/iconSize'
import { textMediumSize } from '../../constants/fontSize'

export default function GenderSelect() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={{fontSize: textMediumSize, color: Colors.grey}}>Giới tính</Text>
      <TouchableOpacity>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name='keyboard-arrow-down'/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: BASE_UNIT*0.13,
        borderRadius: BASE_UNIT*0.015,
        paddingHorizontal: BASE_UNIT*0.04,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})