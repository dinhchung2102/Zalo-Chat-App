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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_UNIT } from '@styles/constants/screen';
import { ICON_MEDIUM_PLUS } from '@styles/constants/iconSize';
import { Colors } from '@styles/Colors';
import { textMediumSize } from '@styles/constants/fontSize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { getShortNameRegister } from '@utils/getShortName';
import { useEffect, useRef, useState } from 'react';
import SimpleHeader from '../../components/shared/SimpleHeader';
import { sendMessageAI } from '../../api/chat/messages';
import uuid from 'react-native-uuid';
import { aiChatState } from '../../state/ChatState';

export default function AIChat() {
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  const [messagesData, setMessagesData] = useRecoilState(aiChatState);
  const [messages, setMessages] = useState('');
  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (!messages.trim()) return;

    const userMessage = {
      _id: uuid.v4(),
      senderId: {
        _id: loginResult.user._id,
        fullName: loginResult.user.fullName,
        profilePic: loginResult.user.profilePic || null,
      },
      content: messages,
      status: 'sent',
    };

    // Thêm tin nhắn người dùng vào mảng
    setMessagesData((prev) => [...prev, userMessage]);

    setMessages('');

    try {
      const aiResponse = await sendMessageAI(messages, loginResult.token);

      const aiMessage = {
        _id: uuid.v4(),
        senderId: {
          _id: 'aiId',
          fullName: 'AI nhóm 7',
          profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        content: aiResponse.data,
        status: 'sent',
      };

      setMessagesData((prev) => [...prev, aiMessage]);

      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Lỗi gửi tin nhắn:', error);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messagesData]);
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        linearPrimary={true}
        text={'Nhóm 7 INIMEG'}
        iconColor={'white'}
        textColor={'white'}
        onPress={() => navigation.goBack()}
      />

      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: BASE_UNIT * 0.2 }}>
        {messagesData.map((item, index, array) => {
          const isMe = item.senderId?._id === loginResult.user._id;

          const isFirstMessageFromSender =
            index === 0 || item.senderId._id !== array[index - 1].senderId._id;

          if (isMe) {
            return (
              <View
                key={item._id}
                style={{
                  flexDirection: 'row-reverse',
                  padding: BASE_UNIT * 0.01,
                }}
              >
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
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
                    backgroundColor: 'white',
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

            <TouchableOpacity style={{ marginLeft: BASE_UNIT * 0.05 }}>
              <Ionicons name="image-outline" size={ICON_MEDIUM_PLUS} color={Colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e8f3',
  },
});
