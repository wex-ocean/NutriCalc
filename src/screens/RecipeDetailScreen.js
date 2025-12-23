import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';
import { MacroCard } from '../components/MacroCard';
import { colors } from '../theme/colors';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { deleteRecipe } = useContext(RecipeContext);

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            deleteRecipe(recipe.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{recipe.name}</Text>
      
      <Text style={styles.subtitle}>Nutrition Totals</Text>
      <MacroCard {...recipe.totals} />

      <Text style={styles.subtitle}>Ingredients List</Text>
      <View style={styles.listContainer}>
        {recipe.ingredients.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rowText}>• {item.name}</Text>
            <Text style={styles.rowQty}>{item.quantity}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  rowText: {
    fontSize: 16,
    color: colors.text,
    textTransform: 'capitalize',
  },
  rowQty: {
    fontSize: 16,
    color: colors.subText,
  },
  deleteBtn: {
    marginTop: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.error,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: colors.error,
    fontWeight: 'bold',
    fontSize: 16,
  }
});