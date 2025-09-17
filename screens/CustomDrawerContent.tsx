import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_HEIGHT } from '../constants/config';
import Pressable from '../components/pressable';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import Avatar from '../components/avatar';

const CustomDrawerContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.primary}>
        <View style={styles.containerTitle}>
          <Pressable>
            <Text style={styles.title}>Accueil</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.title}>Pharmacie de garde</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.title}>Médicament assuré</Text>
          </Pressable>
        </View>

        <View style={styles.containerTitle}>
          {/* Notification avec badge */}
          <Pressable onPress={() => {}} style={styles.containerTitleWithIcon}>
            <View style={styles.notificationWrapper}>
              <Image
                source={IMAGES.ICON_NOTIFICATION}
                alt="Nuncare icon notification"
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
            <Text style={styles.title}>Notifications</Text>
          </Pressable>

          {/* Localisation */}
          <Pressable onPress={() => {}} style={styles.containerTitleWithIcon}>
            <Image source={IMAGES.ICON_LOCATION} alt="Nuncare icon location" />
            <Text style={styles.title}>Localisation</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.profile}>
        <View style={styles.profileContent}>
          <Avatar />
          <Text numberOfLines={3} style={styles.titleProfile}>
            Koffi Konan Kan Jean Sylvain
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: SCREEN_HEIGHT * 0.16,
    justifyContent: 'space-between',
  },
  primary: {
    flex: 2,
    justifyContent: 'space-between',
  },
  containerTitle: {
    gap: 20,
  },

  title: {
    fontSize: 16,
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    letterSpacing: 0,
    color: COLORS.primaryDark,
  },
  titleProfile: {
    fontSize: 16,
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    letterSpacing: 0,
    color: COLORS.primaryDark,
    flex: 1,
    flexShrink: 1,
    textAlign: 'left',
  },
  containerTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profile: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'flex-end',
    paddingBottom: SCREEN_HEIGHT * 0.16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
