import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';
import { COLORS } from '../constants/colors';

const Avatar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.PROFILE}
        alt="Nuncare profile"
        style={styles.image}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});
