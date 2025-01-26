import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../components/headers/SimpleHeader";
import { BASE_UNIT } from "../constants/screen";
import {
  textHeaderSize,
  textMediumSize,
} from "../constants/fontSize";
import { useRecoilValue } from "recoil";
import { languageState } from "../state/PrimaryState";
import PhoneNumberInput from "../components/textInputs/PhoneNumberInput";
import AgreeTerms from "../components/checkboxes/AgreeTerms";
import { Colors } from "../styles/Colors";
import LargeButton from "../components/buttons/LargeButton";
import LinkButton from "../components/buttons/LinkButton";

export default function SignUp() {
  const selectedLanguage = useRecoilValue(languageState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SimpleHeader iconColor={"black"} backgroundColor={"white"} />
      </View>

      <Text
        style={{
          fontSize: textHeaderSize,
          fontWeight: "500",
          textAlign: "center",
          paddingTop: BASE_UNIT * 0.04,
        }}
      >
        {selectedLanguage === "vie"
          ? "Nhập số điện thoại "
          : "Enter your phone number"}
      </Text>

      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.04,
          paddingTop: BASE_UNIT * 0.07,
        }}
      >
        <PhoneNumberInput />
      </View>
      <View style={{ marginTop: BASE_UNIT * 0.04 }}>
        <AgreeTerms term={"Zalo Terms of Service"} textColor={Colors.primary} />
        <AgreeTerms
          term={`Zalo's Social Terms of Service`}
          textColor={Colors.primary}
        />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: BASE_UNIT * 0.1,
        }}
      >
        <LargeButton
          text={selectedLanguage === "vie" ? "Tiếp tục" : "Next"}
          color={Colors.primary}
          textColor={"white"}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          bottom: BASE_UNIT * 0.02,
        }}
      >
        <Text style={{ fontSize: textMediumSize }}>
          {selectedLanguage === "vie"
            ? "Bạn đã có tài khoản? "
            : "Do you have an account"}
        </Text>
        <LinkButton
          text={selectedLanguage === "vie" ? "Đăng nhập ngay" : "Login now"}
          textColor={Colors.primary}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
