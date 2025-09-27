import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { PublicationResource } from '../types/resources/PublicationResource';
import Pressable from './pressable';
import { IMAGES } from '../constants/images';
import { COLORS } from '../constants/colors';
import { formatIterraction, timeAgo2 } from '../libs/utils';
import LinearGradient from 'react-native-linear-gradient';
import { CommentResource } from '../types/resources/CommentResource';
import axios from 'axios';
import { ResponseCollection, RootStackParamList } from '../types/types';
import { API_URLS } from '../constants/urls';
import CommentActionsSheet from './comment-action-sheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  data: PublicationResource | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Navigation = NativeStackNavigationProp<
  RootStackParamList,
  'CommentEditScreen'
>;

const Comment: React.FC<Props> = ({ data, setModalVisible }) => {
  const navigation = useNavigation<Navigation>();
  const [comments, setComments] = React.useState<CommentResource[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const onEndReachedCalledDuringMomentum = React.useRef(false);
  const [comment, setComment] = React.useState<string>('');
  const [selectedComment, setSelectedComment] =
    React.useState<CommentResource | null>(null);
  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const handleOnCancel = React.useCallback(() => {
    setSelectedComment(null);
    setShowActionSheet(false);
  }, []);

  const handleOnEdit = React.useCallback(() => {
    setShowActionSheet(false);
    navigation.navigate('CommentEditScreen', {
      id_publication: data?.id_publication,
      comment: selectedComment,
      onSave: (updatedComment: CommentResource) => {
        setComments(prev =>
          prev.map(c =>
            c.id_comment === updatedComment.id_comment ? updatedComment : c,
          ),
        );
      },
    });
  }, [data?.id_publication, navigation, selectedComment]);

  const handleOnDelete = React.useCallback(async () => {
    await axios.delete(
      `${API_URLS.PUBLICATIONS}/${data?.id_publication}/comments/${selectedComment?.id_comment}`,
      {
        headers: {
          Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
        },
      },
    );
    setComments(
      comments.filter(c => c.id_comment !== selectedComment?.id_comment),
    );
    setSelectedComment(null);
  }, [comments, data?.id_publication, selectedComment]);

  const handleOnLongPress = React.useCallback((comment_: CommentResource) => {
    setSelectedComment(comment_);
    setShowActionSheet(true);
  }, []);

  const fetchList = React.useCallback(
    async (pageNumber: number): Promise<void> => {
      setLoading(true);
      try {
        let queryParams = `?page=${pageNumber}`;

        const res = await axios.get<ResponseCollection<CommentResource>>(
          `${API_URLS.PUBLICATIONS}/${data?.id_publication}/comments${queryParams}`,
          {
            headers: {
              Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
            },
          },
        );
        console.log(res.data);
        const newItems = res.data.data;

        setComments(prev =>
          pageNumber === 1 ? newItems : [...prev, ...newItems],
        );
        setPage(pageNumber);

        if (res.data.meta.current_page >= res.data.meta.last_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error('Erreur lors du fetch:', err);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleMore = React.useCallback(() => {
    if (loading || !hasMore || onEndReachedCalledDuringMomentum.current) {
      return;
    }
    onEndReachedCalledDuringMomentum.current = true;
    fetchList(page + 1);
  }, [fetchList, hasMore, loading, page]);

  const renderFooter = React.useMemo(() => {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    } else {
      return (
        <View style={styles.footer}>
          {/* <Text style={styles.footerText}>Fin</Text> */}
        </View>
      );
    }
  }, [loading]);

  const handleSendComment = React.useCallback(async () => {
    try {
      const res = await axios.post(
        `${API_URLS.PUBLICATIONS}/${data?.id_publication}/comments`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      );
      setComment('');
      setComments(prev => [res.data.data, ...prev]);
    } catch (err) {
      console.error('Erreur lors du fetch:', err);
    }
  }, [comment, data?.id_publication]);

  React.useEffect(() => {
    (async () => await fetchList(1))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pressable
      style={styles.container}
      activeOpacity={1}
      onPress={() => showActionSheet && setShowActionSheet(false)}
    >
      <Pressable
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Image
          source={IMAGES.TABLER_X}
          style={styles.close}
          accessibilityLabel="Nuncare icon close"
        />
      </Pressable>

      <View style={styles.interractionContainer}>
        <View style={styles.interractionItems}>
          <Text style={styles.interractionText}>
            {formatIterraction(data?.likes_count!)}
          </Text>
          <Image
            source={IMAGES.ICON_HEART}
            accessibilityLabel="Nuncare icon heart"
          />
        </View>

        <Text style={styles.interractionText}>{`${formatIterraction(
          data?.shares_count!,
        )} partage${data?.shares_count === 1 ? '' : 's'}`}</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={item => item.id_comment.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.commentItem}
            onLongPress={() => handleOnLongPress(item)}
            activeOpacity={0.9}
          >
            <Image source={IMAGES.PROFILE} style={styles.commentAvatar} />
            <View style={styles.commentItemContainer}>
              <View style={styles.commentContent}>
                <Text style={styles.commentTextTitle}>
                  {item.subscriber.name}
                </Text>
                <Text style={styles.commentText}>{item.content}</Text>
              </View>
              <Text style={styles.commentDate}>
                {timeAgo2(item?.created_at!)}
              </Text>

              {showActionSheet &&
                selectedComment?.id_comment === item.id_comment && (
                  <Pressable
                    onPress={e => e.stopPropagation()}
                    activeOpacity={1}
                  >
                    <CommentActionsSheet
                      onEdit={handleOnEdit}
                      onDelete={handleOnDelete}
                      onCancel={handleOnCancel}
                    />
                  </Pressable>
                )}
            </View>
          </Pressable>
        )}
        onEndReached={handleMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={renderFooter}
        // Use onMomentumScrollBegin to reset the reference
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />

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
              value={comment}
              onChangeText={text => setComment(text)}
            />
          </View>
        </LinearGradient>
        <Pressable style={styles.sendButton} onPress={handleSendComment}>
          <Image
            source={IMAGES.ICON_SEND}
            accessibilityLabel="Nuncare icon send"
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  close: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  interractionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  interractionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  interractionText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  commentMessageInputContainer: {
    position: 'absolute',
    bottom: 0,
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
  footer: {
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 80,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
    fontSize: 20,
    color: COLORS.grayLight,
  },
  contentContainer: {
    gap: 10,
  },
  commentItemContainer: {
    gap: 5,
    width: '100%',
  },
  commentItem: {
    flexDirection: 'row',
    gap: 10,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grayLight,
    borderRadius: 50,
  },
  commentContent: {
    backgroundColor: COLORS.grayLight,
    padding: 10,
    borderRadius: 10,
    width: '80%',
    gap: 10,
  },
  commentTextTitle: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  commentText: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  commentDate: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 12,
    color: COLORS.primaryDark,
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
  commentCOntentFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
