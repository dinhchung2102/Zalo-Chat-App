import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Public/Home';
import { RecoilRoot } from 'recoil';
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
import { useEffect, useRef } from 'react';
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
import HandleConve from './pages/Chat/HandleConve';
import PersonalDetailScreen from './pages/Chat/PersonalDetailScreen';
import GroupDetailScreen from './pages/Chat/GroupDetailScreen';
import EmailUpdate from './pages/User/EmailUpdate';
import { navigate, navigationRef } from './services/RootNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const Stack = createStackNavigator();
  const responseListener = useRef();

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Người dùng đã nhấn vào thông báo:', response);

      const data = response.notification.request.content.data;
      if (data?.type === 'newMessage') {
        navigate('PersonChat', { conversationId: data.conversationId });
      }

      if (data?.type === 'friendRequest') {
        navigate('RequestFriend');
      }
    });
  }, []);
  return (
    <RecoilRoot>
      <NavigationContainer ref={navigationRef}>
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
          <Stack.Screen name="HandleConve" component={HandleConve} />
          <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
          <Stack.Screen name="PersonalDetailScreen" component={PersonalDetailScreen} />
          <Stack.Screen name="EmailUpdate" component={EmailUpdate} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
