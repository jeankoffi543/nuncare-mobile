/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import Pressable from './pressable';
import CheckBox from '@react-native-community/checkbox';

type Option = {
  label: string;
  value: string;
  count: number;
};

const AccordionItem = ({
  title,
  value,
  icon,
  options,
}: {
  title: string;
  value: string;
  icon: any;
  options: Option[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleOption = (val: string) => {
    if (selected.includes(val)) {
      setSelected(selected.filter(item => item !== val));
    } else {
      setSelected([...selected, val]);
    }
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 45], // hauteur dynamique
  });

  return (
    <View>
      <Pressable onPress={toggleExpand}>
        <View style={styles.selectioncontainer}>
          <Image source={icon} style={styles.filterIcon} />
          <View style={styles.selectionTextContainer}>
            <Text style={styles.selectionTitle}>{title}</Text>
            <Text style={styles.selectedText}>{value}</Text>
          </View>
          <Image
            source={IMAGES.ICON_CHEVRON}
            style={[
              styles.filterIcon,
              expanded && { transform: [{ rotate: '180deg' }] },
            ]}
          />
        </View>
      </Pressable>

      {/* contenu déroulant */}
      <Animated.View style={{ overflow: 'scroll', height }}>
        {options.map((opt, idx) => (
          <Pressable
            key={idx}
            style={styles.optionItem}
            onPress={() => toggleOption(opt.value)}
          >
            {/* ✅ Checkbox */}
            <CheckBox
              value={selected.includes(opt.value)}
              onValueChange={() => toggleOption(opt.value)}
              tintColors={{ true: COLORS.primary, false: COLORS.grayLight }}
            />
            {/* Label */}
            <Text style={styles.optionText}>{opt.label}</Text>
            {/* Compteur */}
            <Text style={styles.countText}>{opt.count}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
};

const Search = ({ ...props }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          <Image source={IMAGES.ICON_SEARCH} style={styles.icon} />
          <TextInput {...props} style={styles.input} />
          {/* <Pressable
            style={styles.filterContainer}
            onPress={() => setModalVisible(true)}
          >
            <Image source={IMAGES.ICON_FILTER} />
          </Pressable> */}
        </View>
      </LinearGradient>

      {/* Modal filtre */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filtre</Text>
              <View style={styles.divider} />

              <AccordionItem
                title="Région"
                value="Lagune"
                icon={IMAGES.ICON_REGION}
                options={[
                  { label: 'Lagune', value: 'lagune', count: 12 },
                  { label: 'Bas-Sassandra', value: 'bas', count: 7 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                  { label: 'Comoé', value: 'comoe', count: 4 },
                ]}
              />
              <AccordionItem
                title="Ville"
                value="Abidjan"
                icon={IMAGES.ICON_CITY}
                options={[
                  { label: 'Abidjan', value: 'abidjan', count: 25 },
                  { label: 'Bouaké', value: 'bouake', count: 13 },
                  { label: 'San Pedro', value: 'sanpedro', count: 8 },
                ]}
              />
              <AccordionItem
                title="Secteur"
                value="Yopougon"
                icon={IMAGES.ICON_SECTOR}
                options={[
                  { label: 'Yopougon', value: 'yopougon', count: 10 },
                  { label: 'Cocody', value: 'cocody', count: 6 },
                  { label: 'Plateau', value: 'plateau', count: 5 },
                ]}
              />

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>Appliquer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  gradientBorder: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding: 2,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    fontFamily: 'Euclid Circular A Medium',
    fontSize: 14,
    width: '100%',
    color: COLORS.textSecondaryLight,
    flexShrink: 1,
  },
  filterContainer: {
    marginLeft: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.primaryLight,
    padding: 20,
    borderRadius: 12,
  },
  modalContentContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 10,
    fontFamily: 'Euclid Circular A Regular',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.primaryDark,
    marginVertical: 10,
  },
  selectioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectionTextContainer: {
    flex: 1,
    flexShrink: 1,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  selectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.primaryDark,
    fontFamily: 'Euclid Circular A Regular',
  },
  selectedText: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.primaryDark,
    fontFamily: 'Euclid Circular A Regular',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // pour coller le compteur à droite
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.grayLight,
  },
  optionText: {
    flex: 1,
    fontSize: 12,
    marginLeft: 6,
    color: COLORS.primaryDark,
    fontFamily: 'Euclid Circular A Regular',
  },
  countText: {
    fontSize: 12,
    color: COLORS.grayLight,
    fontFamily: 'Euclid Circular A Medium',
  },
});
