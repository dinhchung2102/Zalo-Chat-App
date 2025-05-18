import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Public/Home';
import { RecoilRoot, useRecoilState } from 'recoil';
import Login from './pages/Public/Login';
import SignUp from './pages/SignUp/SignUp';
import SignUpOTP from './pages/SignUp/SignUpOTP';
import FAQ from './pages/Public/FAQ';
import SignUpZaloName from './pages/SignUp/SignUpZaloName';
import SignUpAddProfile from './pages/SignUp/SignUpAddProfile';
import HomeMessage from './pages/Chat/HomeMessage';
import Profile from './pages/User/Profile';
import UpdateAvatar from './pages/SignUp/UpdateAvatar';
import ProfileUser from './pages/User/ProfileUser';
import ProfileSetting from './pages/User/ProfileSetting';
import Contact from './pages/Contact/Contact';
import Explore from './pages/Util/Explore';
import Diary from './pages/Diary/Diary';
import RequestFriend from './pages/ContactTab/RequestFriend';
import PersonChat from './pages/Chat/PersonChat';
import SearchUser from './pages/Public/SearchUser';
import VideoCall from './pages/Chat/VideoCall';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './services/notificationService';
import { useEffect, useRef, useState } from 'react';
import CreateGroup from './pages/Group/CreateGroup';
import MemberGroup from './pages/Group/MemberGroup';
import AddMember from './pages/Group/AddMember';
import ConfirmPhoneNumber from './pages/Util/ForgetPassword/ConfirmPhoneNumber';
import GlobalModalManager from './pages/Util/GlobalModalManager';
import { SocketListener } from './services/socketService';
import ProfileUpdate from './pages/User/ProfileUpdate';
import ProfileUpdate_Handle from './pages/User/ProfileUpdate_Handle';
import Account_Security from './pages/User/Account_Security';
import PasswordUpdate from './pages/User/PasswordUpdate';
import ForgetPwdOTP from './pages/Util/ForgetPassword/ForgetPwdOTP';
import NewPassword from './pages/Util/ForgetPassword/NewPassword';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const Stack = createStackNavigator();
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Gọi hàm tách riêng của bạn
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Lắng nghe thông báo đến
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Thông báo đến:', notification);
    });

    // Lắng nghe khi người dùng tương tác với thông báo
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Người dùng đã nhấn vào thông báo:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <GlobalModalManager />
        <SocketListener />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpOTP" component={SignUpOTP} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="SignUpZaloName" component={SignUpZaloName} />
          <Stack.Screen name="SignUpAddProfile" component={SignUpAddProfile} />
          <Stack.Screen name="UpdateAvatar" component={UpdateAvatar} />
          <Stack.Screen
            options={{
              animation: 'none',
            }}
            name="HomeMessage"
            component={HomeMessage}
          />
          <Stack.Screen
            options={{
              animation: 'none',
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen name="ProfileUser" component={ProfileUser} />
          <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Diary" component={Diary} />
          <Stack.Screen name="RequestFriend" component={RequestFriend} />
          <Stack.Screen name="PersonChat" component={PersonChat} />
          <Stack.Screen name="SearchUser" component={SearchUser} />
          <Stack.Screen name="VideoCall" component={VideoCall} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} />
          <Stack.Screen name="MemberGroup" component={MemberGroup} />
          <Stack.Screen name="AddMember" component={AddMember} />
          <Stack.Screen name="ConfirmPhoneNumber" component={ConfirmPhoneNumber} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Stack.Screen name="ProfileUpdate_Handle" component={ProfileUpdate_Handle} />
          <Stack.Screen name="Account_Security" component={Account_Security} />
          <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} />
          <Stack.Screen name="ForgetPwdOTP" component={ForgetPwdOTP} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
