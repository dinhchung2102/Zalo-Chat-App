import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../components/headers/SimpleHeader";
import { useRecoilValue } from "recoil";
import { languageState } from "../state/PrimaryState";
import LoginInput from "../components/textInputs/LoginInput";
import { BASE_UNIT } from "../constants/screen";
import { useNavigation } from "@react-navigation/native";
import LinkButton from "../components/buttons/LinkButton";
import CircleButton from "../components/buttons/CircleButton";
import { Colors } from "../styles/Colors";

export default function Login() {
  const navigation = useNavigation();
  const selectedLanguage = useRecoilValue(languageState);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputRef = useRef(null);

  const handleCheckNull = () => {
    return username != "" && password != "";
  };

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SimpleHeader
          text={selectedLanguage === "vie" ? "Đăng nhập" : "Login"}
          iconColor={"white"}
          linearPrimary={true}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.viewText}>
          <Text style={styles.text}>
            {selectedLanguage === "vie"
              ? "Vui lòng nhập số điện thoại và mật khẩu để đăng nhập"
              : "Please enter phone number and password to login"}
          </Text>
        </View>

        <View style={styles.content}>
          <LoginInput
            placeholder={
              selectedLanguage === "vie" ? "Số điện thoại" : "Phone number"
            }
            value={username}
            onChangeText={(text) => setUsername(text)}
            phoneNumber={true}
            autoFocus={true}
            ref={usernameInputRef}
          />
          <LoginInput
            placeholder={selectedLanguage === "vie" ? "Mật khẩu" : "Password"}
            value={password}
            onChangeText={setPassword}
            password={true}
          />
          <View style={{ marginTop: BASE_UNIT * 0.02 }}>
            <LinkButton
              text={
                selectedLanguage === "vie"
                  ? "Lấy lại mật khẩu"
                  : "Recover password"
              }
              textColor={Colors.primary}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <LinkButton
          text={selectedLanguage === "vie" ? "Câu hỏi thường gặp" : "FAQ"}
          textColor={Colors.grey}
          icon={"chevron-right"}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          position: "absolute",
          bottom: BASE_UNIT * 0.03,
          right: BASE_UNIT * 0.02,
        }}
      >
        <CircleButton
          disabled={!handleCheckNull()}
          color={handleCheckNull() ? Colors.primary : Colors.grey}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    paddingHorizontal: BASE_UNIT * 0.03,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: BASE_UNIT * 1.5,
  },
});
