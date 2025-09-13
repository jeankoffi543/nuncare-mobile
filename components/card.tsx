import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
const Card: React.FC<Props> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    boxShadow: '0px 0px 10px 0px ' + COLORS.boxShadow,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
