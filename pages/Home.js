import { View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSelect from "../components/selects/LanguageSelect";
import { BASE_UNIT } from "../constants/screen";
import LargeButton from "../components/buttons/LargeButton";
import { useRecoilState, useRecoilValue } from "recoil";
import SelectLanguageModal from "../components/modals/SelectLanguageModal";
import { languageState, modalLanguageState } from "../state/PrimaryState";
import IntroSwiper from "../components/swipers/IntroSwiper";

export default function Home() {
  const selectedLanguage = useRecoilValue(languageState);
  const [, setModalVisible] = useRecoilState(modalLanguageState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LanguageSelect onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.content}>
        <IntroSwiper />
      </View>
      <View style={styles.footer}>
        <LargeButton
          text={selectedLanguage === "vie" ? "Đăng nhập" : "Login"}
          color={"#006DFE"}
          textColor={"white"}
        />
        <LargeButton
          text={
            selectedLanguage === "vie"
              ? "Tạo tài khoản mới"
              : "Create new account"
          }
          color={"#ECEDEF"}
          textColor={"black"}
        />
      </View>
      <SelectLanguageModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: BASE_UNIT,
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: BASE_UNIT * 0.01,
  },
  content: {
    alignItems: "center",
    marginTop: BASE_UNIT * 0.02,
    flex: 1,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.3,
    paddingBottom: BASE_UNIT * 0.07,
  },
});
