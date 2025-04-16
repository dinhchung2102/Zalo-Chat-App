// src/screens/Login.js
import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../components/textInputs/LoginInput";
import CircleButton from "../components/buttons/CircleButton";
import { BASE_UNIT } from "../constants/screen";
import { Colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/auth/authThunk";
import SimpleHeader from "../components/headers/SimpleHeader";
import { useTextLanguage } from "../hooks/useTextLanguage";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("+8488621135");
  const [password, setPassword] = useState("123456A@");
  const phoneNumberInputRef = useRef(null);

  const { error, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.replace("HomeMessage");
    }
  }, [user]);

  useEffect(() => {
    phoneNumberInputRef.current?.focus();
  }, []);

  const handleLogin = () => {
    if (phoneNumber && password) {
      dispatch(loginThunk({ phoneNumber, password }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        text={useTextLanguage({ vietnamese: "Đăng nhập", english: "Login" })}
        iconColor={"white"}
        linearPrimary={true}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.viewText}>
        <Text style={styles.text}>
          {useTextLanguage({
            vietnamese:
              "Vui lòng nhập số điện thoại và mật khẩu để đăng nhập",
            english: "Please enter phone number and password to login",
          })}
        </Text>
      </View>
      <View style={styles.content}>
        <LoginInput
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          phoneNumber={true}
          autoFocus={true}
          ref={phoneNumberInputRef}
        />
        <LoginInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          password={true}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.footer}>
        <CircleButton
          disabled={!phoneNumber || !password || isLoading}
          color={!phoneNumber || !password ? Colors.grey : Colors.primary}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewText: {
    backgroundColor: "#f0f0f0",
    height: BASE_UNIT * 0.1,
    justifyContent: "center",
    marginBottom: BASE_UNIT * 0.02,
  },
  text: {
    paddingHorizontal: BASE_UNIT * 0.02,
  },
  content: {
    paddingHorizontal: BASE_UNIT * 0.03,
  },
  footer: {
    alignItems: "flex-end",
    position: "absolute",
    bottom: BASE_UNIT * 0.03,
    right: BASE_UNIT * 0.02,
  },
  error: {
    color: "red",
    marginTop: BASE_UNIT * 0.01,
  },
});
