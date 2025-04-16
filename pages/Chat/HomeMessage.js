import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../../components/headers/SearchHeader";
import MessageTitleRender from "../../components/renderItems/MessageTitleRender";
import { BASE_UNIT } from "../../constants/screen";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Colors } from "../../styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getConversationsThunk } from "../../redux/conversations/conversationThunk";

export default function HomeMessage() {
  const dispatch = useDispatch();
  const { conversations, isLoading, error } = useSelector((state) => state.conversations);

  useEffect(() => {
    dispatch(getConversationsThunk());

    // console.log("Conversations: ", conversations);

  }, [dispatch]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <SearchHeader
        linearPrimary={true}
        iconColor={"white"}
        textColor="white"
        iconName={'qr-code-outline'}
        iconName2={'add'}
      />
      <View
        style={{
          paddingHorizontal: BASE_UNIT * 0.05,
          paddingVertical: BASE_UNIT * 0.03,
        }}
      >
        <FlatList
          data={conversations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <MessageTitleRender item={item} />}
          refreshing={isLoading}
          onRefresh={() => dispatch(getConversationsThunk())}
          ListEmptyComponent={
            !isLoading && !error && <View><Text>Không có cuộc trò chuyện</Text></View>
          }
          ListFooterComponent={
            isLoading && <View><Text>Đang tải...</Text></View>
          }
        />
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
