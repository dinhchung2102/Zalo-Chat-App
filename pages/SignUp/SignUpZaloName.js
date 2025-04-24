import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_UNIT } from "../../constants/screen";
import HeaderText from "../../components/texts/HeaderText";
import { useTextLanguage } from "../../hooks/useTextLanguage";
import HeaderDesText from "../../components/texts/HeaderDesText";
import { Colors } from "../../styles/Colors";
import BorderInput from "../../components/screens/SignUp/BorderInput";
import LargeButton from "../../components/shared/LargeButton";
import RuleList from "../../components/others/RuleList";
import {
  validateUsernameLength,
  validateUsernameNotNumber,
} from "../../utils/nameValidator";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { nameRegister } from "../../state/RegisterState";

export default function SignUpZaloName() {
  const navigation = useNavigation();

  const [, setNameRegister] = useRecoilState(nameRegister);

  const [nameLength, setNameLength] = useState(false);
  const [nameNotNumber, setNameNotNumber] = useState(false);

  const handleNameChange = (name) => {
    const isValidLength = validateUsernameLength(name);
    const isValidNotNumber = validateUsernameNotNumber(name);

    setNameLength(isValidLength);
    setNameNotNumber(isValidNotNumber);
    setNameRegister(name);
  };

  const disableButton = () => {
    if (nameLength && nameNotNumber) return false;
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderText
          text={useTextLanguage({
            vietnamese: "Nhập tên Zalo",
            english: "Enter Zalo Name",
          })}
        />
        <View style={{ paddingTop: BASE_UNIT * 0.02 }}>
          <HeaderDesText
            text={useTextLanguage({
              vietnamese: "Hãy dùng tên thật để mọi người dễ nhận ra bạn",
              english: "hello vietnam",
            })}
            color={Colors.grey}
          />
        </View>
      </View>

      <View style={styles.content}>
        <BorderInput
          placeholder={useTextLanguage({
            vietnamese: "Nguyễn Văn A",
            english: "Nguyen Van A",
          })}
          onChangeText={handleNameChange}
          borderColor={Colors.primary}
        />
        <RuleList
          rule={useTextLanguage({
            vietnamese: "Dài từ 2 đến 40 ký tự",
            english: "Hello hihi",
          })}
          valid={nameLength}
        />
        <RuleList
          rule={useTextLanguage({
            vietnamese: "Không chứa số và ký tự đặc biệt",
            english: "Hello hihi",
          })}
          valid={nameNotNumber}
        />
        <RuleList
          rule={useTextLanguage({
            vietnamese: "Cần tuân thủ",
            english: "Hello hihi",
          })}
          term={"Quy định đặt tên Zalo"}
          valid={true}
        />
      </View>

      <View style={styles.viewButton}>
        <LargeButton
          text={useTextLanguage({ vietnamese: "Tiếp tục", english: "Next" })}
          disabled={disableButton()}
          color={Colors.primary}
          textColor={"white"}
          onPress={() => navigation.navigate("SignUpAddProfile")}
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
  header: {
    paddingHorizontal: BASE_UNIT * 0.02,
    width: "100%",
    alignItems: "center",
    paddingTop: BASE_UNIT * 0.1,
  },
  content: {
    paddingHorizontal: BASE_UNIT * 0.04,
    width: "100%",
    alignItems: "center",
    paddingTop: BASE_UNIT * 0.1,
  },
  viewButton: {
    alignItems: "center",
    paddingTop: BASE_UNIT * 0.13,
  },
});
