import { View, TextInput } from "react-native";
import React, { useState } from "react";
import CountrySelect from "../selects/CountrySelect";
import { Colors } from "../../styles/Colors";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: BASE_UNIT * 0.03,
        alignItems: "center",
        flexDirection: "row",
        height: BASE_UNIT * 0.13,
      }}
    >
      <CountrySelect />
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{
          flex: 1,
          marginLeft: BASE_UNIT * 0.03,
          fontSize: textMediumSize,
        }}
      />
    </View>
  );
}
