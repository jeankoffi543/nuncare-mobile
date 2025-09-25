import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { MedicineResource } from '../types/resources/MedicineResource';
import MedicineDetail from './medicine-detail';
import { SCREEN_HEIGHT } from '../constants/config';
import { MedicineScheme } from '../types/types';

type Props = {
  data: MedicineResource;
};

const Medicine: React.FC<Props> = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          SystemNavigationBar.navigationHide();
          setModalVisible(true);
        }}
      >
        <View style={styles.container}>
          <Image
            source={IMAGES.ICON_MEDICINE_2}
            style={styles.defaultMedia}
            accessibilityLabel="Nuncare icon medicine 2"
          />
          <View style={styles.description}>
            <Text style={styles.descriptionTitle} numberOfLines={1}>
              {data.trade_name}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {data.therapeutic_group}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {data.price}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {data.dci}
            </Text>
          </View>
          {data.insurances.length > 0 &&
            data.scheme === MedicineScheme.INSURED && (
              <View style={styles.insurance}>
                <Text style={styles.insuranceText} numberOfLines={4}>
                  {data.insurances.map(item => (
                    <Text key={item.id_insurance.toString()}>{item.name}</Text>
                  ))}
                </Text>
              </View>
            )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <MedicineDetail data={data} setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Medicine;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  description: {
    flex: 1,
    flexShrink: 1,
  },
  descriptionTitle: {
    fontFamily: 'Euclid Circular A Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    color: COLORS.primaryDark,
  },
  descriptionText: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
  },
  descriptionText1: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
  },
  descriptionText2: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
    color: COLORS.primary,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gray, // Arrière-plan semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray_51,
    elevation: 5,
    paddingVertical: SCREEN_HEIGHT * 0.2,
    paddingHorizontal: 20,
  },
  insurance: {
    width: '20%',
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  insuranceText: {
    fontFamily: 'EncodeSansSemiExpanded-Bold',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0,
    color: COLORS.primary,
  },
});
