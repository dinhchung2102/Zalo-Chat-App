import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ICON_MEDIUM } from "../../constants/iconSize";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { textLargeSize, textMediumSize } from "../../constants/fontSize";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { updateAvatar } from "../../api/auth/update.avt";
import { getLoginResult, getUserId } from "../../services/storageService";
import { getShortNameRegister } from "../../utils/getShortName";
export default function ProfileUser() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const [loginResult, setLoginResult] = useState(null);

  useEffect(() => {
    const fetchLoginResult = async () => {
      const result = await getLoginResult();
      setLoginResult(result);
      console.log(result);
    };

    fetchLoginResult();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //const resultUpdate = await updateAvatar(getUserId(), result.assets[0].uri);
      //console.log(resultUpdate);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Bạn cần cấp quyền để sử dụng camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //const resultUpdate = await updateAvatar(getUserId(), result.assets[0].uri);
    }
  };

  const handleSetAvatar = async () => {
    if (image != null) {
      const resultUpdate = await updateAvatar(getUserId(), image);
      setImage(null);
      console.log(resultUpdate);
    }
  };

  const handleSetBackgroundImage = async () => {
    if (image != null) {
      //const resultUpdate = await update//.....
      console.log("heheheh");
    }
  };
  if (!loginResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Đang tải thông tin người dùng...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <ImageBackground
          source={{
            uri: "https://th.bing.com/th/id/OIP.LFOfkRli5gE7UH17ixHtjwHaEK?rs=1&pid=ImgDetMain",
          }}
          style={{ width: "100%", height: BASE_UNIT * 0.5 }}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={ICON_MEDIUM} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileSetting");
              }}
            >
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={ICON_MEDIUM}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: "white",
          position: "absolute",
          top: BASE_UNIT * 0.4,
          borderRadius: 50,
          borderWidth: 5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loginResult.user.profilePic == "" ? (
          <View
            style={{
              backgroundColor: Colors.primary,
              height: 95,
              width: 95,
              borderRadius: 50,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: textLargeSize * 0.6, color: "white" }}>
                {getShortNameRegister(loginResult.user.fullName)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={{
            height: 95,
            width: 95,
            borderRadius: 50,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Image
            source={{uri: loginResult.user.profilePic}}
              style={{
                height: 95,
                width: 95,
                borderRadius: 50,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={{
          marginTop: BASE_UNIT * 0.16,
          fontSize: textMediumSize * 1.2,
          fontWeight: "500",
        }}
      >
        {loginResult.user.fullName}
      </Text>

      <View>
        {loginResult.user.backgroundImage === "" ? (
          <TouchableOpacity style={{ marginTop: BASE_UNIT * 0.003 }}>
            <Text style={{ color: Colors.primary }}>Chỉnh sửa tiểu sử</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ fontSize: textMediumSize * 0.9, color: Colors.gray }}>
            @loginResult.user.description
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={{
            textAlign: "center",
            fontSize: textMediumSize,
            fontWeight: "500",
          }}
        >
          Hôm nay {"bạn"} có gì vui?
        </Text>
        <Text
          style={{
            color: Colors.grey,
            textAlign: "center",
            fontSize: textMediumSize * 0.8,
            width: BASE_UNIT * 0.75,
          }}
        >
          Đây là nhật ký của bạn - Hãy làm đầy nhật ký với những dấu ấn cuộc đời
          và kỷ niệm đáng nhớ nhé!
        </Text>
        <TouchableOpacity
          style={{
            marginTop: BASE_UNIT * 0.1,
            backgroundColor: Colors.primary,
            width: BASE_UNIT * 0.5,
            height: BASE_UNIT * 0.1,
            borderRadius: BASE_UNIT * 0.05,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: textMediumSize,
              fontWeight: "500",
              color: "white",
            }}
          >
            Đăng lên nhật ký
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: BASE_UNIT * 0.02,
    paddingTop: BASE_UNIT * 0.02,
  },
  content: {
    marginTop: BASE_UNIT * 0.2,
    alignItems: "center",
  },
});
