import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import ProfileSection from '@components/screens/Chat/ProfileSection';
import QuickActionButtons from '@components/screens/Chat/QuickActionButtons';
import SimpleHeader from '@components/shared/SimpleHeader';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { selectedConversationState } from '@state/ChatState';
import GroupNameChange from '@components/screens/Chat/modals/GroupNameChange';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GlobalModal from '@components/shared/GlobalModal';
import { loginResultState } from '@state/PrimaryState';
import { deleteGroup } from '@api/chat/conversation';
import { outGroup } from '../../api/chat/conversation';

const GroupDetailScreen = () => {
  const selectedConversation = useRecoilValue(selectedConversationState);
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [messageConfirm, setMessageConfirm] = useState('');
  const [actionType, setActionType] = useState(null);

  const handleConfirm = async () => {
    if (actionType === 'deleteChatHistory') {
      // Xử lý xóa lịch sử trò chuyện
      console.log('Xóa lịch sử trò chuyện');
    } else if (actionType === 'leaderLeaveGroup') {
      // Xử lý rời nhóm
      console.log('Nhóm trưởng không được rời nhóm');
    } else if (actionType === 'memberLeaveGroup') {
      // Xử lý rời nhóm
      const res = await outGroup(loginResult.token, selectedConversation._id);
      navigation.navigate('HomeMessage');
    } else if (actionType === 'disbandGroup') {
      // Xử lý giải tán nhóm
      try {
        console.log(selectedConversation._id);
        const resultDelete = await deleteGroup(loginResult.token, selectedConversation._id);
        if (resultDelete.status == 200) {
          navigation.navigate('HomeMessage');
        } else {
          console.log('[DEBUG]: Lỗi khi giải tán nhóm', resultDelete);
          Alert.alert('Lỗi', 'Không thể giải tán nhóm');
        }
      } catch (error) {
        console.log('[DEBUG]: Lỗi kết nối khi giải tán nhóm', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi kết nối');
      }
    }
    setConfirmModal(false);
    setActionType(null);
  };

  const quickActions = [
    {
      title: 'Tìm tin nhắn',
      icon: 'search',
      onPress: () => console.log('Tìm tin nhắn'),
    },
    {
      title: 'Thêm thành viên',
      icon: 'person-add',
      onPress: () => navigation.navigate('AddMember'),
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

        <View style={styles.section}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={() => navigation.navigate('MemberGroup')}
          >
            <Ionicons name="people-outline" size={22} style={{ marginRight: 10 }} />
            <Text>Xem thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={() => {
              setMessageConfirm(
                'Bạn chắc chắn muốn xóa lịch sử trò chuyện này? Sẽ không thể khôi phục sau khi xóa'
              );
              setActionType('deleteChatHistory');
              setConfirmModal(true);
            }}
          >
            <Ionicons name="trash-outline" size={22} style={{ marginRight: 10 }} color={'red'} />
            <Text style={{ color: 'red' }}>Xóa lịch sử trò chuyện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={() => {
              if (selectedConversation.groupLeader === loginResult.user._id) {
                setMessageConfirm(
                  'Bạn đang là nhóm trưởng, hãy chuyển lại quyền trưởng nhóm cho thành viên khác trước khi rời nhóm'
                );
                setActionType('leaderLeaveGroup');
                setConfirmModal(true);
              } else {
                setMessageConfirm('Bạn chắc chắn muốn rời nhóm chứ?');
                setActionType('memberLeaveGroup');
                setConfirmModal(true);
              }
            }}
          >
            <Ionicons name="exit-outline" size={22} style={{ marginRight: 10 }} color={'red'} />
            <Text style={{ color: 'red' }}>Rời nhóm</Text>
          </TouchableOpacity>
          {loginResult.user._id === selectedConversation.groupLeader && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                display:
                  selectedConversation.groupLeader === loginResult.user._id ? 'flex' : 'none',
              }}
              onPress={() => {
                setMessageConfirm(
                  'Bạn chắc chắn muốn giải tán nhóm này? Sẽ không thể khôi phục sau khi giải tán'
                );
                setActionType('disbandGroup');
                setConfirmModal(true);
              }}
            >
              <Ionicons name="exit-outline" size={22} style={{ marginRight: 10 }} color={'red'} />
              <Text style={{ color: 'red' }}>Giải tán nhóm</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <GroupNameChange visible={modalVisible} setVisible={setModalVisible} />
      <GlobalModal
        visible={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={handleConfirm}
        message={messageConfirm}
      />
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
