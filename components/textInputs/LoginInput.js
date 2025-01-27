import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, forwardRef } from "react";
import { textMediumPlus, textMediumSize } from "../../constants/fontSize";
import { BASE_UNIT } from "../../constants/screen";
import { Colors } from "../../styles/Colors";
import { useRecoilValue } from "recoil";
import { languageState } from "../../state/PrimaryState";

const LoginInput = forwardRef(
  (
    { placeholder, value, onChangeText, phoneNumber, password, autoFocus },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const selectedLanguage = useRecoilValue(languageState);
    const [securePassword, setSecurePassword] = useState(true);

    const [btnShowPwd, setBtnShowPwd] = useState(
      selectedLanguage === "vie" ? "HIỆN" : "SHOW"
    );

    const togglePasswordVisibility = () => {
      setSecurePassword(!securePassword);
      setBtnShowPwd(
        selectedLanguage === "vie"
          ? securePassword
            ? "ẨN"
            : "HIỆN"
          : securePassword
          ? "HIDE"
          : "SHOW"
      );
    };

    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={securePassword}
          ref={ref}
          autoFocus={autoFocus}
          style={{
            fontSize: textMediumPlus,
            borderBottomWidth: 1,
            flex: 1,
            borderBottomColor: focus ? Colors.primary : "#f0f0f0",
            marginTop: BASE_UNIT * 0.01,
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType={phoneNumber ? "phone-pad" : "ascii-capable"}
        />
        {password && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.textButton}>{btnShowPwd}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default LoginInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: textMediumSize,
    color: Colors.grey,
    fontWeight: "500",
  },
});
