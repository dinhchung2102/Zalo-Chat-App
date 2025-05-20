import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '@components/shared/SearchHeader';
import MessageTitleRender from '@components/screens/Chat/MessageTitleRender';
import { BASE_UNIT } from '@styles/constants/screen';
import NavigationBar from '@components/shared/NavigationBar';
import { Colors } from '@styles/Colors';
import useSocketEvents from '@hooks/useSocketEvents';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { useNavigation } from '@react-navigation/native';
import ChatSettingModal from '@components/screens/Chat/modals/ChatSettingModal';
import { useState } from 'react';

export default function HomeMessage() {
  const loginResult = useRecoilValue(loginResultState);
  const navigation = useNavigation();
  const [modalSettingVisible, setModalSettingVisible] = useState(false);

  useSocketEvents(loginResult?.user?._id);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <SearchHeader
        linearPrimary={true}
        iconColor={'white'}
        textColor="white"
        iconName={'qr-code-outline'}
        iconName2={'add'}
        iconOnpress2={() => {
          setModalSettingVisible(true);
        }}
      />

      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.05,
          paddingVertical: BASE_UNIT * 0.03,
        }}
      >
        <MessageTitleRender />
      </View>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <NavigationBar />
      </View>
      <ChatSettingModal visible={modalSettingVisible} setVisible={setModalSettingVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
