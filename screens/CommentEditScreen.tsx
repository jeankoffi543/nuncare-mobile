import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../types/types';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URLS } from '../constants/urls';
import Button from '../components/button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommentResource } from '../types/resources/CommentResource';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'CommentEditScreen'>;
type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CommentEditScreen'
  >;
};

const CommentEditScreen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<MapScreenRouteProp>();
  const { comment, id_publication, onSave } = route.params;
  const [comment_, setComment] = React.useState<CommentResource>(comment!);

  const handleSendComment = React.useCallback(async () => {
    try {
      await axios.put(
        `${API_URLS.PUBLICATIONS}/${id_publication}/comments/${comment?.id_comment}`,
        {
          content: comment_.content,
        },
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      );
      onSave(comment_);
      navigation.goBack();
    } catch (err) {
      console.error('Erreur lors du fetch:', err);
    }
  }, [comment?.id_comment, comment_, id_publication, navigation, onSave]);

  return (
    <View style={styles.container}>
      <View style={styles.commentMessageInputContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Rédigez un commentaire"
              autoFocus
              autoCorrect
              cursorColor={COLORS.primary}
              value={comment_.content}
              onChangeText={text => setComment({ ...comment_, content: text })}
            />
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <Button
            title="Annuler"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            titleStyle={styles.cancelButtonTitle}
          />
          <Button title="Actualiser" onPress={handleSendComment} />
        </View>
      </View>
    </View>
  );
};

export default CommentEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentMessageInputContainer: {
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  gradientBorder: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    padding: 2,
  },
  input: {
    fontFamily: 'Euclid Circular A Medium',
    fontSize: 14,
    width: '100%',
    color: COLORS.textSecondaryLight,
    flexShrink: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sendButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sendIcon: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 54,
    borderColor: COLORS.primary,
  },
  cancelButtonTitle: {
    color: COLORS.primary,
  },
});
