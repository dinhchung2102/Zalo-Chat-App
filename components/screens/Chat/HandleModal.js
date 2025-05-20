import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BASE_UNIT } from '@styles/constants/screen';
import { Ionicons } from '@expo/vector-icons';
import { recallMessage } from '@api/chat/messages';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { messagesByConversationState } from '@state/ChatState';
import { deleteMessage } from '@api/chat/messages';
import { forwardMessage } from '@api/chat/messages';
import { useNavigation } from '@react-navigation/native';

export default function HandleModal({
  visible,
  setVisible,
  onPressOverlay,
  isMe,
  messageId,
  targetConversation,
}) {
  const loginResult = useRecoilValue(loginResultState);
  const [messagesData, setMessagesData] = useRecoilState(messagesByConversationState);
  const navigation = useNavigation();

  const handleRecallMessage = async () => {
    const response = await recallMessage(messageId, loginResult.token);
  };

  const handleDeleteMessage = async () => {
    const response = await deleteMessage(messageId, loginResult.token);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onPressOverlay}>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name="arrow-undo-outline"
                color={'purple'}
                size={30}
                onPress={() => {
                  console.log('Trả lời');
                }}
              />
              <Text style={styles.textButton}>Trả lời</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('HandleConve', { messageId });
              }}
            >
              <Ionicons name="arrow-redo-outline" color={'#006AF5'} size={30} />
              <Text style={styles.textButton}>Chuyển tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="cloud-outline" color={'#167BC9'} size={30} />
              <Text style={styles.textButton}>Lưu Cloud</Text>
            </TouchableOpacity>
            {isMe ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleRecallMessage();
                  setVisible(false);
                  setMessagesData((prevMessages) => {
                    if (!prevMessages?.data || !Array.isArray(prevMessages.data)) {
                      return prevMessages; // hoặc trả về một object mặc định nếu cần
                    }

                    const updatedData = prevMessages.data.map((msg) =>
                      msg._id === messageId ? { ...msg, content: '', status: 'recalled' } : msg
                    );

                    return {
                      ...prevMessages,
                      data: updatedData,
                    };
                  });
                }}
              >
                <Ionicons name="reload-outline" color={'red'} size={30} />
                <Text style={styles.textButton}>Thu hồi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button}>
                <Ionicons name="copy-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Sao chép</Text>
              </TouchableOpacity>
            )}
          </View>

          {isMe ? (
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="copy-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Sao chép</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="pencil-sharp" color={'orange'} size={30} />
                <Text style={styles.textButton}>Ghim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="time-outline" color={'darkred'} size={30} />
                <Text style={styles.textButton}>Nhắc hẹn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="chatbubbles-outline" color={'purple'} size={30} />
                <Text style={styles.textButton}>Chọn nhiều</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="pencil-sharp" color={'orange'} size={30} />
                <Text style={styles.textButton}>Ghim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="time-outline" color={'darkred'} size={30} />
                <Text style={styles.textButton}>Nhắc hẹn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="chatbubbles-outline" color={'purple'} size={30} />
                <Text style={styles.textButton}>Chọn nhiều</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="chatbox-ellipses-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Tạo tin nhắn nhanh</Text>
              </TouchableOpacity>
            </View>
          )}
          {isMe ? (
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="chatbox-ellipses-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Tạo tin nhắn nhanh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="document-text-outline" color={'green'} size={30} />
                <Text style={styles.textButton}>Dịch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="volume-medium-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Đọc văn bản</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="alert-circle-outline" color={'purple'} size={30} />
                <Text style={styles.textButton}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="document-text-outline" color={'green'} size={30} />
                <Text style={styles.textButton}>Dịch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="volume-medium-outline" color={'#006AF5'} size={30} />
                <Text style={styles.textButton}>Đọc văn bản</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="alert-circle-outline" color={'purple'} size={30} />
                <Text style={styles.textButton}>Chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleDeleteMessage();
                  setMessagesData((prevMessages) => {
                    if (!prevMessages?.data || !Array.isArray(prevMessages.data)) {
                      return prevMessages;
                    }

                    return {
                      ...prevMessages,
                      data: prevMessages.data.filter((msg) => msg._id !== messageId),
                    };
                  });
                  setVisible(false);
                }}
              >
                <Ionicons name="trash-outline" color={'red'} size={30} />
                <Text style={styles.textButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}

          {isMe ? (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleDeleteMessage();
                  setMessagesData((prevMessages) => {
                    if (!prevMessages?.data || !Array.isArray(prevMessages.data)) {
                      return prevMessages;
                    }

                    return {
                      ...prevMessages,
                      data: prevMessages.data.filter((msg) => msg._id !== messageId),
                    };
                  });
                  setVisible(false);
                }}
              >
                <Ionicons name="trash-outline" color={'red'} size={30} />
                <Text style={styles.textButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '90%',
    padding: BASE_UNIT * 0.07,
    paddingBottom: 0,
    backgroundColor: '#fff',
    borderRadius: BASE_UNIT * 0.03,
    marginBottom: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    //ackgroundColor: 'red',
    width: '25%',
    height: 60,
  },
  textButton: {
    fontSize: 10,
    textAlign: 'center',
  },
});
