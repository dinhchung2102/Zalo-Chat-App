import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { Colors } from "../../styles/Colors";

export default function MessageTitleRender() {
  //Sample data test render item:
  const testData = [
    {
      _id: 1,
      name: "Cloud của tôi",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
    {
      _id: 2,
      name: "Nguyễn Văn A",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
    {
      _id: 3,
      name: "Nguyễn Văn B",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
    {
      _id: 4,
      name: "Lê Văn C",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
    {
      _id: 5,
      name: "Đặng Văn D",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
    {
      _id: 6,
      name: "Lê Khánh F",
      avt: "https://i.imgur.com/1L0lWDZ.png",
      text: "Bạn: helloworld",
    },
  ];
  return (
    <View style={styles.container}>
      {testData.map((item) => {
        return (
          <TouchableOpacity
            key={item._id}
            style={{
              paddingBottom: BASE_UNIT * 0.05,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                height: BASE_UNIT * 0.15,
                width: BASE_UNIT * 0.15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: BASE_UNIT * 0.15,
              }}
            >
              <Image
                source={{ uri: item.avt }}
                style={{ width: BASE_UNIT * 0.1, height: BASE_UNIT * 0.1 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                height: "100%",
                paddingLeft: BASE_UNIT * 0.03,
                paddingVertical: BASE_UNIT * 0.01,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: textMediumSize * 1.1,
                    marginBottom: BASE_UNIT * 0.01,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: Colors.grey }}>1 giờ</Text>
              </View>

              <Text
                style={{ fontSize: textMediumSize * 0.9, color: Colors.grey }}
              >
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
