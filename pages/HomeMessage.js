import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/headers/SearchHeader";
import MessageTitleRender from "../components/renderItems/MessageTitleRender";
import { BASE_UNIT } from "../constants/screen";
import NavigationBar from "../components/navigation/NavigationBar";
import { Colors } from "../styles/Colors";

export default function HomeMessage() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary}/>
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        textColor="white"
        iconName={'qr-code-scanner'}
        iconName2={'add'}
      />
      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.05,
          paddingVertical: BASE_UNIT * 0.03,
        }}
      >
        <MessageTitleRender />
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
