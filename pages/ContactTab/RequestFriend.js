import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/shared/SimpleHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Sent from './Sent';
import Received from './Received';
import { useRecoilValue } from 'recoil';
import { requestState } from '@state/FriendState';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
export default function RequestFriend() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        linearPrimary={true}
        iconColor={'white'}
        text={'Lời mời kết bạn'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#3b82f6' },
        }}
      >
        <Tab.Screen name="Đã nhận" component={Received} />
        <Tab.Screen name="Đã gửi" component={Sent} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
