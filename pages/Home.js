import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSelect from "../components/selects/LanguageSelect";
import { BANNER_HEIGHT, BANNER_WIDTH } from "../constants/bannerSize";
import { BASE_UNIT } from "../constants/screen";
import { textLargeSize, textMediumSize } from "../constants/fontSize";
import LargeButton from "../components/buttons/LargeButton";
import { useRecoilState, useRecoilValue } from "recoil";
import SelectLanguageModal from "../components/modals/SelectLanguageModal";
import { languageState, modalLanguageState } from "../state/PrimaryState";

export default function Home() {
  const selectedLanguage = useRecoilValue(languageState);
  const [, setModalVisible] = useRecoilState(modalLanguageState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LanguageSelect onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.content}>
        <Text style={styles.textAppName}>Zalo</Text>
        <View style={styles.swiper}>
          <Image
            source={require("../assets/home/video-on-dinh.png")}
            style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}
          />
          <Text style={{fontSize: textMediumSize, fontWeight:'bold', textAlign:'center', marginBottom: BASE_UNIT*0.01}}>{selectedLanguage === 'vie' ? 'Gọi video ổn định' : 'Smooth video call'}</Text>
          <Text style={{fontSize: textMediumSize - 1, color:'#c4c4c4', textAlign:'center'}}>{selectedLanguage === 'vie' ? 'Trò chuyện thật đã với chất lượng video ổn định mọi lúc, mọi nơi' : 'Perform video calls with high-quality over all type of networks'}</Text>
        </View>
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
  },
  textAppName: {
    fontSize: textLargeSize,
    fontWeight: "700",
    marginBottom: BASE_UNIT * 0.3,
    color: "#006DFE",
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: BASE_UNIT * 0.07,
  },
});
