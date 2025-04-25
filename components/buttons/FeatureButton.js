import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ICON_MEDIUM } from '../../styles/constants/iconSize'
import { Colors } from '../../styles/Colors'
import { BASE_UNIT } from '../../styles/constants/screen'
import { textMediumSize } from '../../styles/constants/fontSize'

export default function FeatureButton({feature, description, icon}) {
  return (
    <TouchableOpacity style={{borderBottomColor: Colors.lightGrey, borderBottomWidth: BASE_UNIT*0.0025,borderTopColor: Colors.lightGrey, borderTopWidth: BASE_UNIT*0.0025,flexDirection:'row', alignItems:'center', backgroundColor:'white', paddingHorizontal: BASE_UNIT*0.03, paddingVertical: BASE_UNIT*0.03}}>
      <MaterialIcons name={icon} size={ICON_MEDIUM} color={Colors.primary} style={{paddingRight: BASE_UNIT*0.05}}/>
      <View style={{justifyContent:'center', flex: 1}}>
        <Text style={{fontSize: textMediumSize}}>{feature}</Text>
        {description ? (
            <Text style={{color: Colors.grey}}>{description}</Text>
        ) : null}
      </View>
      <MaterialIcons name='keyboard-arrow-right' size={ICON_MEDIUM} color={Colors.grey}/>
    </TouchableOpacity>
  )
}