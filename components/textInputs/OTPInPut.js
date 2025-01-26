import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumPlus } from "../../constants/fontSize";

export default function OTPInPut({otp, setOtp, onSubmit}) {
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    onSubmit(enteredOtp);
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={digit}
          onChangeText={(text) => handleOtpChange(text, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: BASE_UNIT*0.1,
  },
  input: {
    width: BASE_UNIT*0.1,
    height: BASE_UNIT*0.12,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    fontSize: textMediumPlus,
    fontWeight:'500',
    borderRadius: BASE_UNIT*0.02,
  },
});
