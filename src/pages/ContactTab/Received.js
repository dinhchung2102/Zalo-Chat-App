import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { requestState } from '@state/FriendState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_UNIT } from '@styles/constants/screen';
import { getShortNameRegister } from '@utils/getShortName';
import { getTimeAlong } from '@utils/getTimeAlong';
import { textMediumSize } from '@styles/constants/fontSize';
import { Colors } from '@styles/Colors';
import { acceptFriend } from '@api/friend/acceptFriend';
import { loginResultState } from '@state/PrimaryState';
import { useEffect } from 'react';
import { getRequests } from '@api/friend/getRequests';

export default function Received() {
  const [requests, setRequests] = useRecoilState(requestState);
  const loginResult = useRecoilValue(loginResultState);

  console.log(requests);

  useEffect(() => {
    const fetchDataRequest = async () => {
      const reqs = await getRequests(loginResult.token, loginResult.user._id);
      setRequests(reqs);
    };

    fetchDataRequest();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(requests?.data?.requests) &&
        requests.data.requests.map((item) => (
          <TouchableOpacity
            key={item.actionUser._id}
            style={{
              //backgroundColor: "red",
              flexDirection: 'row',
              alignItems: 'center',
              width: BASE_UNIT,
              height: BASE_UNIT * 0.2,
              paddingHorizontal: BASE_UNIT * 0.02,
            }}
          >
            {item.actionUser && item.actionUser.profilePic ? (
              <Image
                source={{
                  uri: item.actionUser.profilePic || '',
                }}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'blue',
                  borderRadius: BASE_UNIT * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: BASE_UNIT * 0.03,
                }}
              />
            ) : (
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'blue',
                  borderRadius: BASE_UNIT * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: BASE_UNIT * 0.03,
                }}
              >
                <Text
                  style={{
                    fontSize: BASE_UNIT * 0.05,
                    color: 'white',
                  }}
                >
                  {getShortNameRegister(
                    item.actionUser?.fullName || item.senderInfo.fullName || 'Unknown'
                  )}
                </Text>
              </View>
            )}
            <View>
              <Text style={{ fontSize: textMediumSize, fontWeight: 'bold' }}>
                {item.actionUser.fullName || item.senderInfo.fullName || 'Unknow'}
              </Text>
              <Text style={{ color: Colors.grey }}>{getTimeAlong(item.updatedAt)}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-evenly',
                marginLeft: BASE_UNIT * 0.05,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.lightGrey,
                  width: BASE_UNIT * 0.2,
                  height: BASE_UNIT * 0.08,
                  borderRadius: BASE_UNIT * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  console.log('token', loginResult?.token);
                  const res = await acceptFriend(item._id, loginResult?.token);
                  setRequests((prev) => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      totalRequests: Math.max((prev.data?.totalRequests || 1) - 1, 0),
                      requests: prev.data?.requests.filter((req) => req._id !== item._id),
                    },
                  }));
                }}
              >
                <Text style={{ fontWeight: 'bold', color: Colors.primary }}>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.lightGrey,
                  width: BASE_UNIT * 0.2,
                  height: BASE_UNIT * 0.08,
                  borderRadius: BASE_UNIT * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  setRequests((prev) => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      totalRequests: Math.max((prev.data?.totalRequests || 1) - 1, 0),
                      requests: prev.data?.requests.filter((req) => req._id !== item._id),
                    },
                  }));
                }}
              >
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
