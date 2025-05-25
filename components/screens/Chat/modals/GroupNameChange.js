import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRecoilValue } from 'recoil';
import { selectedConversationState } from '@state/ChatState';

export default function GroupNameChange({ visible, setVisible, groupName, setGroupName }) {
  const selectedConversation = useRecoilValue(selectedConversationState);
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 400 }}>Đặt tên nhóm</Text>
          <TextInput
            placeholder={selectedConversation.groupName}
            style={{
              marginTop: 10,
              paddingBottom: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
            }}
            value={groupName}
            onChangeText={setGroupName}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={setVisible(false)}>
              <Text style={{ fontSize: 18, color: 'grey' }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 18, color: '#006AF5' }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    //alignItems: 'center',
  },
});
