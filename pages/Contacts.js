import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../components/headers/SearchHeader";
import NavigationBar from "../components/navigation/NavigationBar";
import { Colors } from "../styles/Colors";
import { BASE_UNIT } from "../constants/screen";
import { textMediumSize } from "../constants/fontSize";
import { useNavigation } from "@react-navigation/native";
import { useTextLanguage } from "../hooks/useTextLanguage";

const mockContacts = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "Đang hoạt động",
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "Offline",
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "Đang bận",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "Đang hoạt động",
  },
];

export default function Contacts() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState(mockContacts);

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() =>
        navigation.navigate("Chat", {
          contactId: item.id,
          contactName: item.name,
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        textColor="white"
        iconName2={"person-add"}
        placeholder={useTextLanguage({
          vietnamese: "Tìm kiếm bạn bè",
          english: "Search friends",
        })}
      />
      <View style={styles.contactList}>
        <FlatList
          data={contacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.navigationBar}>
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
  contactList: {
    flex: 1,
    paddingHorizontal: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.02,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: BASE_UNIT * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  avatar: {
    width: BASE_UNIT * 0.12,
    height: BASE_UNIT * 0.12,
    borderRadius: BASE_UNIT * 0.06,
    marginRight: BASE_UNIT * 0.03,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: textMediumSize,
    fontWeight: "500",
  },
  contactStatus: {
    fontSize: textMediumSize * 0.8,
    color: Colors.grey,
  },
  navigationBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
