import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/headers/SearchHeader";
import { BASE_UNIT } from "../constants/screen";
import NavigationBar from "../components/navigation/NavigationBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FriendTab from "./ContactTab/FriendTab";
import GroupTab from "./ContactTab/GroupTab";
import OATab from "./ContactTab/OATab";

const Tab = createMaterialTopTabNavigator();

export default function Contact() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        iconName2={"person-add-outline"}
        iconName2Size={BASE_UNIT * 0.07}
      />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: "#3b82f6" },
        }}
      >
        <Tab.Screen name="Bạn bè" component={FriendTab} />
        <Tab.Screen name="Nhóm" component={GroupTab} />
        <Tab.Screen name="OA" component={OATab} />
      </Tab.Navigator>

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
