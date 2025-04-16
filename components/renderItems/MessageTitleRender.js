import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { Colors } from "../../styles/Colors";
import { differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { useNavigation } from "@react-navigation/native";

export default function MessageTitleRender({ item }) {

  const navigation = useNavigation();


  const getFormattedTime = (timestamp) => {
    if (!timestamp) return "No time";

    const date = parseISO(timestamp);
    if (!isValid(date)) return "No time";

    const now = new Date();
    const secondsDiff = differenceInSeconds(now, date);

    if (secondsDiff < 60) {
      return `${secondsDiff} giây`;
    }

    const minutesDiff = differenceInMinutes(now, date);
    if (minutesDiff < 60) {
      return `${minutesDiff} phút`;
    }

    const hoursDiff = differenceInHours(now, date);
    if (hoursDiff < 24) {
      return `${hoursDiff} giờ`;
    }

    return format(date, "dd/MM");
  };


  const handlePress = () => {
    navigation.navigate("ChatDetailScreen", {
      conversationId: item._id, // 👈 truyền ID
      isGroup: item.isGroup,
      name: item.name,
      groupName: item.groupName,
      avatar: item.avatar,
    });
  };



  return (
    <TouchableOpacity style={styles.row}  onPress={handlePress}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.avatar || "https://i.pinimg.com/736x/92/9a/70/929a70c61900974a4724f4fb8e04ff9d.jpg" }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name ? item.name : item.groupName}</Text>
          <Text style={styles.time}>{getFormattedTime(item.updatedAt)}</Text>
        </View>
        <Text style={styles.message}>{item.lastMessage?.content || "Tin nhắn gần nhất"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingBottom: BASE_UNIT * 0.05,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "blue",
    height: BASE_UNIT * 0.15,
    width: BASE_UNIT * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BASE_UNIT * 0.15,
  },
  avatar: {
    width: BASE_UNIT * 0.1,
    height: BASE_UNIT * 0.1,
    borderRadius: BASE_UNIT * 0.05,
  },
  content: {
    flex: 1,
    height: "100%",
    paddingLeft: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.01,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: textMediumSize * 1.1,
    marginBottom: BASE_UNIT * 0.01,
  },
  time: {
    color: Colors.grey,
  },
  message: {
    fontSize: textMediumSize * 0.9,
    color: Colors.grey,
  },
});
