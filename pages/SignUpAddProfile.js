import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../components/headers/SimpleHeader";
import HeaderText from "../components/texts/HeaderText";
import BirthdaySelect from "../components/selects/BirthdaySelect";
import { BASE_UNIT } from "../constants/screen";
import GenderSelect from "../components/selects/GenderSelect";
import LargeButton from "../components/buttons/LargeButton";
import { useTextLanguage } from "../hooks/useTextLanguage";
import { useNavigation } from "@react-navigation/native";
import SelectGenderModal from "../components/modals/SelectGenderModal";
import { Colors } from "../styles/Colors";
import CreateAccountCompleted from "../components/modals/CreateAccountCompleted";
import { useRecoilValue } from "recoil";
import { nameRegister, passwordRegister, phoneNumberRegister } from "../state/RegisterState";
import { signup } from "../api/auth/register";
import { getTempToken } from "../utils/asyncStorage";

export default function SignUpAddProfile() {
  const navigation = useNavigation();
  const currentDate = new Date();
  
  const name = useRecoilValue(nameRegister);
  const phone = useRecoilValue(phoneNumberRegister);
  const password = useRecoilValue(passwordRegister);




  const [selectedGender, setSelectedGender] = useState("nothing");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatDate = selectedDate.toLocaleDateString("en-CA");
  

  const [modalGenderVisible, setModalGenderVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleDisableButton = () => {
    if (
      selectedGender != "nothing" &&
      selectedDate.getFullYear() < currentDate.getFullYear()
    )
      setButtonDisable(false);
    else setButtonDisable(true);
  };

  useEffect(() => {
    handleDisableButton();
  }, [selectedGender, selectedDate]);

  const handleSignup = async () => {
    try {
      const tempToken = await getTempToken();
      console.log(
        "Thông tin đăng ký:",
        {
        name,
        phone,
        formatDate,
        password,
        tempToken,
        selectedGender
        }
      );
      const result = await signup(name, phone, formatDate, password, tempToken, selectedGender);
      Alert.alert("Thành công", "Đăng ký thành công!");
      console.log("Đăng ký thành công:", result);
    } catch (error) {
      Alert.alert("Lỗi", error);
      console.error("Lỗi khi đăng ký:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SimpleHeader onPress={() => navigation.goBack()} />
        <HeaderText
          text={useTextLanguage({
            vietnamese: "Thêm thông tin cá nhân",
            english: "add profile",
          })}
        />
      </View>
      <View style={styles.content}>
        <BirthdaySelect
          minimumAge={15}
          dateValue={selectedDate}
          setDateValue={setSelectedDate}
        />
        <GenderSelect
          onPress={() => {
            handleDisableButton();
            setModalGenderVisible(true);
          }}
          selectedGender={selectedGender}
        />
      </View>
      <View style={styles.footer}>
        <LargeButton
          disabled={buttonDisable}
          textColor={"white"}
          color={Colors.primary}
          text={useTextLanguage({ vietnamese: "Tiếp tục", english: "Next" })}
          onPress={() => {
            setSuccessModalVisible(true)
            handleSignup();
          }}
        />
      </View>
      <SelectGenderModal
        onPress={() => {
          handleDisableButton();
          setModalGenderVisible(false);
        }}
        modalVisible={modalGenderVisible}
        setModalVisible={setModalGenderVisible}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />

      <CreateAccountCompleted
        visible={successModalVisible}
        onClose={() => {setSuccessModalVisible(false)
          navigation.navigate('UpdateAvatar')
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  header: {
    width: "100%",
  },
  content: {
    marginTop: BASE_UNIT * 0.08,
    paddingHorizontal: BASE_UNIT * 0.05,
    paddingVertical: BASE_UNIT * 0.03,
    justifyContent: "space-between",
    height: BASE_UNIT * 0.35,
  },
  footer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: BASE_UNIT * 0.04,
  },
});
