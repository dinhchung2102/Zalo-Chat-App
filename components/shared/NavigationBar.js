import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BASE_UNIT } from '@styles/constants/screen';
import { Colors } from '@styles/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ICON_MEDIUM } from '@styles/constants/iconSize';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navigationState } from '@state/PrimaryState';
import { totalUnseenCountState } from '../../state/ChatState';

export default function NavigationBar() {
  const navigation = useNavigation();
  const [navState, setNavigationState] = useRecoilState(navigationState);
  const totalUnseenMessages = useRecoilValue(totalUnseenCountState);

  // Hàm thay đổi trạng thái navState
  const handleNavigation = (type) => {
    setNavigationState(type);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: BASE_UNIT * 0.15,
        width: BASE_UNIT,
        backgroundColor: 'white',
        borderTopColor: Colors.lightGrey,
        borderTopWidth: BASE_UNIT * 0.0025,
      }}
    >
      {/* Icon Message */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation('message');
          navigation.navigate('HomeMessage');
        }}
        style={{
          alignItems: 'center',
          height: '100%',
          width: BASE_UNIT * 0.15,
          justifyContent: 'center',
        }}
      >
        <View style={{ position: 'relative' }}>
          <Ionicons
            name={
              navState === 'message' ? 'chatbubble-ellipses-sharp' : 'chatbubble-ellipses-outline'
            }
            size={ICON_MEDIUM * 1.1}
            color={navState === 'message' ? Colors.primary : Colors.grey}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: totalUnseenMessages > 0 ? 'red' : 'transpirent',
              height: ICON_MEDIUM * 0.6,
              width: ICON_MEDIUM * 0.8,
              borderRadius: BASE_UNIT,
              alignItems: 'center',
              justifyContent: 'center',
              right: -ICON_MEDIUM * 0.2,
              top: 0,
            }}
          >
            <Text style={{ color: 'white', fontSize: BASE_UNIT * 0.025 }}>
              {totalUnseenMessages > 0 ? totalUnseenMessages : ''}
            </Text>
          </View>
        </View>
        {navState === 'message' ? (
          <View>
            <Text style={{ fontWeight: '700', color: Colors.primary }}>Tin nhắn</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Contact */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation('contact');
          navigation.navigate('Contact');
        }}
        style={{ alignItems: 'center' }}
      >
        <MaterialIcons
          name="contacts"
          size={ICON_MEDIUM * 1.1}
          color={navState === 'contact' ? Colors.primary : Colors.grey}
        />
        {navState === 'contact' ? (
          <View>
            <Text style={{ fontWeight: '700', color: Colors.primary }}>Liên hệ</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Explore */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation('explore');
          navigation.navigate('Explore');
        }}
        style={{ alignItems: 'center' }}
      >
        <Ionicons
          name={navState === 'explore' ? 'grid-sharp' : 'grid-outline'}
          size={ICON_MEDIUM * 1.1}
          color={navState === 'explore' ? Colors.primary : Colors.grey}
        />
        {navState === 'explore' ? (
          <View>
            <Text style={{ fontWeight: '700', color: Colors.primary }}>Khám phá</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Diary */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation('diary');
          navigation.navigate('Diary');
        }}
        style={{ alignItems: 'center' }}
      >
        <Ionicons
          name={navState === 'diary' ? 'time-sharp' : 'time-outline'}
          size={ICON_MEDIUM * 1.1}
          color={navState === 'diary' ? Colors.primary : Colors.grey}
        />
        {navState === 'diary' ? (
          <View>
            <Text style={{ fontWeight: '700', color: Colors.primary }}>Nhật ký</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Icon Profile */}
      <TouchableOpacity
        onPress={() => {
          handleNavigation('profile');
          navigation.navigate('Profile');
        }}
        style={{ alignItems: 'center' }}
      >
        <Ionicons
          name={navState === 'profile' ? 'person' : 'person-outline'}
          color={navState === 'profile' ? Colors.primary : Colors.grey}
          size={ICON_MEDIUM * 1.1}
        />
        {navState === 'profile' ? (
          <View>
            <Text style={{ fontWeight: '700', color: Colors.primary }}>Cá nhân</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
