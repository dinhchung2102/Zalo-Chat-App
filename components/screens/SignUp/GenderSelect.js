import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BASE_UNIT } from '../../../constants/screen'
import { Colors } from '../../../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM_PLUS } from '../../../constants/iconSize'
import { textMediumSize } from '../../../constants/fontSize'

export default function GenderSelect({onPress, selectedGender}) {
  const handleSelectGender = (selectedGender)=>{
    if(selectedGender === "None")
      return "Không chia sẻ"
    else if(selectedGender === "Male")
      return "Nam"
    else if(selectedGender === "Female")
      return "Nữ"
    else
      return "Giới tính"
  }
  return (
    <TouchableOpacity style={{
      width:'100%',
      borderWidth: 1,
      borderColor: selectedGender != "nothing" ? Colors.primary : Colors.grey,
      height: BASE_UNIT*0.13,
      borderRadius: BASE_UNIT*0.015,
      paddingHorizontal: BASE_UNIT*0.04,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  }} onPress={onPress}>
      <Text style={{fontSize: textMediumSize, color: selectedGender === "nothing" ? Colors.grey : Colors.primary}}>{handleSelectGender(selectedGender)}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name='keyboard-arrow-down'/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
