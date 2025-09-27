import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import Pressable from './pressable';
import { useNavigation } from '@react-navigation/native';

const CommentEditHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backIconCantainer}
      >
        <Image source={IMAGES.ICON_CHEVRON_LEFT} style={styles.backIcon} />
      </Pressable>
      <Text style={styles.headerText}>Modifier</Text>
    </View>
  );
};

export default CommentEditHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryDark,
    paddingVertical: 5,
    height: 50,
    marginTop: StatusBar.currentHeight,
  },
  headerText: {
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  backIcon: {
    width: '100%',
    height: '100%',
  },
  backIconCantainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 10,
  },
});
