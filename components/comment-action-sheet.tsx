/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Pressable from './pressable';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

const CommentActionsSheet: React.FC<Props> = ({
  onEdit,
  onDelete,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.item} onPress={onEdit}>
        <Text style={styles.text}>✏️ Modifier</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onDelete}>
        <Text style={[styles.text, { color: 'red' }]}>🗑 Supprimer</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onCancel}>
        <Text style={styles.text}>❌ Annuler</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  item: {},
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CommentActionsSheet;
