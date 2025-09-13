import { Image, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';
import Pressable from './pressable';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Pressable onPress={() => {}}>
          <Image source={IMAGES.ICON_MENU} alt="Nucare icon menu" />
        </Pressable>
        <Pressable onPress={() => {}} style={styles.logoContainer}>
          <Image source={IMAGES.LOGO} style={styles.logo} alt="Nucare logo" />
        </Pressable>
      </View>

      <View style={styles.container1}>
        {/* Notification avec badge */}
        <Pressable onPress={() => {}} style={styles.notificationWrapper}>
          <Image
            source={IMAGES.ICON_NOTIFICATION}
            alt="Nucare icon notification"
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => {}}>
          <Image source={IMAGES.ICON_LOCATION} alt="Nucare icon location" />
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
