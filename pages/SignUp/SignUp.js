import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../../components/shared/SimpleHeader";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  languageState,
  modalAuthRegister,
  modalValidatorPhoneNumber,
} from "../../state/PrimaryState";
import PhoneNumberInput from "../../components/screens/SignUp/PhoneNumberInput";
import AgreeTerms from "../../components/others/AgreeTerms";
import { Colors } from "../../styles/Colors";
import LargeButton from "../../components/shared/LargeButton";
import LinkButton from "../../components/shared/LinkButton";
import { useNavigation } from "@react-navigation/native";
import AuthRegisterModal from "../../components/modals/AuthRegisterModal";
import { phoneNumberRegister } from "../../state/RegisterState";
import { useTextLanguage } from "../../hooks/useTextLanguage";
import HeaderText from "../../components/texts/HeaderText";
import { validatePhoneNumber } from "../../utils/phoneValidator";
import PhoneNumberValidatorModal from "../../components/modals/PhoneNumberValidatorModal";

export default function SignUp() {
  const navigation = useNavigation();
  const selectedLanguage = useRecoilValue(languageState);
  const [, setModalState] = useRecoilState(modalAuthRegister);
  const [, setModalValidator] = useRecoilState(modalValidatorPhoneNumber);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberRegister);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleCheck = () => {
    return checked1 && checked2;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SimpleHeader
          iconColor={"black"}
          backgroundColor={"white"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={{ paddingTop: BASE_UNIT * 0.04 }}>
        <HeaderText
          text={useTextLanguage({
            vietnamese: "Nhập số điện thoại",
            english: "Enter your phone number",
          })}
        />
      </View>

      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.04,
          paddingTop: BASE_UNIT * 0.07,
        }}
      >
        <PhoneNumberInput />
      </View>
      <View style={{ marginTop: BASE_UNIT * 0.04 }}>
        <AgreeTerms
          term={useTextLanguage({
            vietnamese: "Điều khoản sử dụng Zalo",
            english: "Zalo Terms of Service",
          })}
          textColor={Colors.primary}
          checked={checked1}
          setChecked={setChecked1}
        />
        <AgreeTerms
          term={useTextLanguage({
            vietnamese: "Điều khoản Mạng xã hội của Zalo",
            english: `Zalo's Social Terms of Service`,
          })}
          textColor={Colors.primary}
          checked={checked2}
          setChecked={setChecked2}
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
          text={useTextLanguage({ vietnamese: "Tiếp tục", english: "Next" })}
          color={Colors.primary}
          textColor={"white"}
          onPress={() => {
            if (validatePhoneNumber(phoneNumber)) setModalState(true);
            else setModalValidator(true);
          }}
          disabled={!handleCheck()}
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
          {useTextLanguage({
            vietnamese: "Bạn đã có tài khoản?",
            english: "Already have an account",
          })}
        </Text>
        <LinkButton
          text={useTextLanguage({
            vietnamese: "Đăng nhập ngay",
            english: "Login",
          })}
          textColor={Colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <AuthRegisterModal number={phoneNumber} />
      <PhoneNumberValidatorModal />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
