import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_UNIT } from '@styles/constants/screen';
import { ICON_MEDIUM } from '@styles/constants/iconSize';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '@utils/formatDate';

export default function ProfileUpdate() {
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <ImageBackground
          source={{
            uri: 'https://th.bing.com/th/id/OIP.LFOfkRli5gE7UH17ixHtjwHaEK?rs=1&pid=ImgDetMain',
          }}
          style={{ width: '100%', height: BASE_UNIT * 0.5 }}
          resizeMode="cover"
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              <Ionicons name="arrow-back" size={ICON_MEDIUM} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'red',
                borderRadius: 30,
                borderWidth: 2,
                borderColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={{
                  uri: loginResult.user.profilePic,
                }}
                style={{
                  borderRadius: 100,
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
            <Text style={{ fontSize: 16, color: 'white', marginLeft: 10 }}>
              {loginResult.user.fullName}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={{ fontWeight: 'bold' }}>Thông tin cá nhân</Text>
        <View style={styles.row}>
          <Text style={styles.title}>Giới tính: </Text>
          <Text style={styles.description}>
            {loginResult.user.gender == 'Male'
              ? 'Nam'
              : loginResult.user.gender == 'Female'
              ? 'Nữ'
              : 'Chưa xác định'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Ngày sinh: </Text>
          <Text style={styles.description}>{formatDate(loginResult.user.dateOfBirth)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Điện thoại: </Text>
          <Text style={styles.description}>{loginResult.user.phoneNumber}</Text>
        </View>

        <TouchableOpacity
          style={{
            margin: 5,
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 10,
          }}
          onPress={() => {
            navigation.navigate('ProfileUpdate_Handle');
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'white',
    flex: 1,
  },
  header: {},
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  title: {
    width: '25%',
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
  },
});
