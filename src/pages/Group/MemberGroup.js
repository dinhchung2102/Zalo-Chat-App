import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { selectedConversationState } from '@state/ChatState';
import { getShortNameRegister } from '@utils/getShortName';
import { getConversationById, outGroup, removeMember } from '@api/chat/conversation';
import { removeGroupDeputy, setGroupDeputy, setGroupLeader } from '@api/chat/conversation';
import GlobalModal from '@components/shared/GlobalModal';

const Tab = createMaterialTopTabNavigator();

const MemberGroup = ({ navigation }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const loginResult = useRecoilValue(loginResultState);

  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationState);
  // console.log(selectedConversation);
  // console.log(selectedConversation.groupLeader);

  //Confirm Modal
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleConfirm = async () => {
    if (actionType === 'setGroupDeputy') {
      // Xác nhận set phó nhóm
      const res = await setGroupDeputy(
        loginResult.token,
        selectedMember._id,
        selectedConversation._id
      );
      if (res) {
        setModalVisible(false);
        setSelectedConversation((prev) => ({
          ...prev,
          groupDeputy: selectedMember._id,
        }));
      }
    } else if (actionType === 'setGroupLeader') {
      // Chuyển lại quyền trưởng nhóm
      const res = await setGroupLeader(
        loginResult.token,
        selectedMember._id,
        selectedConversation._id
      );
      if (res) {
        setModalVisible(false);
        setSelectedConversation((prev) => ({
          ...prev,
          groupLeader: selectedMember._id,
        }));
      }
    } else if (actionType === 'removeMember') {
      // Xử lý rời nhóm
      const result = await removeMember(
        loginResult.token,
        selectedConversation._id,
        selectedMember._id
      );
      console.log(result);
      const refreshConver = await getConversationById(loginResult.token, selectedConversation._id);
      console.log(refreshConver);
      setSelectedConversation(refreshConver);
      setModalVisible(false);
    } else if (actionType === 'removeGroupDeputy') {
      // Xóa quyền phó nhóm
      const res = await removeGroupDeputy(loginResult.token, selectedConversation._id);
      if (res) {
        setModalVisible(false);
        setSelectedConversation((prev) => ({
          ...prev,
          groupDeputy: null,
        }));
      }
    }
    setConfirmModal(false);
    setActionType(null);
  };

  const dummyData = selectedConversation.participants;

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Quản lý thành viên</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('AddMember');
          }}
        >
          <Icon name="person-add" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ApprovalSection = () => (
    <TouchableOpacity style={styles.approvalSection}>
      <View style={styles.approvalIcon}>
        <Icon name="person" size={24} color="#666" />
      </View>
      <View style={styles.approvalContent}>
        <Text style={styles.approvalTitle}>Duyệt thành viên</Text>
      </View>
    </TouchableOpacity>
  );

  const MemberListHeader = () => (
    <View style={styles.memberListHeader}>
      <Text style={styles.memberCount}>
        Thành viên ({selectedConversation.participants.length})
      </Text>
      <Text style={styles.memberListDescription}>
        Chỉ trưởng và phó cộng đồng xem được đầy đủ danh sách thành viên.
        <Text style={styles.linkText}>Thay đổi quyền xem</Text>
      </Text>
    </View>
  );

  const MemberItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memberItem}
      onPress={() => {
        setSelectedMember(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.memberLeftContent}>
        {item.profilePic ? (
          <Image source={{ uri: item.profilePic }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text style={{ color: 'white' }}>{getShortNameRegister(item.fullName)}</Text>
          </View>
        )}

        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.fullName}</Text>
          <Text style={styles.memberRole}>
            {item._id === selectedConversation.groupLeader
              ? 'Nhóm trưởng'
              : item._id === selectedConversation.groupDeputy
              ? 'Nhóm phó'
              : item._id === loginResult.user._id
              ? 'Bạn'
              : 'Thành viên'}
          </Text>
        </View>
      </View>

      {item._id != loginResult.user._id && (
        <TouchableOpacity style={styles.addFriendButton}>
          <Icon name="person-add-alt" size={20} color="#0068FF" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const AllMembersScreen = () => (
    <View style={styles.screenContainer}>
      <ApprovalSection />
      <MemberListHeader />
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <MemberItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );

  const AdminScreen = () => (
    <FlatList
      // data={dummyData.filter((m) => m.role.includes("cộng đồng"))}
      // Chưa fix
      data={dummyData}
      renderItem={({ item }) => <MemberItem item={item} />}
      keyExtractor={(item) => item._id}
    />
  );

  const InvitedScreen = () => (
    <View style={styles.emptyTab}>
      <Text>Không có thành viên đã mời</Text>
    </View>
  );

  const BlockedScreen = () => (
    <View style={styles.emptyTab}>
      <Text>Không có thành viên bị chặn</Text>
    </View>
  );

  const MemberInfoModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          {selectedMember && (
            <>
              <Text style={styles.modalTitle}>Thông tin thành viên</Text>
              <Image source={{ uri: selectedMember.profilePic }} style={styles.modalAvatar} />
              <Text style={styles.modalName}>{selectedMember.fullName}</Text>
              <Text style={styles.modalRole}>{selectedMember.role}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="call" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="chat" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.memberAction}>
                  <Text>Xem trang cá nhân</Text>
                </TouchableOpacity>

                {selectedConversation.groupLeader === loginResult.user._id && (
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: '#eee',
                      width: '100%',
                    }}
                    onPress={async () => {
                      setConfirmMessage(
                        `Xác nhận bổ nhiệm ${selectedMember.fullName} làm trưởng nhóm?`
                      );
                      setActionType('setGroupLeader');
                      setModalVisible(false);
                      setConfirmModal(true);
                    }}
                  >
                    <Text style={{ color: 'red' }}>Bổ nhiệm làm trưởng nhóm</Text>
                  </TouchableOpacity>
                )}

                {/**Bổ nhiệm phó nhóm */}
                {loginResult.user._id === selectedConversation.groupLeader ? (
                  <View>
                    {/* Nếu groupDeputy chưa được bổ nhiệm */}
                    {selectedMember._id !== loginResult.user._id ? (
                      <TouchableOpacity
                        style={[styles.memberAction, styles.primaryAction]}
                        onPress={async () => {
                          if (selectedConversation.groupDeputy != selectedMember._id) {
                            setConfirmMessage(
                              `Xác nhận bổ nhiệm ${selectedMember.fullName} làm phó nhóm?`
                            );
                            setActionType('setGroupDeputy');
                            setModalVisible(false);
                            setConfirmModal(true);
                          } else {
                            setConfirmMessage(
                              `Xác nhận xóa bỏ quyền phó nhóm của: ${selectedMember.fullName}`
                            );
                            setActionType('removeGroupDeputy');
                            setModalVisible(false);
                            setConfirmModal(true);
                          }
                        }}
                      >
                        <Text style={styles.primaryText}>
                          {selectedConversation.groupDeputy === selectedMember._id
                            ? 'Xóa quyền phó nhóm'
                            : 'Bổ nhiệm làm phó nhóm'}
                        </Text>
                      </TouchableOpacity>
                    ) : selectedMember._id === selectedConversation.groupDeputy ? (
                      <TouchableOpacity
                        style={[styles.memberAction, styles.warningAction]}
                        onPress={async () => {
                          setConfirmMessage(
                            `Xác nhận xóa bỏ quyền phó nhóm của: ${selectedMember.fullName}`
                          );
                          setActionType('removeGroupDeputy');
                          setModalVisible(false);
                          setConfirmModal(true);
                        }}
                      >
                        <Text style={styles.warningText}>Xoá quyền phó nhóm</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}

                {/**Không thể chặn chính mình */}
                {loginResult.user._id !== selectedMember._id ? (
                  <TouchableOpacity style={styles.memberAction}>
                    <Text>Chặn thành viên</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.memberAction, styles.dangerAction]}
                    onPress={async () => {
                      const result = await outGroup(loginResult.token, selectedConversation._id);
                      console.log(result);

                      navigation.navigate('HomeMessage');
                    }}
                  >
                    <Text style={styles.dangerText}>Rời nhóm</Text>
                  </TouchableOpacity>
                )}

                {/**chỉ leader mới có thể xóa member khỏi cộng đồng*/}
                {loginResult.user._id === selectedConversation.groupLeader &&
                loginResult.user._id !== selectedMember._id ? (
                  <TouchableOpacity
                    style={[styles.memberAction, styles.dangerAction]}
                    onPress={async () => {
                      setConfirmMessage(`Xác nhận xóa ${selectedMember.fullName} khỏi cộng đồng?`);
                      setActionType('removeMember');
                      setModalVisible(false);
                      setConfirmModal(true);
                    }}
                  >
                    <Text style={styles.dangerText}>Xoá khỏi cộng đồng</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen name="Tất cả" component={AllMembersScreen} />
        <Tab.Screen name="Trưởng và phó cộng đồng" component={AdminScreen} />
        <Tab.Screen name="Đã mời" component={InvitedScreen} />
        <Tab.Screen name="Đã chặn" component={BlockedScreen} />
      </Tab.Navigator>
      <MemberInfoModal />
      <GlobalModal
        visible={confirmModal}
        message={confirmMessage}
        onClose={() => setConfirmModal(false)}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
};

export default MemberGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabLabel: {
    fontSize: 13,
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: '#0068FF',
  },
  screenContainer: {
    flex: 1,
  },
  approvalSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  approvalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvalContent: {
    marginLeft: 12,
  },
  approvalTitle: {
    fontSize: 16,
    color: '#000',
  },
  memberListHeader: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  memberCount: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  memberListDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  linkText: {
    color: '#0068FF',
  },
  memberItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  memberLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
  addFriendButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#0068FF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    height: '70%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalRole: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0068FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  memberActions: {
    width: '100%',
  },
  memberAction: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  dangerAction: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  statItem: {
    marginRight: 24,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0068FF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  approvalButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  approveButton: {
    backgroundColor: '#0068FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  approveText: {
    color: '#fff',
    fontSize: 12,
  },
  rejectButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#666',
  },
  rejectText: {
    color: '#666',
    fontSize: 12,
  },
});
