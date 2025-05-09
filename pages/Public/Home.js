import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LanguageSelect from '@components/screens/SignUp/selects/LanguageSelect';
import { BASE_UNIT } from '@styles/constants/screen';
import LargeButton from '@components/shared/LargeButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import SelectLanguageModal from '@components/screens/SignUp/modals/SelectLanguageModal';
import { modalLanguageState } from '@state/PrimaryState';
import IntroSwiper from '@components/screens/Home/IntroSwiper';
import { useNavigation } from '@react-navigation/native';
import { useTextLanguage } from '@hooks/useTextLanguage';
import { API_URL, SOCKET_URL } from '@env';

export default function Home() {
  const navigation = useNavigation();
  const [, setModalVisible] = useRecoilState(modalLanguageState);
  console.log(API_URL, SOCKET_URL);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <LanguageSelect onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.content}>
        <IntroSwiper />
      </View>
      <View style={styles.footer}>
        <LargeButton
          text={useTextLanguage({ vietnamese: 'Đăng nhập', english: 'Login' })}
          color={'#006DFE'}
          textColor={'white'}
          onPress={() => navigation.navigate('Login')}
          disabled={false}
        />
        <LargeButton
          text={useTextLanguage({
            vietnamese: 'Tạo tài khoản mới',
            english: 'Create new account',
          })}
          onPress={() => navigation.navigate('SignUp')}
          color={'#ECEDEF'}
          textColor={'black'}
          disabled={false}
        />
      </View>
      <SelectLanguageModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: BASE_UNIT,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: BASE_UNIT * 0.01,
  },
  content: {
    alignItems: 'center',
    marginTop: BASE_UNIT * 0.02,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.3,
    paddingBottom: BASE_UNIT * 0.07,
  },
});
