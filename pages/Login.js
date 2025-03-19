import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../components/headers/SimpleHeader";
import LoginInput from "../components/textInputs/LoginInput";
import { BASE_UNIT } from "../constants/screen";
import { useNavigation } from "@react-navigation/native";
import LinkButton from "../components/buttons/LinkButton";
import CircleButton from "../components/buttons/CircleButton";
import { Colors } from "../styles/Colors";
import { useTextLanguage } from "../hooks/useTextLanguage";

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true)

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
            placeholder={useTextLanguage({
              vietnamese: "Số điện thoại",
              english: "Phone number",
            })}
            value={username}
            onChangeText={(text) => setUsername(text)}
            phoneNumber={true}
            autoFocus={true}
            ref={usernameInputRef}
          />
          <LoginInput
            placeholder={useTextLanguage({
              vietnamese: "Mật khẩu",
              english: "Password",
            })}
            value={password}
            onChangeText={setPassword}
            password={true}
            securePassword={securePassword}
          />
          <View style={{ marginTop: BASE_UNIT * 0.02 }}>
            <LinkButton
              text={useTextLanguage({
                vietnamese: "Lấy lại mật khẩu",
                english: "Recover password",
              })}
              textColor={Colors.primary}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <LinkButton
          text={useTextLanguage({
            vietnamese: "Câu hỏi thường gặp",
            english: "FAQ",
          })}
          textColor={Colors.grey}
          icon={"chevron-right"}
          onPress={() => navigation.navigate("FAQ")}
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
          onPress={()=>{navigation.navigate('HomeMessage')}}
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
