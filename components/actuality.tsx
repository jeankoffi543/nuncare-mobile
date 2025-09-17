import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PublicationResource } from '../types/resources/PublicationResource';
import { COLORS } from '../constants/colors';
import { formatDate, timeAgo } from '../libs/utils';
import { IMAGES } from '../constants/images';

type Props = {
  data: PublicationResource | null;
};

const Actuality: React.FC<Props> = ({ data }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        {data?.media ? (
          <Image src={data?.media} style={styles.media} alt="Nuncare media" />
        ) : (
          <Image
            source={IMAGES.LOGO}
            style={styles.defaultMedia}
            alt="Nuncare media"
          />
        )}
        <View style={styles.description}>
          <Text style={styles.descriptionTitle} numberOfLines={1}>
            {data?.title}
          </Text>
          <Text style={styles.descriptionText} numberOfLines={1}>
            Publié le {formatDate(data?.created_at!)} ·{' '}
            {timeAgo(data?.created_at!)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Actuality;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  media: {
    width: 50,
    height: 50,
  },
  defaultMedia: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  description: {
    flex: 1,
    flexShrink: 1,
  },
  descriptionTitle: {
    fontFamily: 'Euclid Circular A Bold',
    fontSize: 16,
  },
  descriptionText: {
    fontFamily: 'Euclid Circular A Light',
    fontWeight: '300',
    fontSize: 9,
  },
});
