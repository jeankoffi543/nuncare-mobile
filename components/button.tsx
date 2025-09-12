import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
const Button: React.FC<Props> = ({ title, style, titleStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[defaultStyles.button, style]}>
        <Text style={[defaultStyles.title, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
// Styles par défaut
const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});
