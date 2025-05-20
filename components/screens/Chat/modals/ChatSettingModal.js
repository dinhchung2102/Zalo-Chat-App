import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatSettingModal = ({ visible, setVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="person-add-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Thêm bạn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                navigation.navigate('CreateGroup');
              }}
            >
              <Ionicons name="people-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Tạo nhóm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="cloud-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Cloud của tôi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="calendar-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Lịch Zalo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="videocam-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Tạo cuộc gọi nhóm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="laptop-outline" size={24} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Thiết bị đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    // marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 200,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalIcon: {
    marginRight: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default ChatSettingModal;
