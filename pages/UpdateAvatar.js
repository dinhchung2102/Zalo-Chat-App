import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderText from "../components/texts/HeaderText";
import { BASE_UNIT } from "../constants/screen";
import NoteText from "../components/texts/NoteText";
import { useRecoilValue } from "recoil";
import { nameRegister } from "../state/RegisterState";
import { getShortNameRegister } from "../utils/getShortName";
import { Colors } from "../styles/Colors";
import { textMediumPlus } from "../constants/fontSize";
import LargeButton from "../components/buttons/LargeButton";
import ConfirmNoAvt from "../components/modals/ConfirmNoAvt";
import SelectPhotoModal from "../components/modals/SelectPhotoModal";
import * as ImagePicker from "expo-image-picker";

export default function UpdateAvatar() {
  const nameRegisterState = useRecoilValue(nameRegister);

  const [modalSkipVisible, setModalSkipVisible] = useState(false);
  const [modalSelectPhotoVisible, setSelectPhotoVisible] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderText
          text={"Cập nhật ảnh đại diện"}
          style={{ marginBottom: BASE_UNIT * 0.03 }}
        />
        <NoteText text={"Đặt ảnh đại diện để mọi người dễ nhận ra bạn"} />
      </View>

      {image ? (
        <Image source={{ uri: image }} style={styles.imageDefault} />
      ) : (
        <View style={styles.imageDefault}>
          <Text style={styles.text}>
            {getShortNameRegister(nameRegisterState)}
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <LargeButton
          text={"Cập nhật"}
          color={Colors.primary}
          disabled={false}
          textColor={"white"}
          onPress={() => {
            setSelectPhotoVisible(true);
          }}
        />
        <LargeButton
          text={"Bỏ qua"}
          color={"white"}
          disabled={false}
          onPress={() => setModalSkipVisible(true)}
        />
      </View>

      <ConfirmNoAvt
        visible={modalSkipVisible}
        title="Bạn chưa có ảnh đại diện"
        text="Trải nghiệm một vài tính năng có thể sẽ bị ảnh hưởng. Vẫn bỏ qua bước này?"
        onSkip={() => setModalSkipVisible(false)}
        onAddPhoto={() => {
          console.log("Thêm ảnh");
          setModalSkipVisible(false);
        }}
      />

      <SelectPhotoModal
        visible={modalSelectPhotoVisible}
        onClose={() => setSelectPhotoVisible(false)}
        onPickPhoto={() => {
          console.log("Chọn ảnh trên máy");
          setSelectPhotoVisible(false);
          pickImage();
        }}
        onTakePhoto={() => {
          console.log("Chụp ảnh");
          setSelectPhotoVisible(false);
          takePhoto();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: BASE_UNIT * 0.05,
    alignItems: "center",
  },
  header: {
    marginTop: BASE_UNIT * 0.1,
    alignItems: "center",
  },
  imageDefault: {
    backgroundColor: Colors.primary,
    width: BASE_UNIT * 0.3,
    height: BASE_UNIT * 0.3,
    borderRadius: BASE_UNIT * 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: BASE_UNIT * 0.1,
  },
  text: {
    color: "white",
    fontSize: textMediumPlus * 1.5,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: BASE_UNIT * 0.1,
  },
  camera: {
    width: BASE_UNIT,
    height: BASE_UNIT * 2.2,
    position: "absolute",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    height: BASE_UNIT,
  },
  button: {
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
