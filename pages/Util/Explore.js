import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BASE_UNIT, textMediumSize } from '@styles/constants/screen';
import { Colors } from '@styles/Colors';
import NavigationBar from '@components/shared/NavigationBar';
import { useNavigation } from '@react-navigation/native';
const exploreItems = [
  {
    id: '1',
    title: 'Game',
    description: 'Chơi game trực tiếp trên Zalo',
    icon: 'game-controller-outline',
    screen: 'GameScreen',
  },
  {
    id: '2',
    title: 'Tiện ích',
    description: 'Khám phá các tiện ích hữu ích',
    icon: 'apps-outline',
    screen: 'UtilitiesScreen',
  },
  {
    id: '3',
    title: 'Mini App',
    description: 'Trải nghiệm các ứng dụng nhỏ',
    icon: 'cube-outline',
    screen: 'MiniAppScreen',
  },
  {
    id: '4',
    title: 'Tìm quanh đây',
    description: 'Kết nối với bạn bè xung quanh',
    icon: 'location-outline',
    screen: 'FindNearbyScreen',
  },
];

export default function Explore() {
  const navigation = useNavigation();
  const renderExploreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (item.screen) {
          navigation.navigate(item.screen);
        }
      }}
    >
      <Ionicons
        name={item.icon}
        size={BASE_UNIT * 0.08}
        color={Colors.primary}
        style={styles.itemIcon}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={BASE_UNIT * 0.06} color={Colors.grey} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Khám phá</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={BASE_UNIT * 0.07} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={exploreItems}
          renderItem={renderExploreItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.navigationBar}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.02,
  },
  headerTitle: {
    fontSize: textMediumSize * 1.2,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: BASE_UNIT * 0.03,
    paddingVertical: BASE_UNIT * 0.02,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: BASE_UNIT * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  itemIcon: {
    marginRight: BASE_UNIT * 0.03,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: textMediumSize,
    fontWeight: '500',
    color: Colors.black,
  },
  itemDescription: {
    fontSize: textMediumSize * 0.8,
    color: Colors.grey,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
