import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '@components/shared/NavigationBar';
import SearchHeader from '@components/shared/SearchHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_LARGE, ICON_MEDIUM } from '@styles/constants/iconSize';
import { Colors } from '@styles/Colors';
import { BASE_UNIT } from '@styles/constants/screen';
import { textMediumSize } from '@styles/constants/fontSize';
import FeatureButton from '@components/screens/Personal/FeatureButton';
import { useRecoilValue } from 'recoil';
import { nameRegister, profilePicRegister } from '@state/RegisterState';
import { getShortNameRegister } from '@utils/getShortName';
import { useNavigation } from '@react-navigation/native';
import { loginResultState } from '@state/PrimaryState';

export default function Profile() {
  const navigation = useNavigation();
  const name = useRecoilValue(nameRegister);

  const loginResult = useRecoilValue(loginResultState);
  console.log(loginResult.user.profilePic);

  if (!loginResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Đang tải thông tin người dùng...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        linearPrimary={true}
        iconColor={'white'}
        iconName2={'settings'}
        iconName2Size={ICON_MEDIUM * 1.2}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: BASE_UNIT * 0.03,
          paddingHorizontal: BASE_UNIT * 0.02,
        }}
        onPress={() => {
          navigation.navigate('ProfileUser');
        }}
      >
        {loginResult.user.profilePic === '' ? (
          <View
            style={{
              height: ICON_LARGE,
              width: ICON_LARGE,
              borderRadius: ICON_LARGE,
              backgroundColor: Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>
              {getShortNameRegister(name) || getShortNameRegister(loginResult.user.fullName)}
            </Text>
          </View>
        ) : (
          <>
            <Image
              source={{
                uri: loginResult.user.profilePic,
              }}
              style={{
                height: ICON_LARGE,
                width: ICON_LARGE,
                borderRadius: ICON_LARGE,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </>
        )}

        <View style={{ paddingLeft: BASE_UNIT * 0.04, flex: 1 }}>
          <Text style={{ fontSize: textMediumSize }}>{name || loginResult.user.fullName}</Text>
          <Text style={{ color: Colors.grey }}>Xem trang cá nhân</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="manage-accounts" size={ICON_MEDIUM} color={Colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{ paddingVertical: BASE_UNIT * 0.015 }}>
        <FeatureButton
          feature={'zCloud'}
          icon={'cloud'}
          description={'Không gian lưu trữ dữ liệu trên đám mây'}
        />
        <FeatureButton
          feature={'zStyle - Nổi bật trên Zalo'}
          icon={'auto-fix-high'}
          description={'Hình nền và nhạc chờ cho cuộc gọi Zalo'}
        />
      </View>

      <View style={{ paddingVertical: BASE_UNIT * 0.002 }}>
        <FeatureButton
          feature={'Cloud của tôi'}
          icon={'cloud-queue'}
          description={'Lưu trữ các tin nhắn quan trọng'}
        />
        <FeatureButton
          feature={'Dữ liệu trên máy'}
          icon={'pie-chart'}
          description={'Quản lý dữ liệu Zalo của bạn'}
        />
      </View>
      <View style={{ paddingVertical: BASE_UNIT * 0.015 }}>
        <FeatureButton feature={'Tài khoản và bảo mật'} icon={'security'} />
        <FeatureButton feature={'Quyền riêng tư'} icon={'lock-person'} />
      </View>

      <View style={{ position: 'absolute', bottom: 0 }}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
});
