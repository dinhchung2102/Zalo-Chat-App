import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpOTP from "./pages/SignUpOTP";
import FAQ from "./pages/FAQ";

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
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
