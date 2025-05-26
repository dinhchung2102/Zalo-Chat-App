import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ICON_LARGE } from '@styles/constants/iconSize';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_UNIT } from '@styles/constants/screen';
import { Colors } from '@styles/Colors';
import { textMediumSize } from '@styles/constants/fontSize';
import { useTextLanguage } from '@hooks/useTextLanguage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { selectedConversationState } from '@state/ChatState';
import { loginResultState } from '@state/PrimaryState';
import uuid from 'react-native-uuid';
import { sendMessageVideoCall } from '@api/chat/messages';

export default function ChatHeader({
  textColor = 'white',
  onPress,
  linearPrimary,
  iconColor = 'white',
  backgroundColor = Colors.primary,
}) {
  const navigation = useNavigation();
  const selectedConversation = useRecoilValue(selectedConversationState);
  const loginResult = useRecoilValue(loginResultState);

  const handleRequestVideoCall = async (messageSend) => {
    try {
      const res = await sendMessageVideoCall(
        selectedConversation._id,
        messageSend,
        loginResult.token
      );
      console.log('Request video call: ', res);
    } catch (error) {
      console.error('Lỗi gửi yêu cầu gọi video:', error);
    }
  };

  if (linearPrimary && selectedConversation) {
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.primary, '#00BCFA']}
      >
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="arrow-back-outline" size={ICON_LARGE * 0.65} color={iconColor} />
        </TouchableOpacity>
        <View
          style={{
            fontSize: textMediumSize,
            paddingLeft: BASE_UNIT * 0.05,
            height: '100%',
            flex: 1,
            color: textColor,
            //backgroundColor: "blue",
            justifyContent: 'center',
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: textColor,
              fontWeight: 'bold',
              fontSize: textMediumSize,
              maxWidth: '80%', // hoặc một giá trị phù hợp
            }}
          >
            {selectedConversation?.groupName
              ? selectedConversation.groupName
              : selectedConversation?.participants[0]._id != loginResult.user._id
              ? selectedConversation.participants[0].fullName
              : selectedConversation.participants[1].fullName || 'Tên người dùng test'}
          </Text>
        </View>

        <TouchableOpacity style={{ marginRight: BASE_UNIT * 0.06 }}>
          <Ionicons name="call-outline" size={ICON_LARGE * 0.7} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // const channelName = 'demo';
            // //Thiếu gửi thông báo đến nhóm
            const messageSend = `${uuid.v4()}`; // tạo mới mỗi lần nhấn
            await handleRequestVideoCall(messageSend); // gửi đi
            navigation.navigate('VideoCall', { channelName: messageSend }); // truyền đi
          }}
          style={{ marginRight: BASE_UNIT * 0.08 }}
        >
          <Ionicons name="videocam-outline" size={ICON_LARGE * 0.8} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (selectedConversation.isGroup == true) {
              navigation.navigate('GroupDetailScreen');
            } else {
              navigation.navigate('PersonalDetailScreen');
            }

            // navigation.navigate('MemberGroup');
          }}
        >
          <Ionicons name="list-outline" size={ICON_LARGE * 0.8} color={iconColor} />
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: backgroundColor,
          flexDirection: 'row',
          alignItems: 'center',
          height: BASE_UNIT * 0.13,
          paddingHorizontal: BASE_UNIT * 0.02,
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons name="search" size={ICON_LARGE * 0.8} color={iconColor} />
        </TouchableOpacity>

        <TextInput
          style={{
            fontSize: textMediumSize,
            paddingLeft: BASE_UNIT * 0.05,
            height: BASE_UNIT,
            flex: 1,
            color: textColor,
          }}
          placeholderTextColor={Colors.grey}
          placeholder={useTextLanguage({
            vietnamese: 'Tìm kiếm',
            english: 'Search here',
          })}
        />

        <TouchableOpacity style={{ marginRight: BASE_UNIT * 0.05 }}>
          <MaterialIcons name="qr-code-scanner" size={ICON_LARGE * 0.7} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons name="add" size={ICON_LARGE * 0.95} color={iconColor} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: BASE_UNIT * 0.13,
    paddingHorizontal: BASE_UNIT * 0.02,
  },
});
