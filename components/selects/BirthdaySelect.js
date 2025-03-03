import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BASE_UNIT } from '../../constants/screen'
import { Colors } from '../../styles/Colors'
import { textMediumSize } from '../../constants/fontSize'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM_PLUS } from '../../constants/iconSize'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'

export default function BirthdaySelect() {
  const [dob, setDob] = useState(new Date());
  const [borderColor, setBorderColor] = useState(Colors.grey);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dob,
      mode: 'date',
      display: 'default',
      onChange: handleDateChange,
      minimumDate: new Date().setFullYear(new Date().getFullYear() -100),
      maximumDate: new Date().setFullYear(new Date().getFullYear() - 15)
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate); 
    setBorderColor(Colors.primary)
  };
  return (
    <TouchableOpacity style={{width:'100%',
      height: BASE_UNIT*0.13,
      borderRadius: BASE_UNIT*0.015,
      borderWidth: 1,
      borderColor: borderColor,
      paddingHorizontal: BASE_UNIT*0.04,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'}} onPress={showDatePicker

    }>
      <Text style={{fontSize: textMediumSize, color: borderColor}}>{dob.toLocaleDateString()}</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name='calendar-month'/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}