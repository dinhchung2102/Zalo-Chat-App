import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '../components/headers/SimpleHeader'
import HeaderText from '../components/texts/HeaderText'
import BirthdaySelect from '../components/selects/BirthdaySelect'
import { BASE_UNIT } from '../constants/screen'
import GenderSelect from '../components/selects/GenderSelect'
import LargeButton from '../components/buttons/LargeButton'
import { useTextLanguage } from "../hooks/useTextLanguage";
import { useNavigation } from '@react-navigation/native'
import SelectGenderModal from '../components/modals/SelectGenderModal'

export default function SignUpAddProfile() {
  const navigation = useNavigation();

  const [selectedGender, setSelectedGender] = useState("nothing");
  const [modalGenderVisible, setModalGenderVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SimpleHeader onPress={()=>navigation.goBack()}/>
        <HeaderText text={useTextLanguage({vietnamese: "Thêm thông tin cá nhân", english:"add profile"})}/>
      </View>
      <View style={styles.content}>
        <BirthdaySelect/>
        <GenderSelect onPress={()=>{setModalGenderVisible(true)}} selectedGender={selectedGender}/>
      </View>
      <View style={styles.footer}>
        <LargeButton text={useTextLanguage({vietnamese: "Tiếp tục", english:"Next"})} onPress={()=> navigation.navigate("testDatePicker")}/>
      </View>
      <SelectGenderModal modalVisible={modalGenderVisible} setModalVisible={setModalGenderVisible} selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
        width:'100%'
    },
    header:{
        width:'100%',
    },
    content:{
        marginTop:BASE_UNIT*0.08,
        paddingHorizontal: BASE_UNIT*0.05,
        paddingVertical: BASE_UNIT*0.03,
        justifyContent:'space-between',
        height: BASE_UNIT*0.35
    },
    footer:{
        alignItems:'center',
        flex: 1,
        justifyContent:'flex-end',
        paddingBottom: BASE_UNIT*0.04
    }
})