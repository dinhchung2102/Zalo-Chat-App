import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BASE_UNIT } from '../../constants/screen'
import { Colors } from '../../styles/Colors'
import { textMediumSize } from '../../constants/fontSize'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM_PLUS } from '../../constants/iconSize'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import { useTextLanguage } from '../../hooks/useTextLanguage'
import { useRecoilValue } from 'recoil'
import { languageState } from '../../state/PrimaryState'

export default function BirthdaySelect({minimumAge, dateValue, setDateValue}) {
  const [borderColor, setBorderColor] = useState(Colors.grey);
  const language = useRecoilValue(languageState);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dateValue,
      mode: 'date',
      display: 'default',
      onChange: handleDateChange,
      minimumDate: new Date().setFullYear(new Date().getFullYear() -100),
      maximumDate: new Date().setFullYear(new Date().getFullYear() - minimumAge)
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateValue;
    setDateValue(currentDate); 

    if(currentDate.getFullYear() < new Date().getFullYear())
      setBorderColor(Colors.primary)
    else
      setBorderColor(Colors.grey)
  };

  //DD/MM/YY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear().toString()
  
    return `${day}/${month}/${year}`;
  };
  
  const handleDateString = (date) =>{
    if(language === 'vie')
      return formatDate(date)
    if(language === 'eng')
      return date.toLocaleDateString()

  }
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
      <Text style={{fontSize: textMediumSize, color: borderColor}}>{handleDateString(dateValue)}</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <MaterialIcons size={ICON_MEDIUM_PLUS} name='calendar-month'/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}