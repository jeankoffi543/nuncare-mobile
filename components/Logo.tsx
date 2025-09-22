import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image src={IMAGES.LOGO} style={styles.logo} accessibilityLabel="logo" />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
