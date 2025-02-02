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
import { languageState, modalAuthRegister, modalValidatorPhoneNumber } from "../../state/PrimaryState";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumPlus, textMediumSize } from "../../constants/fontSize";
import { phoneNumberRegister } from "../../state/RegisterState";
import { Colors } from "../../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import { useTextLanguage } from "../../hooks/useTextLanguage";

export default function PhoneNumberValidatorModal() {
  const [modalvisible, setModalVisible] = useRecoilState(modalValidatorPhoneNumber);
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
              useTextLanguage({vietnamese: "Số điện thoại không hợp lệ",english:"Receive verification code via"})
          }
          </Text>
          <Text
            style={{
              fontSize: textMediumSize,
              marginTop: BASE_UNIT * 0.05,
              paddingHorizontal: BASE_UNIT * 0.05,
            }}
          >
            {
              useTextLanguage({vietnamese:`Vui lòng nhập đúng định dạng số điện thoại`, english:"We will send you verification code via this phone number" })
            }
          </Text>

          <View
            style={{
              paddingTop: BASE_UNIT * 0.05,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
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
    height: BASE_UNIT * 0.43,
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
