import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import Pressable from './pressable';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { IMAGES } from '../constants/images';
import { MedicineResource } from '../types/resources/MedicineResource';
import { MedicineScheme } from '../types/types';

type Props = {
  data: MedicineResource;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const MedicineDetail: React.FC<Props> = ({ data, setModalVisible }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          SystemNavigationBar.navigationShow();
          setModalVisible(false);
        }}
      >
        <Image
          source={IMAGES.TABLER_X}
          style={styles.close}
          accessibilityLabel="Nuncare icon close"
        />
      </Pressable>

      <View style={styles.titleContainer}>
        <Image
          source={IMAGES.ICON_MEDICINE_2}
          style={styles.defaultMedia}
          accessibilityLabel="Nuncare icon medicine 2"
        />
        <Text style={styles.title} numberOfLines={3}>
          {data.trade_name}
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        <View style={styles.titleContainerItems}>
          <Text style={styles.titleItemText} numberOfLines={1}>
            {data.price}
          </Text>
        </View>

        <View style={styles.titleContainerItems}>
          <Text style={styles.titleItemText} numberOfLines={1}>
            {`#${data.product_code}`}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.information}>Informations</Text>
        <Text style={styles.itemTitle}>
          DCI {'\n'}
          <Text style={styles.itemValue} numberOfLines={1}>
            {data.dci}
          </Text>
        </Text>

        <Text style={styles.itemTitle}>
          GROUPE {'\n'}
          <Text style={styles.itemValue} numberOfLines={1}>
            {data.therapeutic_group}
          </Text>
        </Text>

        <Text style={styles.itemTitle}>
          CODE {'\n'}
          <Text style={styles.itemValue} numberOfLines={1}>
            {data.product_code}
          </Text>
        </Text>

        {data.insurances.length > 0 &&
          data.scheme === MedicineScheme.INSURED && (
            <View style={styles.itemsContainer}>
              <Text style={styles.titleItemTextInsurance} numberOfLines={5}>
                {data.insurances.map(item => (
                  <View
                    key={item.id_insurance.toString()}
                    style={styles.insuranceContainer}
                  >
                    <Text>{item.name}</Text>
                  </View>
                ))}
              </Text>
            </View>
          )}
      </View>
    </View>
  );
};

export default MedicineDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 16,
  },
  close: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    fontSize: 28,
    color: COLORS.primaryDark,
    lineHeight: 30,
  },
  body: {
    marginTop: 20,
  },
  information: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 28,
    color: COLORS.primaryDark,
    lineHeight: 30,
  },
  itemTitle: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '900',
    fontSize: 17,
    color: COLORS.primaryDark,
    marginTop: 10,
  },
  itemValue: {
    fontFamily: 'Euclid Circular A Regular',
    fontWeight: '400',
    fontSize: 14,
    color: COLORS.primaryDark,
  },
  mapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapButton: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.primary,
  },
  defaultMedia: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  titleContainerItems: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  insuranceContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
  },
  titleItemText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
  },
  titleItemTextInsurance: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
  },
});
