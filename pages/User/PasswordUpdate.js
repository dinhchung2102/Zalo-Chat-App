import { View, Text, TouchableOpacity } from 'react-native';
import SimpleHeader from '@components/shared/SimpleHeader';
import LoginInput from '@components/screens/SignUp/textInputs/LoginInput';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { updatePassword } from '@api/auth/update.profile';

export default function PasswordUpdate() {
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const usernameInputRef = useRef(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleChangePassword = async () => {
    if (newPassword != confirmPassword) {
      setNote('Mật khẩu xác thực không khớp');
      return;
    } else {
      const response = await updatePassword(loginResult.token, oldPassword, newPassword);
      console.log(response);

      if (response.status === 200) {
        setNote(response.data.message);
        setTimeout(() => {
          navigation.goBack();
        }, 3000); // chờ 3 giây
      } else {
        setNote('Cập nhật thất bại: ' + response.message);
      }
    }
  };
  return (
    <View>
      <SimpleHeader
        linearPrimary={true}
        textColor={'white'}
        iconColor={'white'}
        text={'Cập nhật mật khẩu'}
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
          placeholder={'Mật khẩu cũ'}
          value={oldPassword}
          onChangeText={setOldPassword}
          autoFocus={true}
          ref={usernameInputRef}
          fontSize={18}
          password={true}
          securePassword={true}
        />
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
        onPress={handleChangePassword}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
}
