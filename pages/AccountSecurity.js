import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../styles/Colors";

export default function AccountSecurity({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      {/* Header thay thế SearchHeader */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tài khoản và bảo mật</Text>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TÀI KHOẢN</Text>
          <Item label="Số điện thoại" value="03456789xx" />
          <Item label="Tên đăng nhập" value="hoanglong123" />
          <Item label="Liên kết với Facebook" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BẢO MẬT</Text>
          <Item
            label="Mật khẩu"
            showArrow
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <Item label="Mã khóa Zalo" showArrow />
          <Item label="Tin nhắn 2 thiết bị" showArrow />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Item = ({ label, value, showArrow, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View>
      <Text style={styles.label}>{label}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
    {showArrow && (
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={Colors.grey}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  section: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.grey,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: Colors.black,
  },
  value: {
    fontSize: 14,
    color: Colors.grey,
  },
});
