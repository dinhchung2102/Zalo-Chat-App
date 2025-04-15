import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SearchHeader from "../components/headers/SearchHeader";
import NavigationBar from "../components/navigation/NavigationBar";
import { Colors } from "../styles/Colors";
import { BASE_UNIT, textMediumSize } from "../constants/screen";
import { useNavigation } from "@react-navigation/native";
import { useTextLanguage } from "../hooks/useTextLanguage";

// Dữ liệu giả lập cho Nhật Ký
const mockDiaryEntries = [
  {
    id: "1",
    content: "Hôm nay là một ngày đẹp trời!",
    date: "08/04/2025 08:00",
    likes: 5,
    comments: 2,
  },
  {
    id: "2",
    content: "Đi uống cà phê với bạn, vui quá!",
    date: "07/04/2025 15:30",
    likes: 3,
    comments: 1,
  },
];

export default function Diary() {
  const navigation = useNavigation();
  const [diaryEntries, setDiaryEntries] = useState(mockDiaryEntries);
  const [newEntry, setNewEntry] = useState("");
  const addEntry = () => {
    if (newEntry.trim() === "") return;
    const newId = (diaryEntries.length + 1).toString();
    const currentDate = new Date().toLocaleString();
    setDiaryEntries([
      {
        id: newId,
        content: newEntry,
        date: currentDate,
        likes: 0,
        comments: 0,
      },
      ...diaryEntries,
    ]);
    setNewEntry("");
  };
  const renderDiaryEntry = ({ item }) => (
    <TouchableOpacity
      style={styles.entryItem}
      onPress={() => navigation.navigate("DiaryDetail", { entryId: item.id })}
    >
      <Text style={styles.entryDate}>{item.date}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
      <View style={styles.entryActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color={Colors.grey} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={Colors.grey} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        textColor="white"
        iconName2={"add"}
        placeholder={useTextLanguage({
          vietnamese: "Tìm kiếm bài viết",
          english: "Search posts",
        })}
        onIcon2Press={addEntry}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={useTextLanguage({
            vietnamese: "Bạn đang nghĩ gì?",
            english: "What's on your mind?",
          })}
          value={newEntry}
          onChangeText={setNewEntry}
          onSubmitEditing={addEntry}
        />
      </View>
      <View style={styles.entryList}>
        <FlatList
          data={diaryEntries}
          renderItem={renderDiaryEntry}
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
  inputContainer: {
    paddingHorizontal: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 5,
    padding: BASE_UNIT * 0.02,
    fontSize: textMediumSize,
  },
  entryList: {
    flex: 1,
    paddingHorizontal: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.02,
  },
  entryItem: {
    paddingVertical: BASE_UNIT * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  entryDate: {
    fontSize: textMediumSize * 0.8,
    color: Colors.grey,
    marginBottom: BASE_UNIT * 0.01,
  },
  entryContent: {
    fontSize: textMediumSize,
    fontWeight: "500",
    color: Colors.black,
  },
  entryActions: {
    flexDirection: "row",
    marginTop: BASE_UNIT * 0.02,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: BASE_UNIT * 0.05,
  },
  actionText: {
    marginLeft: BASE_UNIT * 0.01,
    fontSize: textMediumSize * 0.8,
    color: Colors.grey,
  },
  navigationBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
