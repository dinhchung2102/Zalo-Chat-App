import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '../../components/headers/SimpleHeader'
import ChooseButton from '../../components/buttons/ChooseButton'
import { BASE_UNIT } from '../../constants/screen'
import { textMediumSize } from '../../constants/fontSize'
import { Colors } from '../../styles/Colors'
import { useNavigation } from '@react-navigation/native'
import { getLoginResult } from '../../utils/asyncStorage'

export default function ProfileSetting() {
  const navigation = useNavigation();

  const [loginResult, setLoginResult] = useState(null);
  
    useEffect(() => {
      const fetchLoginResult = async () => {
        const result = await getLoginResult();
        setLoginResult(result);
        console.log(result);
      };
  
      fetchLoginResult();
    }, []);

    if(!loginResult){
      return (
        <View>
          <Text>Đang load...</Text>
        </View>
      )
    }
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader linearPrimary={true} iconColor={'white'} text={loginResult.user.fullName} onPress={()=>{navigation.goBack()}}/>
      <View style={{width:'100%', paddingHorizontal: BASE_UNIT*0.05}}>
        <ChooseButton text={'Thông tin'} textSize={textMediumSize}/>
        <ChooseButton text={'Đổi ảnh đại diện'} textSize={textMediumSize}/>
        <ChooseButton text={'Đổi ảnh bìa'} textSize={textMediumSize}/>
        <ChooseButton text={'Cập nhật giới thiệu bản thân'} textSize={textMediumSize}/>
        <ChooseButton text={'Ví của tôi'} textSize={textMediumSize}/>
      </View>

      <View style={{height: BASE_UNIT*0.02, width: '100%', backgroundColor:Colors.lightGrey}}></View>
      <View style={{marginTop: BASE_UNIT*0.05, paddingHorizontal: BASE_UNIT*0.05, width:'100%'}}>
        <Text style={{color: Colors.primary, fontWeight:'700'}}>Cài đặt</Text>
        <ChooseButton text={'Mã QR của tôi'} textSize={textMediumSize}/>
        <ChooseButton text={'Quyền riêng tư'} textSize={textMediumSize}/>
        <ChooseButton text={'Quản lý tài khoản'} textSize={textMediumSize}/>
        <ChooseButton text={'Cài đặt chung'} textSize={textMediumSize}/>
      </View>


      <View style={{marginTop: BASE_UNIT*0.05, paddingHorizontal: BASE_UNIT*0.05, width:'100%'}}>
        <TouchableOpacity style={{}}>
          <Text style={{fontSize: textMediumSize, color:'red', fontWeight:'600'}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    alignItems:'center',
    backgroundColor:'white',
  }
})