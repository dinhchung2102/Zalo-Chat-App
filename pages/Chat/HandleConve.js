import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getListFriend } from '@api/friend/getListFriend';
import { useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { forwardMessage } from '@api/chat/messages';
import { useRoute } from '@react-navigation/native';
import { conversationState } from '@state/ChatState';

// Header Component
const GroupHeader = ({ selectedUsers, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Chuyển tiếp</Text>
      <Text style={styles.selectedCount}>Đã chọn: {selectedUsers.length}</Text>
    </View>
  );
};

// Search Component
const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#666" />
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm tên hoặc số điện thoại"
        placeholderTextColor="#666"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const HandleConve = ({ navigation }) => {
  const route = useRoute();
  const { messageId } = route.params;

  const loginResult = useRecoilValue(loginResultState);
  const listConversation = useRecoilValue(conversationState);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedConversations, setSelectedConversations] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [participantIds, setParticipantIds] = useState([]);

  console.log('list conversations', listConversation);

  const handleFowardMessage = async () => {
    console.log('Start handle forward');

    const response = await forwardMessage(
      messageId,
      loginResult.user._id,
      selectedConversations,
      loginResult.token
    );

    //Tạm thời navigation về Homemessage để load lại conversation// chưa xử lý goback()
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeMessage' }],
    });
  };
  //=============================================================

  const toggleConversationSelection = (conve) => {
    if (selectedConversations.find((u) => u._id === conve._id)) {
      setSelectedConversations(selectedConversations.filter((u) => u._id !== conve._id));
      setParticipantIds(participantIds.filter((id) => id !== conve._id));
    } else {
      setSelectedConversations([...selectedConversations, conve]);
      setParticipantIds([...participantIds, conve._id]);
    }
  };
  const removeSelectedConversation = (conveId) => {
    setSelectedConversations(selectedConversations.filter((conve) => conve._id !== conveId));
    setParticipantIds(participantIds.filter((id) => id !== conveId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <GroupHeader selectedUsers={selectedUsers} navigation={navigation} />

        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}>GẦN ĐÂY</Text>
          <Text style={styles.inactiveTab}>DANH BẠ</Text>
        </View>

        <ScrollView style={styles.userList}>
          {listConversation.map((conve) => (
            <TouchableOpacity
              key={conve._id}
              style={styles.userItem}
              onPress={() => toggleConversationSelection(conve)}
            >
              <Image
                source={{
                  uri: conve.profilePic || 'https://i.pravatar.cc/150?img=1',
                }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{conve.groupName || conve.name}</Text>
                <Text style={styles.userTime}>{conve.phoneNumber || 'Group'}</Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selectedConversations.find((u) => u._id === conve._id) && styles.checkboxSelected,
                ]}
              >
                {selectedConversations.find((u) => u._id === conve._id) && (
                  <Icon name="check" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedConversations.length > 0 && (
        <View style={styles.bottomSelectedUsers}>
          <ScrollView horizontal style={styles.selectedUsersContainer}>
            {selectedConversations.map((conve) => (
              <View key={conve._id} style={styles.selectedUserItem}>
                <Image source={{ uri: conve.profilePic }} style={styles.selectedUserAvatar} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSelectedConversation(conve._id)}
                >
                  <Icon name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {selectedConversations.length > 0 && (
            <TouchableOpacity style={styles.nextButton} onPress={handleFowardMessage}>
              <Icon name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedCount: {
    color: '#666',
  },
  groupNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupNameInput: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  selectedUsersContainer: {
    padding: 16,
    flex: 1,
  },
  selectedUserItem: {
    marginRight: 12,
  },
  selectedUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#666',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activeTab: {
    marginRight: 16,
    color: '#0084ff',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#666',
  },
  userList: {
    flex: 1,
    marginBottom: 80, // Add padding at bottom for selected users
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userTime: {
    color: '#666',
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#0084ff',
    borderColor: '#0084ff',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mainContent: {
    flex: 1,
  },
  bottomSelectedUsers: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0084ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderRadius: 25,
  },
});

export default HandleConve;
