import { Image, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ResponseJson, RootStackParamList } from '../types/types';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import Pressable from '../components/pressable';
import { formatIterraction } from '../libs/utils';
import { PublicationResource } from '../types/resources/PublicationResource';
import axios from 'axios';
import { API_URLS } from '../constants/urls';
import { GUARD } from '@env';
import Share from 'react-native-share';
import Comment from '../components/comment';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'ActualityScreen'>;

const ActualityScreen = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const route = useRoute<MapScreenRouteProp>();
  const { data } = route.params;
  const [actuality, setActuality] = React.useState<PublicationResource | null>(
    data,
  );
  const handlePublicationUpdate = async () => {
    try {
      const res = await axios.get<ResponseJson<PublicationResource>>(
        `${API_URLS.PUBLICATIONS}/${actuality?.id_publication}?scopes[]=with_count&scopes[]=with_user_like`,
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      );

      setActuality(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          likes_count: res.data.data.likes_count ?? prev.likes_count,
          user_liked: res.data.data.user_liked ?? prev.user_liked,
          comments_count: res.data.data.comments_count ?? prev.comments_count,
          views_count: res.data.data.views_count ?? prev.views_count,
          shares_count: res.data.data.shares_count ?? prev.shares_count,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .post(
        `${API_URLS.VIEWS}`,
        {
          id_publication: actuality?.id_publication,
        },
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeOnPress = async () => {
    try {
      const res = await axios.put<ResponseJson<PublicationResource | null>>(
        `${API_URLS.PUBLICATIONS}/${GUARD}/${actuality?.id_publication}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      );

      setActuality(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          likes_count: res.data.data?.likes_count ?? prev.likes_count,
          user_liked: res.data.data?.user_liked ?? prev.user_liked,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: actuality?.title,
        message: `${actuality?.title}\n\n${actuality?.content}\n\n👉 Voir plus : https://nuncare.com/publication/${actuality?.id_publication}`,
        url: actuality?.media ?? undefined,
        failOnCancel: false,
      };

      const result = await Share.open(shareOptions);
      if (result.success) {
        axios
          .post(
            `${API_URLS.SHARES}`,
            {
              id_publication: actuality?.id_publication,
            },
            {
              headers: {
                Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
              },
            },
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.log('Erreur partage:', err);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerMainContainer}>
            <View style={styles.headerContainer}>
              {actuality?.media ? (
                <Image
                  src={actuality?.media}
                  style={styles.headerContainerImage}
                  accessibilityLabel="Nuncare actuality media"
                />
              ) : (
                <Image
                  source={IMAGES.LOGO}
                  style={styles.headerContainerImage}
                  accessibilityLabel="Nuncare actuality media"
                />
              )}

              <View style={styles.headerLogoTitleContainer}>
                <Image
                  source={IMAGES.LOGO}
                  style={styles.headerContainerLogo}
                  accessibilityLabel="Nuncare logo"
                />
                <Text style={styles.headerContainerText} numberOfLines={3}>
                  {actuality?.title}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyMainContainer}>
            <View style={styles.createdContainer}>
              <Text style={styles.createdText}>
                Publié le{' '}
                {actuality?.created_at
                  ? format(
                      new Date(actuality?.created_at!),
                      'EEE. dd MMMM yyyy',
                      {
                        locale: fr,
                      },
                    )
                  : '...'}
              </Text>
              <Text style={styles.createdText2}>Par Nuncare</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.descriptionTitle} numberOfLines={1}>
                {actuality?.title}
              </Text>
              <Text style={styles.description}>{actuality?.content}</Text>
            </View>
          </View>

          <View style={styles.interractionContainer}>
            <View style={styles.interractionItems}>
              <Text style={styles.interractionText}>
                {formatIterraction(actuality?.likes_count!)}
              </Text>
              <Image
                source={IMAGES.ICON_HEART}
                accessibilityLabel="Nuncare icon heart"
              />
            </View>

            <Text style={styles.interractionText}>
              {`${formatIterraction(actuality?.views_count!)} vue${
                actuality?.views_count === 1 ? '' : 's'
              }`}
            </Text>

            <Text style={styles.interractionText}>{`${formatIterraction(
              actuality?.comments_count!,
            )} commentaire${actuality?.comments_count === 1 ? '' : 's'}`}</Text>

            <Text style={styles.interractionText}>{`${formatIterraction(
              actuality?.shares_count!,
            )} partage${actuality?.shares_count === 1 ? '' : 's'}`}</Text>
          </View>

          <View style={styles.interractionContainer}>
            <Pressable
              style={styles.interractionItems}
              onPress={handleLikeOnPress}
            >
              <Image
                source={
                  actuality?.user_liked ? IMAGES.ICON_LIKED : IMAGES.ICON_LIKE
                }
                accessibilityLabel="Nuncare icon like"
              />
              <Text style={styles.interractionText}>J'aime</Text>
            </Pressable>

            <Pressable
              style={styles.interractionItems}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={IMAGES.ICON_COMMENT}
                accessibilityLabel="Nuncare icon comment"
              />
              <Text style={styles.interractionText}>Commenter</Text>
            </Pressable>

            <Pressable style={styles.interractionItems} onPress={handleShare}>
              <Image
                source={IMAGES.ICON_SHARE}
                accessibilityLabel="Nuncare icon share"
              />
              <Text style={styles.interractionText}>Partager</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => {
          handlePublicationUpdate()
            .then(() => {
              setModalVisible(false);
            })
            .catch(err => console.log(err));
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Comment data={actuality} setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ActualityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  headerMainContainer: {
    height: 300,
    paddingRight: 20,
    backgroundColor: COLORS.primary,
  },
  bodyMainContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  body: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  description: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  headerContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  headerContainerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainerTextContainer: {
    gap: 10,
    alignItems: 'flex-start',
  },
  headerContainerLogo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerLogoTitleContainer: {
    flexShrink: 1,
  },
  headerContainerText: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 25,
  },
  headerImageContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },

  createdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdText: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  createdText2: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  interractionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: COLORS.gray_20,
  },
  modalOverlay: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    elevation: 5,
  },
});
