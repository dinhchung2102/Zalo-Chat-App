import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { Ionicons } from '@expo/vector-icons';
import InfoButton from '@components/screens/Personal/InfoButton';
import SimpleHeader from '@components/shared/SimpleHeader';
import { useNavigation } from '@react-navigation/native';

export default function Account_Security() {
  const loginResult = useRecoilValue(loginResultState);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <SimpleHeader
        linearPrimary={true}
        iconColor={'white'}
        textColor={'white'}
        text={'Tài khoản và bảo mật'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.account}>
        <Text style={styles.title}>Tài khoản</Text>
        <TouchableOpacity
          style={styles.infoUser}
          onPress={() => {
            navigation.navigate('ProfileUpdate_Handle');
          }}
        >
          <Image
            source={{ uri: loginResult.user.profilePic }}
            height={60}
            width={60}
            style={{ backgroundColor: 'red', borderRadius: 30 }}
          />
          <View style={styles.personInfo}>
            <Text style={styles.titleInfo}>Thông tin cá nhân</Text>
            <Text style={styles.userName}>{loginResult.user.fullName}</Text>
          </View>

          <Ionicons name="chevron-forward-outline" size={20} color={'grey'} />
        </TouchableOpacity>
        <View>
          <InfoButton
            iconName={'call-outline'}
            title={'Số điện thoại'}
            value={loginResult.user.phoneNumber}
          />
          <InfoButton
            onPress={() => {
              navigation.navigate('EmailUpdate');
            }}
            iconName={'mail-outline'}
            title={'Email'}
            value={loginResult.user.email}
          />
          <InfoButton iconName={'person-outline'} title={'Định danh tài khoản'} />
          <InfoButton iconName={'qr-code-outline'} title={'Mã QR của tôi'} />
        </View>
      </View>

      <View style={styles.security}>
        <Text style={styles.title}>Bảo mật</Text>
        <InfoButton
          iconName={'shield-checkmark-outline'}
          title={'Kiểm tra bảo mật'}
          value={'Không có vấn đề bảo mật nào'}
        />
        <InfoButton iconName={'key-outline'} title={'Khóa Zalo'} />
      </View>

      <View style={styles.security}>
        <Text style={styles.title}>Đăng nhập</Text>
        <InfoButton
          iconName={'shield-checkmark-outline'}
          title={'Bảo mật 2 lớp'}
          value={'Không có vấn đề bảo mật nào'}
        />
        <InfoButton iconName={'phone-portrait'} title={'Thiết bị đăng nhập'} />
        <InfoButton
          iconName={'lock-closed-outline'}
          title={'Mật khẩu'}
          onPress={() => navigation.navigate('PasswordUpdate')}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          width: '100%',
          marginTop: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ flex: 1, fontSize: 16, color: 'red', fontWeight: 'bold' }}>
          Xóa tài khoản
        </Text>
        <Ionicons name="chevron-forward-outline" size={20} color={'grey'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  account: {
    backgroundColor: 'white',
    padding: 10,
  },
  security: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
  },
  infoUser: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginBottom: 25,
  },
  userName: {
    fontWeight: 'bold',
  },
  personInfo: {
    flex: 1,
    paddingLeft: 20,
  },
  titleInfo: {
    color: 'grey',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006AF5',
    marginBottom: 15,
  },
});
