import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';
import Pressable from './pressable';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';

const ExtraHeader2: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.container1}>
          <Pressable onPress={() => navigation.popTo('MenuScreen')}>
            <Image
              source={IMAGES.TABLER_X}
              accessibilityLabel="Nuncare icon close"
            />
          </Pressable>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.LOGO}
            style={styles.logo}
            accessibilityLabel="Nuncare logo"
          />
        </View>
      </View>
    </View>
  );
};

export default ExtraHeader2;

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
    width: '60%',
  },
});
