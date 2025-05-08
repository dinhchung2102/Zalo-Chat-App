import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/shared/SimpleHeader';
import ChooseButton from '@components/shared/buttons/ChooseButton';
import { BASE_UNIT } from '@styles/constants/screen';
import { textMediumSize } from '@styles/constants/fontSize';
import { Colors } from '@styles/Colors';
import { useNavigation } from '@react-navigation/native';
import { logout } from '@api/auth/logout';
import useResetAllAtoms from '@hooks/useResetAllAtoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import socket from '@services/socketService';
import ImagePickerModal from '../../components/shared/ImagePickerModal';
import { updateAvatar } from '../../api/auth/update.avt';
import { useLoading } from '@hooks/useLoading';
import LoadingOverlay from '@components/shared/LoadingOverlay';
import { profilePicRegister } from '../../state/RegisterState';

export default function ProfileSetting() {
  const navigation = useNavigation();
  const [loginResult, setLoginResult] = useRecoilState(loginResultState);
  const resetAll = useResetAllAtoms();
  const { isLoading, withLoading } = useLoading();

  const [modalPickImageVisible, setModalPickImageVisible] = useState(false);
  const setTempProfilePic = useSetRecoilState(profilePicRegister);

  const handleImageSelected = (image) => {
    withLoading(async () => {
      const resUpdate = await updateAvatar(loginResult.token, image.uri);
      setTempProfilePic(image.uri);

      setLoginResult((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          profilePic: resUpdate.profilePic,
        },
      }));
      navigation.goBack();
    });
  };

  if (!loginResult) {
    return (
      <View style={styles.container}>
        <LoadingOverlay visible={true} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        linearPrimary={true}
        iconColor={'white'}
        text={loginResult.user.fullName}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ width: '100%', paddingHorizontal: BASE_UNIT * 0.05 }}>
        <ChooseButton text={'Thông tin'} textSize={textMediumSize} />
        <ChooseButton
          text={'Đổi ảnh đại diện'}
          textSize={textMediumSize}
          onPress={() => {
            setModalPickImageVisible(true);
          }}
        />
        <ChooseButton
          text={'Đổi ảnh bìa'}
          textSize={textMediumSize}
          onPress={() => {
            setModalPickImageVisible(true);
          }}
        />
        <ChooseButton text={'Cập nhật giới thiệu bản thân'} textSize={textMediumSize} />
        <ChooseButton text={'Ví của tôi'} textSize={textMediumSize} />
      </View>

      <View
        style={{
          height: BASE_UNIT * 0.02,
          width: '100%',
          backgroundColor: Colors.lightGrey,
        }}
      ></View>
      <View
        style={{
          marginTop: BASE_UNIT * 0.05,
          paddingHorizontal: BASE_UNIT * 0.05,
          width: '100%',
        }}
      >
        <Text style={{ color: Colors.primary, fontWeight: '700' }}>Cài đặt</Text>
        <ChooseButton text={'Mã QR của tôi'} textSize={textMediumSize} />
        <ChooseButton text={'Quyền riêng tư'} textSize={textMediumSize} />
        <ChooseButton text={'Quản lý tài khoản'} textSize={textMediumSize} />
        <ChooseButton text={'Cài đặt chung'} textSize={textMediumSize} />
      </View>

      <View
        style={{
          marginTop: BASE_UNIT * 0.05,
          paddingHorizontal: BASE_UNIT * 0.05,
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{}}
          onPress={async () => {
            await logout(loginResult.token);
            resetAll();
            socket.disconnect();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
        >
          <Text
            style={{
              fontSize: textMediumSize,
              color: 'red',
              fontWeight: '600',
            }}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
      <ImagePickerModal
        visible={modalPickImageVisible}
        onClose={() => setModalPickImageVisible(false)}
        onImageSelected={handleImageSelected}
      />
      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
