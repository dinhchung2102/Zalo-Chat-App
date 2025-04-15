import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_UNIT } from "../../constants/screen";
import { textMediumSize } from "../../constants/fontSize";
import { Colors } from "../../styles/Colors";
import { getLoginResult } from "../../utils/asyncStorage";
import { getListConversation } from '../../api/chat/conversation'
import { getTimeAlong } from "../../utils/getTimeAlong";
import { useTextLanguage } from "../../hooks/useTextLanguage";

export default function MessageTitleRender() {
    const [dataConversations, setDataConversations] = useState([]);
    const locale = useTextLanguage({vietnamese: 'vi', english: 'en'})
  
    useEffect(() => {
      const fetchLoginResult = async () => {
        const result = await getLoginResult();  
  
        if (result && result.token) {  
          const conversations = await getListConversation(result.token); 
          setDataConversations(conversations.data);  
          console.log(conversations.data);
          
        }
      };
  
      fetchLoginResult();
    }, []);  // Chạy chỉ một lần khi component mount
  //Sample data test render item:
  return (
    <View style={styles.container}>
      {dataConversations.map((item) => {
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
                source={{ uri: item.avatar }}
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
                  {item.groupName || item.name}
                </Text>
                <Text style={{ color: Colors.grey }}>{getTimeAlong(item.updatedAt,locale)}</Text>
              </View>

              <Text
                style={{ fontSize: textMediumSize * 0.9, color: Colors.grey }}
              >
                {item.lastMessage || ""}
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
