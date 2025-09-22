import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../constants/images';
import { SCREEN_WIDTH } from '../constants/config';
import Button from '../components/button';

type Props = {
  navigation: any;
};
const StartPageOneScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={IMAGES.MAP_FRAME}
          style={styles.map}
          accessibilityLabel="Nuncare Logo"
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Bienvenue sur NunCare {'\n'} Trouver une pharmacie de garde rapidement
        </Text>
        <Image
          source={IMAGES.PAGE_ONE_INDICATOR}
          accessibilityLabel="Nuncare Page one indicator"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Commencer"
          onPress={() => {
            navigation.navigate('StartPageTwoScreen');
          }}
        />
      </View>
    </View>
  );
};

export default StartPageOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    resizeMode: 'contain',
    width: SCREEN_WIDTH * 0.8,
  },
  descriptionContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    letterSpacing: -0.8,
    color: '#000000',
    textAlign: 'center',
  },
});
