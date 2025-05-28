import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleHeader from '@components/shared/SimpleHeader';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { formatDate } from '@utils/formatDate';
import { Ionicons } from '@expo/vector-icons';
import LargeButton from '@components/shared/LargeButton';
import { useState } from 'react';
import { useBirthdayPicker } from '@hooks/useBirthdayPicker';
import { languageState } from '@state/PrimaryState';
import { updateProfile } from '@api/auth/update.profile';

export default function ProfileUpdate_Handle() {
  const navigation = useNavigation();
  const [loginResult, setLoginResult] = useRecoilState(loginResultState);
  const selectedLanguage = useRecoilValue(languageState);

  const [name, setName] = useState(loginResult.user.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(loginResult.user.dateOfBirth));
  const [gender, setGender] = useState(loginResult.user.gender);
  const [loading, setLoading] = useState(true);

  const { showDatePicker } = useBirthdayPicker({
    minimumAge: 15,
    dateValue: dateOfBirth,
    setDateValue: setDateOfBirth,
    language: selectedLanguage,
  });

  const handleUpdate = async () => {
    const response = await updateProfile(
      loginResult.user._id,
      name,
      dateOfBirth,
      gender,
      loginResult.token
    );
    setLoginResult((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        fullName: name,
        dateOfBirth,
        gender,
      },
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SimpleHeader
        onPress={() => {
          navigation.goBack();
        }}
        linearPrimary={true}
        iconColor={'white'}
        text={'Chỉnh sửa thông tin'}
      />
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            overflow: 'hidden',
            marginLeft: 10,
            marginTop: 5,
            backgroundColor: '#006AF5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading && <ActivityIndicator size="small" color="#ffffff" />}
          <Image
            source={{ uri: loginResult.user.profilePic }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={(error) => {
              console.log('Lỗi load ảnh:', error.nativeEvent);
              setLoading(false);
            }}
          />
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 20, flex: 1, marginRight: 10 }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên mới"
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              fontSize: 18,
              flex: 1,
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              alignItems: 'center',
            }}
            onPress={showDatePicker}
          >
            <TextInput
              value={formatDate(dateOfBirth)}
              style={{ fontSize: 18, paddingLeft: 10, flex: 1 }}
              editable={false}
            />
            <Ionicons name="calendar" size={20} color={'#006AF5'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 110,
          justifyContent: 'space-between',
          paddingRight: 50,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            setGender('Male');
          }}
        >
          <Ionicons
            name={gender === 'Male' ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={26}
            color={gender === 'Male' ? '#006AF5' : 'grey'}
          />
          <Text style={{ marginLeft: 10, fontSize: 17 }}>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            setGender('Female');
          }}
        >
          <Ionicons
            name={gender === 'Female' ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={26}
            color={gender === 'Female' ? '#006AF5' : 'grey'}
          />
          <Text style={{ marginLeft: 10, fontSize: 17 }}>Nữ</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
        <LargeButton
          onPress={handleUpdate}
          text={'Thay đổi'}
          disabled={false}
          color={'#006AF5'}
          textColor={'white'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
