import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";

export default function NavigationBar() {
  const [message, setMessage] = useState(true);
  const [contact, setContact] = useState(false);
  const [explore, setExplore] = useState(false);
  const [diary, setDiary] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleNavigation = (type) => {
    setMessage(false);
    setContact(false);
    setExplore(false);
    setDiary(false);
    setProfile(false);

    switch (type) {
      case "message":
        setMessage(true);
        break;
      case "contact":
        setContact(true);
        break;
      case "explore":
        setExplore(true);
        break;
      case "diary":
        setDiary(true);
        break;
      case "profile":
        setProfile(true);
        break;
      default:
        break;
    }
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
      <TouchableOpacity
        onPress={() => {
          handleNavigation("message");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={message ? "messenger" : "messenger-outline"}
          size={ICON_MEDIUM * 1.3}
          color={message ? Colors.primary : Colors.grey}
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
        {message ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Tin nhắn
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigation("contact");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name="contacts"
          size={ICON_MEDIUM * 1.3}
          color={contact ? Colors.primary : Colors.grey}
        />
        {contact ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Liên hệ
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigation("explore");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={explore ? "grid-view" : "grid-view"}
          size={ICON_MEDIUM * 1.3}
          color={explore ? Colors.primary : Colors.grey}
        />
        {explore ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Khám phá
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigation("diary");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={diary ? "access-time-filled" : "access-time"}
          size={ICON_MEDIUM * 1.3}
          color={diary ? Colors.primary : Colors.grey}
        />
        {diary ? (
          <View>
            <Text style={{ fontWeight: "700", color: Colors.primary }}>
              Nhật ký
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigation("profile");
        }}
        style={{ alignItems: "center" }}
      >
        <MaterialIcons
          name={profile ? "person" : "person-outline"}
          color={profile ? Colors.primary : Colors.grey}
          size={ICON_MEDIUM * 1.3}
        />
        {profile ? (
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
