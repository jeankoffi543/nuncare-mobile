import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  activeOpacity?: number;
};

const Pressable: React.FC<Props> = ({
  children,
  onPress,
  style,
  onLongPress,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={style}
      activeOpacity={activeOpacity}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Pressable;
