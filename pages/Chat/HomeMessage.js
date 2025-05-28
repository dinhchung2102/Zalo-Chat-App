import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '@components/shared/SearchHeader';
import MessageTitleRender from '@components/screens/Chat/MessageTitleRender';
import { BASE_UNIT } from '@styles/constants/screen';
import NavigationBar from '@components/shared/NavigationBar';
import { Colors } from '@styles/Colors';
import useSocketEvents from '@hooks/useSocketEvents';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import ChatSettingModal from '@components/screens/Chat/modals/ChatSettingModal';
import { useState } from 'react';
import useNotificationHandler from '@hooks/useNotificationHandler';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '@services/RootNavigation';

export default function HomeMessage() {
  const loginResult = useRecoilValue(loginResultState);
  const [modalSettingVisible, setModalSettingVisible] = useState(false);
  const isFocused = useIsFocused();

  useSocketEvents(loginResult?.user?._id);
  useNotificationHandler();

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
        <MessageTitleRender isFocused={isFocused} />
      </View>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <NavigationBar />
      </View>
      <ChatSettingModal visible={modalSettingVisible} setVisible={setModalSettingVisible} />

      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#006AF5',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          position: 'absolute',
          bottom: 70,
          right: 10,
        }}
        onPress={() => navigate('AIChat')}
      >
        <Ionicons name="chatbox-ellipses" color={'white'} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
