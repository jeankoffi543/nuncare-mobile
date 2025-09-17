import { Image, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';
import Pressable from './pressable';

type Props = {
  navigation: any;
};
const Header: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image source={IMAGES.ICON_MENU} alt="Nuncare icon menu" />
        </Pressable>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={styles.logoContainer}
        >
          <Image source={IMAGES.LOGO} style={styles.logo} alt="Nuncare logo" />
        </Pressable>
      </View>

      <View style={styles.container1}>
        {/* Notification avec badge */}
        <Pressable onPress={() => {}} style={styles.notificationWrapper}>
          <Image
            source={IMAGES.ICON_NOTIFICATION}
            alt="Nuncare icon notification"
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => {}}>
          <Image source={IMAGES.ICON_LOCATION} alt="Nuncare icon location" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    elevation: 5,
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  logoContainer: {
    width: '50%',
  },
  notificationWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
