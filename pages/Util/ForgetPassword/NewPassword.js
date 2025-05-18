import { View, Text, TouchableOpacity } from 'react-native';
import SimpleHeader from '@components/shared/SimpleHeader';
import LoginInput from '@components/screens/SignUp/textInputs/LoginInput';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '@api/auth/forgetPassword';
import { phoneNumberRegister } from '@state/RegisterState';
import { useRecoilValue } from 'recoil';
import { resetTokenState } from '@state/RegisterState';

export default function NewPassword() {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const usernameInputRef = useRef(null);
  const [note, setNote] = useState('');
  const phoneNumber = useRecoilValue(phoneNumberRegister);
  const resetToken = useRecoilValue(resetTokenState);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (newPassword != confirmPassword) {
      setNote('Mật khẩu xác thực không khớp');
      return;
    } else {
      const response = await resetPassword(phoneNumber, newPassword, confirmPassword, resetToken);
      console.log('DEBUG: REspone New PWD', response);
      if (response.status === 200) {
        setNote(response.data.message);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }, 2000); // chờ 3 giây
      } else {
        setNote(response);
      }
    }
  };
  return (
    <View>
      <SimpleHeader
        linearPrimary={true}
        textColor={'white'}
        iconColor={'white'}
        text={'Tạo mật khẩu mới'}
        onPress={() => navigation.goBack()}
      />
      <View style={{ padding: 10, backgroundColor: 'lightgrey' }}>
        <Text style={{ textAlign: 'center' }}>
          Mật khẩu phải gồm chữ và số, không được chứa ngày tháng năm sinh, username và tên Zalo của
          bạn
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <LoginInput
          placeholder={'Mật khẩu mới'}
          value={newPassword}
          onChangeText={setNewPassword}
          fontSize={18}
          password={true}
          securePassword={true}
        />
        <LoginInput
          placeholder={'Xác nhận mật khẩu mới'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoFocus={true}
          ref={usernameInputRef}
          fontSize={18}
          password={true}
          securePassword={true}
        />
      </View>
      <Text style={{ padding: 10, color: 'red', fontStyle: 'italic' }}>{note}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#006AF5',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: '30%',
          borderRadius: 100,
          marginTop: 10,
        }}
        onPress={handleUpdatePassword}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
}
