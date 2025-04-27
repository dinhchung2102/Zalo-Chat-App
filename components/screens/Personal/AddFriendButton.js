import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { sendRequest } from '@api/friend/sendRequest';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginResultState } from '@state/PrimaryState';
import { BASE_UNIT } from '@styles/constants/screen';
import { Colors } from '@styles/Colors';
import { acceptFriend } from '@api/friend/acceptFriend';
import { getListConversation } from '@api/chat/conversation';
import { conversationState } from '@state/ChatState';
import SendMessageButton from '@components/screens/Chat/SendMessageButton';

export default function AddFriendButton({ targetUser, onPress }) {
  const loginResult = useRecoilValue(loginResultState);
  const [sendRequestStatus, setSendRequestStatus] = useState(false);
  const [acceptRequestStatus, setAcceptRequestStatus] = useState(false);
  const [relationshipLabel, setRelationshipLabel] = useState('Kết bạn');
  const [, setConversation] = useRecoilState(conversationState);

  const isPending = targetUser.status === 'pending';
  const isFriend = targetUser.isFriend === true;

  useEffect(() => {
    if (isPending) {
      if (targetUser.actionUser === loginResult.user._id) {
        setRelationshipLabel('Đã gửi');
      } else {
        setRelationshipLabel('Đồng ý');
      }
    } else if (isFriend) {
      setRelationshipLabel('Bạn bè');
    } else {
      setRelationshipLabel('Kết bạn');
    }
  }, [targetUser, loginResult.user._id]);

  const handleSendRequest = async () => {
    try {
      const res = await sendRequest(targetUser.user.phoneNumber, loginResult.token);
      setSendRequestStatus(true);
      setRelationshipLabel('Đã gửi');
      console.log('✅ Gửi lời mời thành công:', res);
    } catch (err) {
      console.log('❌ Không thể gửi lời mời:', err.message);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriend(targetUser.friendShipId, loginResult.token);
      setAcceptRequestStatus(true);
      setRelationshipLabel('Bạn bè');
      const resConversation = await getListConversation(loginResult.token);
      setConversation(resConversation.data);
      console.log('Chấp nhận lời mời thành công', response);
    } catch (error) {
      console.log('Không thể chấp nhận lời mời', error.message);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <TouchableOpacity
        style={{
          width: BASE_UNIT * 0.2,
          backgroundColor: Colors.primary,
          height: BASE_UNIT * 0.08,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: BASE_UNIT * 0.05,
        }}
        onPress={isPending ? handleAcceptRequest : handleSendRequest ?? onPress}
        disabled={relationshipLabel === 'Bạn bè' || relationshipLabel === 'Đã gửi'}
      >
        <Text style={{ color: 'white' }}>{relationshipLabel}</Text>
      </TouchableOpacity>

      <SendMessageButton disabled={acceptRequestStatus ? false : isPending ? true : true} />
    </View>
  );
}
