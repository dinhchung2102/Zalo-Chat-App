import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '@components/screens/Chat/ChatHeader';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_UNIT } from '@styles/constants/screen';
import { ICON_MEDIUM_PLUS } from '@styles/constants/iconSize';
import { Colors } from '@styles/Colors';
import { textMediumSize } from '@styles/constants/fontSize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { sendFile, sendMessage } from '@api/chat/messages';
import { getShortNameRegister } from '@utils/getShortName';
import ImagePickerModal from '@components/shared/ImagePickerModal';
import { messagesByConversationState, selectedConversationState } from '@state/ChatState';
import FileViewer from 'react-native-file-viewer';
import { downloadFile } from '@utils/downloadFile';
import FileIcon from '@components/others/FileIcon';
import HandleModal from '@components/screens/Chat/HandleModal';
import { shortenFilename } from '../../utils/shortenFileName';
import { getFileType } from '../../utils/getFileType';
import { formatFileSize } from '../../utils/formatFileSize';

export default function PersonChat() {
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  const [messagesData, setMessagesData] = useRecoilState(messagesByConversationState);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationState);

  const [messages, setMessages] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHandleVisible, setModalHandleVisible] = useState(false);
  const [isMe, setIsMe] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const [selectedContentMessage, setSelectedContentMessage] = useState('');

  const conversationId = selectedConversation._id;

  const handleSendFile = async (selectedFile) => {
    const senderId = loginResult.user._id;
    const token = loginResult.token;
    console.log(
      `[DEBUG]: {conversationId: ${conversationId}, senderId: ${senderId}, token: ${token}, file: ${selectedFile}}`
    );
    const response = await sendFile(conversationId, selectedFile, senderId, token);
    // setMessageList((prev) => {
    //   const exists = prev.some((msg) => msg._id === response._id);
    //   if (!exists) {
    //     return [...prev, response];
    //   }
    //   return prev;
    // });

    console.log('[DEBUG]: Kết quả gửi file:', response);
  };

  const handleImageSelected = async (image) => {
    console.log('Ảnh đã chọn:', image.uri);
    handleSendFile(image);
  };

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messagesData]);

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage(conversationId, messages, loginResult.token);

      console.log('Tin nhắn gửi thành công: ', response);

      setMessages('');

      setMessagesData((prev) => {
        const exists = prev.data.some((msg) => msg._id === response._id);
        if (!exists) {
          return {
            ...prev,
            data: [...prev.data, response],
          };
        }
        return prev;
      });
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn: ', error);
    }
  };

  const openFile = async (filePath) => {
    try {
      await FileViewer.open(filePath);
    } catch (error) {
      console.log('Lỗi mở file:', error);
    }
  };

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        linearPrimary={true}
        iconColor={'white'}
        userInfo={selectedConversation}
        onPress={() => {
          navigation.goBack();
          //setSelectedConversation(null);
        }}
      />
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: BASE_UNIT * 0.2 }}>
        {messagesData.data.map((item, index, array) => {
          const isMe = item.senderId._id === loginResult.user._id;
          const isFirstMessageFromSender =
            index === 0 || item.senderId._id !== array[index - 1].senderId._id;

          if (isMe) {
            return (
              <TouchableOpacity
                key={item._id}
                style={{
                  flexDirection: 'row-reverse',
                  padding: BASE_UNIT * 0.01,
                }}
                onLongPress={() => {
                  setIsMe(true);
                  setModalHandleVisible(true);
                  setSelectedMessageId(item._id);
                  setSelectedContentMessage(item.content);
                }}
              >
                {item.messageType === 'image' ? (
                  <TouchableOpacity>
                    <Image
                      source={{ uri: item.fileInfo.fileUrl }}
                      resizeMode="contain"
                      style={{
                        width: BASE_UNIT * 0.5,
                        height: undefined,
                        aspectRatio: 1,
                        borderRadius: BASE_UNIT * 0.03,
                      }}
                    />
                  </TouchableOpacity>
                ) : item.messageType === 'file' ? (
                  <View
                    style={{
                      backgroundColor: '#d4f1ff',
                      padding: BASE_UNIT * 0.02,
                      borderRadius: BASE_UNIT * 0.02,
                      maxWidth: BASE_UNIT * 0.7,
                      marginLeft: isFirstMessageFromSender ? BASE_UNIT * 0.12 : 0,
                      minHeight: BASE_UNIT * 0.12,
                      borderWidth: 1,
                      borderColor: '#d2e7f2',
                    }}
                  >
                    <Text style={{ fontSize: textMediumSize }}>{'file nè'}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#d4f1ff',
                      padding: BASE_UNIT * 0.02,
                      borderRadius: BASE_UNIT * 0.02,
                      maxWidth: BASE_UNIT * 0.7,
                      marginLeft: isFirstMessageFromSender ? BASE_UNIT * 0.12 : 0,
                      minHeight: BASE_UNIT * 0.12,
                      borderWidth: 1,
                      borderColor: '#d2e7f2',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: textMediumSize,
                        fontStyle: item.status === 'recalled' ? 'italic' : 'normal',
                        color: item.status === 'recalled' ? 'grey' : null,
                      }}
                    >
                      {item.status === 'recalled' ? 'Tin nhắn đã được thu hồi' : item.content}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          } else {
            return (
              <View key={item._id} style={{ flexDirection: 'row', padding: BASE_UNIT * 0.01 }}>
                {isFirstMessageFromSender &&
                  (item.senderId.profilePic ? (
                    <Image
                      source={{ uri: item.senderId.profilePic }}
                      height={BASE_UNIT * 0.1}
                      width={BASE_UNIT * 0.1}
                      style={{
                        borderRadius: BASE_UNIT * 0.05,
                        marginRight: BASE_UNIT * 0.02,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: BASE_UNIT * 0.1,
                        width: BASE_UNIT * 0.1,
                        backgroundColor: Colors.primary,
                        borderRadius: BASE_UNIT * 0.05,
                        marginRight: BASE_UNIT * 0.02,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: 'white' }}>
                        {getShortNameRegister(item.senderId.fullName)}
                      </Text>
                    </View>
                  ))}

                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    borderRadius: BASE_UNIT * 0.02,
                    maxWidth: BASE_UNIT * 0.7,
                    marginLeft: isFirstMessageFromSender ? 0 : BASE_UNIT * 0.12,
                    minHeight: BASE_UNIT * 0.1,
                  }}
                  onLongPress={() => {
                    setIsMe(false);
                    setModalHandleVisible(true);
                    setSelectedMessageId(item._id);
                    setSelectedContentMessage(item.content);
                  }}
                >
                  {item.messageType === 'image' ? (
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item.fileInfo.fileUrl }}
                        resizeMode="contain"
                        style={{
                          width: BASE_UNIT * 0.5,
                          height: undefined,
                          aspectRatio: 1,
                          borderRadius: BASE_UNIT * 0.03,
                        }}
                      />
                    </TouchableOpacity>
                  ) : item.messageType === 'file' ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        padding: BASE_UNIT * 0.02,
                        borderRadius: BASE_UNIT * 0.02,
                        maxWidth: BASE_UNIT * 0.9,
                        minHeight: BASE_UNIT * 0.12,
                        borderWidth: 1,
                        borderColor: '#d2e7f2',
                        flexDirection: 'row',
                      }}
                      onPress={async () => {
                        const localFilePath = await downloadFile(item.fileInfo);
                        if (localFilePath) {
                          openFile(localFilePath);
                        }
                      }}
                    >
                      <FileIcon fileType={getFileType(item.fileInfo.fileName)} />
                      <View style={{ paddingBottom: 20 }}>
                        <Text
                          style={{
                            fontSize: textMediumSize,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}
                        >
                          {shortenFilename(item.fileInfo.fileName, 24)}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ color: 'grey', fontSize: 12 }}>
                            {getFileType(item.fileInfo.fileName) + ' - '}
                          </Text>
                          <Text style={{ color: 'grey', fontSize: 12 }}>
                            {formatFileSize(item.fileInfo.fileSize)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : item.messageType === 'folder' ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'rgba(255, 240, 26, 0.7)',
                        padding: BASE_UNIT * 0.02,
                        borderRadius: BASE_UNIT * 0.02,
                        maxWidth: BASE_UNIT * 0.7,
                        minHeight: BASE_UNIT * 0.12,
                        borderWidth: 1,
                        borderColor: '#d2e7f2',
                      }}
                    >
                      <Text style={{ fontSize: textMediumSize }}>{item.folderInfo.folderName}</Text>
                      <Text style={{ fontStyle: 'italic' }}>Thư mục</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: BASE_UNIT * 0.02,
                        borderRadius: BASE_UNIT * 0.02,
                        maxWidth: BASE_UNIT * 0.7,
                        minHeight: BASE_UNIT * 0.12,
                        borderWidth: 1,
                        borderColor: '#d2e7f2',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: textMediumSize,
                          fontStyle: item.status === 'recalled' ? 'italic' : 'normal',
                          color: item.status === 'recalled' ? 'grey' : null,
                        }}
                      >
                        {item.status === 'recalled' ? 'Tin nhắn đã được thu hồi' : item.content}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </ScrollView>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: BASE_UNIT * 0.02,
          minHeight: BASE_UNIT * 0.13,
          backgroundColor: 'white',
          width: BASE_UNIT,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGrey,
        }}
      >
        <TouchableOpacity>
          <Ionicons name="happy-outline" size={ICON_MEDIUM_PLUS} color={'grey'} />
        </TouchableOpacity>

        <TextInput
          placeholder="Tin nhắn"
          multiline={true}
          value={messages}
          onChangeText={setMessages}
          style={{
            fontSize: textMediumSize,
            marginLeft: BASE_UNIT * 0.02,
            //backgroundColor: "red",
            flex: 1,
            paddingHorizontal: BASE_UNIT * 0.03,
            minHeight: BASE_UNIT * 0.13,
            maxHeight: BASE_UNIT * 0.4,
          }}
        />
        {messages.trim().length != 0 ? (
          <>
            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send-sharp" size={ICON_MEDIUM_PLUS} color={Colors.primary} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal-outline" size={ICON_MEDIUM_PLUS} color={'grey'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: BASE_UNIT * 0.05 }}>
              <Ionicons name="mic-outline" size={ICON_MEDIUM_PLUS} color={'grey'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: BASE_UNIT * 0.05 }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="image-outline" size={ICON_MEDIUM_PLUS} color={Colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </Pressable>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImageSelected={handleImageSelected}
      />
      <HandleModal
        visible={modalHandleVisible}
        setVisible={setModalHandleVisible}
        onPressOverlay={() => setModalHandleVisible(false)}
        isMe={isMe}
        messageId={selectedMessageId}
        contentMessage={selectedContentMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e8f3',
  },
});
