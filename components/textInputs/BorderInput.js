import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { textMediumSize } from "../../constants/fontSize";
import { BASE_UNIT } from "../../constants/screen";

export default function BorderInput({ placeholder, borderColor, onChangeText }) {
  const [isFocused, setIsFocused] = useState(true)
  return (
    <View
      style={{
        borderWidth: 1,
        width: "100%",
        paddingHorizontal: "2%",
        borderColor: isFocused ? borderColor : 'grey',
        borderRadius: BASE_UNIT * 0.024,
      }}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{ fontSize: textMediumSize }}
        autoFocus={true}
        onFocus={()=>{setIsFocused(true)}}
        onBlur={()=>{setIsFocused(false)}}
      />
    </View>
  );
}
