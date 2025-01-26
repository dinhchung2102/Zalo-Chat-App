import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { languageState } from "../../state/PrimaryState";
import { BASE_UNIT, introData } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import Swiper from "react-native-swiper";

export default function IntroSwiper() {
  const selectedLanguage = useRecoilValue(languageState);

  const dataForSelectedLanguage = introData[selectedLanguage] || introData.eng;

  return (
    <View style={styles.container}>
      <Swiper
        loop={true}
        showsPagination={true}
        paginationStyle={{ bottom: BASE_UNIT * 0.01 }}
      >
        {dataForSelectedLanguage.map((item) => {
          return (
            <View key={item._id}>
              <Image
                source={item.image}
                style={{ width: BASE_UNIT, height: BASE_UNIT * 1.2 }}
              />
              <Text
                style={{
                  fontSize: textMediumSize,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: BASE_UNIT * 0.01,
                  paddingHorizontal: BASE_UNIT * 0.01,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: textMediumSize - 1,
                  color: "#c4c4c4",
                  textAlign: "center",
                  paddingHorizontal: BASE_UNIT * 0.01,
                }}
              >
                {item.description}
              </Text>
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: BASE_UNIT * 1.65,
  },
});
