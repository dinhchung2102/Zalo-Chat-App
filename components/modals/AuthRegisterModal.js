import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import React from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { languageState, modalAuthRegister } from "../../state/PrimaryState";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumPlus, textMediumSize } from "../../constants/fontSize";
import { phoneNumberRegister } from "../../state/RegisterState";
import { Colors } from "../../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { useTextLanguage } from "../../hooks/useTextLanguage";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { sendOTP } from "../../api/auth/register";

export default function AuthRegisterModal() {
  const [modalvisible, setModalVisible] = useRecoilState(modalAuthRegister);
  const navigation = useNavigation();

  const phoneNumber = useRecoilValue(phoneNumberRegister);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalvisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={styles.modalBackground}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={styles.viewModal}
          onStartShouldSetResponder={(e) => e.stopPropagation()}
        >
          <Text
            style={{
              fontSize: textMediumPlus,
              fontWeight: "500",
              paddingHorizontal: BASE_UNIT * 0.05,
              paddingTop: BASE_UNIT * 0.05,
            }}
          >
            {
              useTextLanguage({vietnamese: "Nhận mã xác thực qua số",english:"Receive verification code via"})
          }
          </Text>
          <Text
            style={{
              fontSize: textMediumPlus,
              fontWeight: "500",
              paddingHorizontal: BASE_UNIT * 0.05,
            }}
          >
            {phoneNumber}?
          </Text>
          <Text
            style={{
              fontSize: textMediumSize,
              marginTop: BASE_UNIT * 0.05,
              paddingHorizontal: BASE_UNIT * 0.05,
            }}
          >
            {
              useTextLanguage({vietnamese:"Zalo sẽ gửi mã xác thực cho bạn qua số điện thoại này" , english:"We will send you verification code via this phone number" })
            }
          </Text>

          <View
            style={{
              paddingTop: BASE_UNIT * 0.15,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log(formatPhoneNumber(phoneNumber));
                sendOTP(formatPhoneNumber(phoneNumber));
                navigation.navigate("SignUpOTP")
              }}
            >
              <Text
                style={{
                  fontSize: textMediumSize,
                  fontWeight: "400",
                  color: Colors.primary,
                }}
              >
                {useTextLanguage({vietnamese: "Tiếp tục", english:"Next"})
               }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false)}}
            >
              <Text style={{ fontSize: textMediumSize, fontWeight: "400" }}>
                {useTextLanguage({
                  vietnamese: "Đổi số khác",
                  english: "Change phone number",
                })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  viewModal: {
    width: BASE_UNIT * 0.8,
    height: BASE_UNIT * 0.7,
    borderRadius: "5%",
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    height: BASE_UNIT * 0.11,
  },
});
