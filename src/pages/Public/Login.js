import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SimpleHeader from '@components/shared/SimpleHeader';
import LoginInput from '@components/screens/SignUp/textInputs/LoginInput';
import { BASE_UNIT } from '@styles/constants/screen';
import { useNavigation } from '@react-navigation/native';
import LinkButton from '@components/shared/LinkButton';
import CircleButton from '@components/screens/SignUp/buttons/CircleButton';
import { Colors } from '@styles/Colors';
import { useTextLanguage } from '@hooks/useTextLanguage';
import { login } from '@api/auth/login';
import { useRecoilState } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { useLoading } from '@hooks/useLoading';
import LoadingOverlay from '@components/shared/LoadingOverlay';

export default function Login() {
  const navigation = useNavigation();
  const { isLoading, withLoading } = useLoading();

  const [username, setUsername] = useState('0333222100');
  const [password, setPassword] = useState('Abc1234@');
  const [securePassword, setSecurePassword] = useState(true);
  const [, setLoginResult] = useRecoilState(loginResultState);
  const [error, setError] = useState(null);
  const usernameInputRef = useRef(null);

  const handleCheckNull = () => {
    return username != '' && password != '';
  };

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    if (handleCheckNull()) {
      try {
        await withLoading(async () => {
          const response = await login(username, password);
          console.log('[DEBUG]: Lưu thông tin đăng nhập vào Recoil: ', response.data);
          setLoginResult(response.data);
          if (response.status === 200) {
            navigation.navigate('HomeMessage');
          } else {
            setError(response);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.statusbarColor} barStyle={'light-content'} />
      <View>
        <SimpleHeader
          text={useTextLanguage({ vietnamese: 'Đăng nhập', english: 'Login' })}
          iconColor={'white'}
          linearPrimary={true}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.viewText}>
          <Text style={styles.text}>
            {useTextLanguage({
              vietnamese: 'Vui lòng nhập số điện thoại và mật khẩu để đăng nhập',
              english: 'Please enter phone number and password to login',
            })}
          </Text>
        </View>

        <View style={styles.content}>
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
          <LoginInput
            placeholder={useTextLanguage({
              vietnamese: 'Mật khẩu',
              english: 'Password',
            })}
            value={password}
            onChangeText={setPassword}
            password={true}
            securePassword={securePassword}
          />
          {error && <Text style={{ color: 'red', fontStyle: 'italic' }}>{error}</Text>}
          <View style={{ marginTop: BASE_UNIT * 0.02 }}>
            <LinkButton
              text={useTextLanguage({
                vietnamese: 'Lấy lại mật khẩu',
                english: 'Recover password',
              })}
              textColor={Colors.primary}
              onPress={() => navigation.navigate('ConfirmPhoneNumber')}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <LinkButton
          text={useTextLanguage({
            vietnamese: 'Câu hỏi thường gặp',
            english: 'FAQ',
          })}
          textColor={Colors.primary}
          icon={'chevron-right'}
          onPress={() => navigation.navigate('FAQ')}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          bottom: BASE_UNIT * 0.03,
          right: BASE_UNIT * 0.02,
        }}
      >
        <CircleButton
          disabled={!handleCheckNull()}
          color={handleCheckNull() ? Colors.primary : Colors.grey}
          onPress={async () => {
            await handleLogin();
          }}
        />
      </View>
      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewText: {
    backgroundColor: '#f0f0f0',
    height: BASE_UNIT * 0.1,
    justifyContent: 'center',
    marginBottom: BASE_UNIT * 0.02,
  },
  text: {
    paddingHorizontal: BASE_UNIT * 0.02,
  },
  content: {
    paddingHorizontal: BASE_UNIT * 0.03,
  },
  footer: {
    paddingHorizontal: BASE_UNIT * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: BASE_UNIT * 0.03,
    position: 'absolute',
  },
});
