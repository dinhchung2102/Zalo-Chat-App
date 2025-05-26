import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import SimpleHeader from '@components/shared/SimpleHeader';
import InfoButton from '@components/screens/Personal/InfoButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { useState } from 'react';
import { updateEmail } from '@api/auth/update.profile';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail } from '../../utils/emailValidator';

export default function EmailUpdate() {
  const [loginResult, setLoginResult] = useRecoilState(loginResultState);
  const [emailUpdate, setEmailUpdate] = useState('');
  const [changeEmail, setChangeEmail] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleUpdateEmail = async () => {
    if (isValidEmail(emailUpdate)) {
      const res = await updateEmail(loginResult.user._id, emailUpdate, loginResult.token);
      setLoginResult((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          email: res.email,
        },
      }));
      setError('');
      setChangeEmail(false);
    } else {
      setError('Email không đúng định dạng');
    }
  };
  const handleDisconnectEmail = async () => {
    const res = await updateEmail(loginResult.user._id, '', loginResult.token);
    setLoginResult((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        email: res.email,
      },
    }));
    setError('');
  };

  return (
    <View>
      <SimpleHeader
        onPress={() => navigation.goBack()}
        linearPrimary={true}
        text={'Email'}
        textColor="white"
        iconColor={'white'}
      />
      {/**Trạng thái email */}
      <View style={{ padding: 10, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#006AF5',
            marginBottom: 15,
          }}
        >
          Địa chỉ Email
        </Text>
        <InfoButton
          onPress={() => {
            console.log('hihi');
          }}
          iconName={'mail-outline'}
          title={'Email'}
          value={loginResult.user.email || 'Chưa liên kết'}
        />
      </View>

      {/**Liên kết email */}
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          display: loginResult.user.email ? 'none' : 'flex',
        }}
      >
        <TextInput
          placeholder="Nhập email liên kết"
          style={{
            borderBottomWidth: 0.5,
            padding: 10,
            fontSize: 16,
            paddingTop: 5,
            paddingBottom: 5,
            //borderRadius: 30,
          }}
          value={emailUpdate}
          onChangeText={setEmailUpdate}
        />
        <Text
          style={{
            fontSize: 12,
            fontStyle: 'italic',
            color: 'red',
            display: error ? 'flex' : 'none',
          }}
        >
          {error}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            marginTop: 20,
          }}
          onPress={handleUpdateEmail}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Liên kết</Text>
        </TouchableOpacity>
      </View>

      {/**Thay đổi email */}
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          display: loginResult.user.email ? 'flex' : 'none',
        }}
      >
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
            paddingBottom: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            setChangeEmail(true);
          }}
        >
          <Text style={{ fontSize: 16 }}>Thay đổi Email</Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: 'white',
            display: changeEmail ? 'flex' : 'none',
            marginBottom: 20,
          }}
        >
          <TextInput
            placeholder="Nhập email thay đổi"
            style={{
              borderBottomWidth: 0.5,
              fontSize: 16,
              paddingTop: 5,
              paddingBottom: 5,
              //borderRadius: 30,
            }}
            value={emailUpdate}
            onChangeText={setEmailUpdate}
          />
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              color: 'red',
              display: error ? 'flex' : 'none',
            }}
          >
            {error}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              marginTop: 20,
            }}
            onPress={() => {
              handleUpdateEmail();
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Thay đổi</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleDisconnectEmail}>
          <Text style={{ fontSize: 16, color: 'red' }}>Ngừng liên kết Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
