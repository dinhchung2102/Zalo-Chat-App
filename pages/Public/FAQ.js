import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SimpleWebView from "../../components/webviews/SimpleWebView";
import SimpleHeader from "../../components/headers/SimpleHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../styles/Colors";
import { useRecoilValue } from "recoil";
import { languageState } from "../../state/PrimaryState";
import { useNavigation } from "@react-navigation/native";

export default function FAQ() {
  const selectedLanguage = useRecoilValue(languageState);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        onPress={() => navigation.goBack()}
        text={selectedLanguage === "vie" ? "Câu hỏi thường gặp" : "FAQ"}
        backgroundColor={Colors.primary}
        iconColor={"white"}
      />
      <SimpleWebView url={"https://help.zalo.me/"} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
