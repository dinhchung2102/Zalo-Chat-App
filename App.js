import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Public/Home";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import SignUpOTP from "./pages/SignUp/SignUpOTP";
import FAQ from "./pages/Public/FAQ";
import SignUpZaloName from "./pages/SignUp/SignUpZaloName";
import SignUpAddProfile from "./pages/SignUp/SignUpAddProfile";
import HomeMessage from "./pages/Chat/HomeMessage";
import Profile from "./pages/User/Profile";
import UpdateAvatar from "./pages/SignUp/UpdateAvatar";
import ProfileUser from "./pages/User/ProfileUser";
import ProfileSetting from "./pages/User/ProfileSetting";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import Diary from "./pages/Diary";
import RequestFriend from "./pages/ContactTab/RequestFriend";
import PersonChat from "./pages/Chat/PersonChat";
import SearchUser from "./pages/Public/SearchUser";
import VideoCall from "./pages/VideoCall";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpOTP" component={SignUpOTP} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="SignUpZaloName" component={SignUpZaloName} />
          <Stack.Screen name="SignUpAddProfile" component={SignUpAddProfile} />
          <Stack.Screen name="UpdateAvatar" component={UpdateAvatar}/>
          <Stack.Screen
            options={{
              animation: 'none',
            }}
            name="HomeMessage"
            component={HomeMessage}
          />
          <Stack.Screen
            options={{
              animation: "none",
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen name="ProfileUser" component={ProfileUser}/>
          <Stack.Screen name="ProfileSetting" component={ProfileSetting}/>
          <Stack.Screen name="Contact" component={Contact}/>
          <Stack.Screen name="Explore" component={Explore}/>
          <Stack.Screen name="Diary" component={Diary}/>
          <Stack.Screen name="RequestFriend" component={RequestFriend}/>
          <Stack.Screen name="PersonChat" component={PersonChat}/>
          <Stack.Screen name="SearchUser" component={SearchUser}/>
          <Stack.Screen name="VideoCall" component={VideoCall} />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
