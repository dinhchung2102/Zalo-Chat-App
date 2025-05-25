import { StyleSheet, View, ScrollView } from 'react-native';
import ProfileSection from '@components/screens/Chat/ProfileSection';
import QuickActionButtons from '@components/screens/Chat/QuickActionButtons';
import SimpleHeader from '@components/shared/SimpleHeader';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { selectedConversationState } from '@state/ChatState';
import GroupNameChange from '../../components/screens/Chat/modals/GroupNameChange';
import { useState } from 'react';

const GroupDetailScreen = () => {
  const selectedConversation = useRecoilValue(selectedConversationState);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const quickActions = [
    {
      title: 'Tìm tin nhắn',
      icon: 'search',
      onPress: () => console.log('Tìm tin nhắn'),
    },
    {
      title: 'Thêm thành viên',
      icon: 'person-add',
      onPress: () => navigation.navigate('MemberGroup'),
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
            selectedConversation.fullName ||
            selectedConversation.groupName ||
            'Selected Conversation'
          }
          avatar={selectedConversation.profilePic || 'https://i.pravatar.cc/150?img=6'}
          isGroup={selectedConversation.isGroup}
          onEditName={() => setModalVisible(true)}
        />

        <QuickActionButtons actions={quickActions} />

        <View style={styles.section}></View>
      </ScrollView>

      <GroupNameChange visible={modalVisible} setVisible={setModalVisible} />
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

export default GroupDetailScreen;
