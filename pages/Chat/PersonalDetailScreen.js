import { StyleSheet, View, ScrollView } from 'react-native';
import ProfileSection from '@components/screens/Chat/ProfileSection';
import QuickActionButtons from '@components/screens/Chat/QuickActionButtons';
import { useNavigation } from '@react-navigation/native';
import { selectedConversationState } from '@state/ChatState';
import { useRecoilValue } from 'recoil';
import SimpleHeader from '@components/shared/SimpleHeader';

const PersonalDetailScreen = () => {
  const navigation = useNavigation();
  const selectedConversation = useRecoilValue(selectedConversationState);

  const quickActions = [
    {
      title: 'Tìm tin nhắn',
      icon: 'search',
      onPress: () => console.log('Tìm tin nhắn'),
    },
    {
      title: 'Trang cá nhân',
      icon: 'person',
      onPress: () => console.log('Trang cá nhân'),
    },
    {
      title: 'Đổi hình nền',
      icon: 'image',
      onPress: () => console.log('Đổi hình nền'),
    },
    {
      title: 'Tắt thông báo',
      icon: 'notifications-off',
      onPress: () => console.log('Tắt thông báo'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <SimpleHeader
          linearPrimary={true}
          color={'white'}
          iconColor={'white'}
          text={'Tùy chọn'}
          onPress={() => navigation.goBack()}
        />
        <ProfileSection
          name={
            selectedConversation.user || selectedConversation.groupName || selectedConversation._id
          }
          avatar={selectedConversation.profilePic || 'profilePic'}
          description="Bình tĩnh chơi cờ, bình tĩnh sống"
          onEditName={() => console.log('Edit name')}
        />

        <QuickActionButtons actions={quickActions} />

        <View style={styles.section}></View>

        <View style={[styles.section, styles.lastSection]}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  lastSection: {
    marginBottom: 30,
  },
});

export default PersonalDetailScreen;
