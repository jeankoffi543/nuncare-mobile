import { View, StyleSheet } from 'react-native';
import React from 'react';

type Props = {
  navigation: any;
};
const DrawerContent: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <></>
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#28303F',
  },
});

export default DrawerContent;
