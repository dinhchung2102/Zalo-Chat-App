import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { BASE_UNIT } from '@styles/constants/screen';
import { textMediumPlus, textMediumSize } from '@styles/constants/fontSize';
import { Colors } from '@styles/Colors';
import { getListConversation, unseenMessages } from '@api/chat/conversation';
import { getTimeAlong } from '@utils/getTimeAlong';
import { useTextLanguage } from '@hooks/useTextLanguage';
import { getShortNameRegister } from '@utils/getShortName';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  conversationState,
  messagesByConversationState,
  selectedConversationState,
} from '@state/ChatState';
import { getMessages } from '@api/chat/messages';
import { loginResultState } from '@state/PrimaryState';
import { totalUnseenCountState } from '@state/ChatState';
import { useLoading } from '@hooks/useLoading';
import LoadingOverlay from '@components/shared/LoadingOverlay';

export default function MessageTitleRender({ isFocused }) {
  const locale = useTextLanguage({ vietnamese: 'vi', english: 'en' });
  const navigation = useNavigation();
  const loginResult = useRecoilValue(loginResultState);
  const { isLoading, withLoading } = useLoading();

  const [dataConversations, setDataConversations] = useRecoilState(conversationState);
  const setMessages = useSetRecoilState(messagesByConversationState);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationState);
  const setTotalUnseenCount = useSetRecoilState(totalUnseenCountState);

  useEffect(() => {
    //Mỗi lần focus thì load lại
    if (!isFocused) return;

    const fetchConversations = async () => {
      const conversations = await getListConversation(loginResult.token);
      setDataConversations(conversations.data);

      const totalUnseen = conversations.data.reduce(
        (sum, convo) => sum + (convo.unseenCount || 0),
        0
      );
      setTotalUnseenCount(totalUnseen);
    };

    withLoading(fetchConversations());
  }, [loginResult, isFocused]);

  useEffect(() => {
    const totalUnseen = dataConversations.reduce((sum, convo) => sum + (convo.unseenCount || 0), 0);
    setTotalUnseenCount(totalUnseen);
  }, [dataConversations]);

  return (
    <View style={styles.container}>
      {dataConversations ? (
        dataConversations.map((item) => {
          if (!item || !item._id) return null;
          return (
            <TouchableOpacity
              key={item._id}
              style={{
                paddingBottom: BASE_UNIT * 0.05,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={async () => {
                setSelectedConversation(item);
                const messages = await getMessages(loginResult.token, item._id);

                //cập nhật conve được chọn và tin nhắn
                setMessages(messages);
                await unseenMessages(loginResult.token, item._id, loginResult.user._id);

                //Cập nhật đã xem trên giao diện
                const updatedConversations = dataConversations.map((c) =>
                  c._id === item._id ? { ...c, unseenCount: 0 } : c
                );
                setDataConversations(updatedConversations);

                navigation.navigate('PersonChat');
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.primary,
                  height: BASE_UNIT * 0.15,
                  width: BASE_UNIT * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: BASE_UNIT * 0.15,
                }}
              >
                {item.avatar ? (
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: BASE_UNIT * 0.15,
                      height: BASE_UNIT * 0.15,
                      borderRadius: BASE_UNIT * 0.15,
                    }}
                  />
                ) : item.participants.length === 1 ? (
                  <Image
                    source={{
                      uri: 'https://imgur.com/1L0lWDZ.png',
                    }}
                    style={{
                      width: BASE_UNIT * 0.12,
                      height: BASE_UNIT * 0.12,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: BASE_UNIT * 0.15,
                      height: BASE_UNIT * 0.15,
                      borderRadius: BASE_UNIT * 0.15,
                      backgroundColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: textMediumPlus, color: 'white' }}>
                      {getShortNameRegister(item?.recipient?.fullName || item?.groupName || 'Nhóm')}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  paddingLeft: BASE_UNIT * 0.03,
                  paddingVertical: BASE_UNIT * 0.01,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: textMediumSize * 1.1,
                      marginBottom: BASE_UNIT * 0.01,
                      fontWeight: item.unseenCount > 0 ? 'bold' : 'normal',
                    }}
                  >
                    {item.groupName || item.name}
                  </Text>
                  <Text style={{ color: Colors.grey }}>
                    {getTimeAlong(item.latestActivityTime, locale)}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: item.unseenCount > 0 ? 'bold' : 'normal',
                    fontSize: textMediumSize * 0.9,
                    color: item.unseenCount > 0 ? 'black' : Colors.grey,
                    width: '80%',
                  }}
                  numberOfLines={1}
                >
                  {item.lastMessage
                    ? item.lastMessage.sender._id === loginResult.user._id
                      ? 'Bạn: ' + item.lastMessage.content
                      : item.isGroup === false
                      ? item.lastMessage.content
                      : item.lastMessage.sender.fullName + ': ' + item.lastMessage.content
                    : item.groupName
                    ? 'Chia sẻ tệp'
                    : 'Các bạn đã là bạn bè 😊'}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: BASE_UNIT * 0.03,
                    height: BASE_UNIT * 0.05,
                    width: BASE_UNIT * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: BASE_UNIT * 0.05,
                    backgroundColor: item.unseenCount > 0 ? 'red' : 'transparent',
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    {item.unseenCount > 0 ? item.unseenCount : ''}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <LoadingOverlay visible={isLoading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
