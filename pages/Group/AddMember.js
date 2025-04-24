import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getListFriend } from "../../api/friend/getListFriend";
import { useRecoilState, useRecoilValue } from "recoil";
import frr, { loginResultState } from "../../state/PrimaryState";
import {
  addNewMembers,
  getConversationById,
} from "../../api/chat/conversation";
import { selectedConversationState } from "../../state/ChatState";

// Header Component
const AddToGroupHeader = ({ selectedUsers, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Thêm mới</Text>
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

const AddMember = ({ navigation }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [participantIds, setParticipantIds] = useState([]);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationState
  );

  //================================================================
  const [users, setUsers] = useState([]);
  const loginResult = useRecoilValue(loginResultState);

  useEffect(() => {
    const fetchFriends = async () => {
      const result = await getListFriend(loginResult.token);
      if (Array.isArray(result.data)) {
        setUsers(result.data);
        console.log("my friends:", result.data);
      } else {
        setError(result);
      }
    };

    fetchFriends();
  }, []);

  const groupMemberIds = selectedConversation.participants.map(
    (member) => member._id
  );
  // Lọc danh sách bạn bè chưa có trong nhóm
  const friendsNotInGroup = users.filter(
    (friend) => !groupMemberIds.includes(friend._id)
  );

  //=============================================================

  const toggleUserSelection = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
      setParticipantIds(participantIds.filter((id) => id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setParticipantIds([...participantIds, user._id]);
    }
  };

  const removeSelectedUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
    setParticipantIds(participantIds.filter((id) => id !== userId));
  };

  const handleAddNewMembers = async () => {
    try {
      const result = await addNewMembers(
        loginResult.token,
        selectedConversation._id,
        participantIds
      );
      const resultGetNewConversation = await getConversationById(
        loginResult.token,
        selectedConversation._id
      );
      console.log("DEBUG: resultgetnewconversation", resultGetNewConversation);

      setSelectedConversation(resultGetNewConversation);

      navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <AddToGroupHeader
          selectedUsers={selectedUsers}
          navigation={navigation}
        />
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}>GẦN ĐÂY</Text>
          <Text style={styles.inactiveTab}>DANH BẠ</Text>
        </View>

        <ScrollView style={styles.userList}>
          {friendsNotInGroup.map((user) => (
            <TouchableOpacity
              key={user._id}
              style={styles.userItem}
              onPress={() => toggleUserSelection(user)}
            >
              <Image
                source={{
                  uri: user.profilePic || "https://i.pravatar.cc/150?img=1",
                }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.fullName}</Text>
                <Text style={styles.userTime}>{user.phoneNumber}</Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selectedUsers.find((u) => u._id === user._id) &&
                    styles.checkboxSelected,
                ]}
              >
                {selectedUsers.find((u) => u._id === user._id) && (
                  <Icon name="check" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedUsers.length > 0 && (
        <View style={styles.bottomSelectedUsers}>
          <ScrollView horizontal style={styles.selectedUsersContainer}>
            {selectedUsers.map((user) => (
              <View key={user._id} style={styles.selectedUserItem}>
                <Image
                  source={{ uri: user.profilePic }}
                  style={styles.selectedUserAvatar}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSelectedUser(user._id)}
                >
                  <Icon name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {selectedUsers.length > 0 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleAddNewMembers}
            >
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedCount: {
    color: "#666",
  },
  groupNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  groupNameInput: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    backgroundColor: "#f5f5f5",
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
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#666",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeTab: {
    marginRight: 16,
    color: "#0084ff",
    fontWeight: "bold",
  },
  inactiveTab: {
    color: "#666",
  },
  userList: {
    flex: 1,
    marginBottom: 80, // Add padding at bottom for selected users
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    fontWeight: "500",
  },
  userTime: {
    color: "#666",
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#0084ff",
    borderColor: "#0084ff",
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  nextButton: {
    width: 50,
    height: 50,
    backgroundColor: "#0084ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderRadius: 25,
  },
});

export default AddMember;
