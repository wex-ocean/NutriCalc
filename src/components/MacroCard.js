import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const MacroCard = ({ calories, protein, carbs, fats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.value}>{Math.round(calories)}</Text>
        <Text style={styles.label}>Kcal</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{Math.round(protein)}g</Text>
        <Text style={styles.label}>Protein</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{Math.round(carbs)}g</Text>
        <Text style={styles.label}>Carbs</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{Math.round(fats)}g</Text>
        <Text style={styles.label}>Fat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  item: {
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  label: {
    fontSize: 12,
    color: colors.subText,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    height: '100%',
  }
});