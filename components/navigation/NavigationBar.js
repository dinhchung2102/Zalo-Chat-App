import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { navigationState } from "../../state/PrimaryState";

export default function NavigationBar() {
  const navigation = useNavigation();
  const [navState, setNavigationState] = useRecoilState(navigationState);

  // Hàm thay đổi trạng thái navState
  const handleNavigation = (type) => {
    setNavigationState(type);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: BASE_UNIT * 0.15,
        width: BASE_UNIT,
        backgroundColor: "white",
        borderTopColor: Colors.lightGrey,
        borderTopWidth: BASE_UNIT * 0.0025,
      }}
    >
      {/* Icon Message */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation("message");
          navigation.navigate("HomeMessage");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={navState === "message" ? "messenger" : "messenger-outline"}
          size={ICON_MEDIUM * 1.3}
          color={navState === "message" ? Colors.primary : Colors.grey}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "red",
            height: ICON_MEDIUM * 0.8,
            width: ICON_MEDIUM * 0.8,
            top: -BASE_UNIT * 0.006,
            right: -BASE_UNIT * 0.003,
            borderRadius: BASE_UNIT,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>49</Text>
        </View>
        {navState === "message" ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Tin nhắn
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Contact */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation("contact");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name="contacts"
          size={ICON_MEDIUM * 1.3}
          color={navState === "contact" ? Colors.primary : Colors.grey}
        />
        {navState === "contact" ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Liên hệ
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Explore */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation("explore");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name="grid-view"
          size={ICON_MEDIUM * 1.3}
          color={navState === "explore" ? Colors.primary : Colors.grey}
        />
        {navState === "explore" ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Khám phá
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Diary */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation("diary");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={navState === "diary" ? "access-time-filled" : "access-time"}
          size={ICON_MEDIUM * 1.3}
          color={navState === "diary" ? Colors.primary : Colors.grey}
        />
        {navState === "diary" ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Nhật ký
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Profile */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation("profile");
          navigation.navigate("Profile");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={navState === "profile" ? "person" : "person-outline"}
          color={navState === "profile" ? Colors.primary : Colors.grey}
          size={ICON_MEDIUM * 1.3}
        />
        {navState === "profile" ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Cá nhân
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
