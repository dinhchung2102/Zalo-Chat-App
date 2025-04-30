import { View, Text, SafeAreaView } from 'react-native';
import SimpleHeader from '@components/shared/SimpleHeader';
import React, { useRef, useState } from 'react';
import { useTextLanguage } from '@hooks/useTextLanguage';
import { BASE_UNIT } from '@styles/constants/screen';
import LoginInput from '@components/screens/SignUp/textInputs/LoginInput';
import CircleButton from '@components/screens/SignUp/buttons/CircleButton';
import { Colors } from '@styles/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmPhoneNumber() {
  const navigation = useNavigation();
  const usernameInputRef = useRef(null);
  const [username, setUsername] = useState('');

  const handleCheckNull = () => {
    return username != '';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <SimpleHeader
        text={useTextLanguage({ vietnamese: 'Lấy lại mật khẩu', english: 'Forget' })}
        iconColor={'white'}
        linearPrimary={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          backgroundColor: '#f0f0f0',
          height: BASE_UNIT * 0.1,
          justifyContent: 'center',
          marginBottom: BASE_UNIT * 0.02,
        }}
      >
        <Text style={{ paddingHorizontal: BASE_UNIT * 0.02 }}>
          {useTextLanguage({
            vietnamese: 'Nhập số điện thoại để lấy lại mật khẩu',
            english: 'Please enter phone number to lấy lại mật khẩu',
          })}
        </Text>
      </View>
      <View style={{ paddingHorizontal: BASE_UNIT * 0.03 }}>
        <LoginInput
          placeholder={useTextLanguage({
            vietnamese: 'Số điện thoại',
            english: 'Phone number',
          })}
          value={username}
          onChangeText={(text) => setUsername(text)}
          phoneNumber={true}
          autoFocus={true}
          ref={usernameInputRef}
        />
      </View>
      <View style={{ position: 'absolute', bottom: BASE_UNIT * 0.03, right: BASE_UNIT * 0.03 }}>
        <CircleButton
          disabled={!handleCheckNull()}
          color={handleCheckNull() ? Colors.primary : Colors.grey}
          onPress={async () => {
            console.log('enter phone');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
