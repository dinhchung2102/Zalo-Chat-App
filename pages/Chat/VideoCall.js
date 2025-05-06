import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AGORA_APP_ID } from '@env';

const VideoCall = ({ route }) => {
  const { channelName } = route.params;
  const [videoCall, setVideoCall] = useState(true);
  const navigation = useNavigation();

  const props = {
    connectionData: {
      appId: AGORA_APP_ID,
      channel: channelName,
    },
    rtcCallbacks: {
      EndCall: () => setVideoCall(false),
    },
  };

  return videoCall ? (
    <AgoraUIKit {...props} />
  ) : (
    <View>
      <Text>The call has ended</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeMessage');
        }}
      >
        <Text>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoCall;
