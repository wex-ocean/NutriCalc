import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  ActivityIndicator, StyleSheet, Alert, SafeAreaView 
} from 'react-native';
import { RecipeContext } from '../context/RecipeContext';
import { fetchNutritionData } from '../services/api';
import { colors } from '../theme/colors';
import { MacroCard } from '../components/MacroCard';

export default function AddRecipeScreen({ navigation }) {
  const { addRecipe } = useContext(RecipeContext);
  
  const [recipeName, setRecipeName] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

  const handleAddIngredient = async () => {
    if (!ingredientInput.trim()) return;

    setLoading(true);
    try {
      // Expecting natural language inputs like "100g chicken"
      const data = await fetchNutritionData(ingredientInput);
      
      const newIngredients = [...ingredients, { ...data, id: Date.now() }];
      setIngredients(newIngredients);
      recalculateTotals(newIngredients);
      setIngredientInput('');
    } catch (error) {
      Alert.alert("Error", "Could not fetch nutrition data. Please check input or API keys.");
    } finally {
      setLoading(false);
    }
  };

  const removeIngredient = (id) => {
    const newIngredients = ingredients.filter(i => i.id !== id);
    setIngredients(newIngredients);
    recalculateTotals(newIngredients);
  };

  const recalculateTotals = (list) => {
    const newTotals = list.reduce((acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: acc.protein + curr.protein,
      carbs: acc.carbs + curr.carbs,
      fats: acc.fats + curr.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    setTotals(newTotals);
  };

  const handleSaveRecipe = () => {
    if (!recipeName.trim() || ingredients.length === 0) {
      Alert.alert("Incomplete", "Please add a name and at least one ingredient.");
      return;
    }

    addRecipe({
      name: recipeName,
      ingredients,
      totals
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Recipe Name */}
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Morning Smoothie"
          value={recipeName}
          onChangeText={setRecipeName}
        />

        {/* Add Ingredient Section */}
        <Text style={styles.label}>Add Ingredient (Qty + Name)</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="e.g. 1 banana"
            value={ingredientInput}
            onChangeText={setIngredientInput}
            onSubmitEditing={handleAddIngredient}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddIngredient}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.addButtonText}>Add</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Current Totals */}
        <Text style={styles.sectionHeader}>Total Macros</Text>
        <MacroCard {...totals} />

        {/* Ingredients List */}
        <Text style={styles.sectionHeader}>Ingredients ({ingredients.length})</Text>
        {ingredients.map((item, index) => (
          <View key={item.id} style={styles.ingredientRow}>
            <View style={{flex: 1}}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientDetails}>
                {Math.round(item.calories)} kcal • {Math.round(item.protein)}g P • {item.quantity || '1 serving'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeIngredient(item.id)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 100 }} /> 
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: colors.subText,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: colors.text,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    textTransform: 'capitalize',
  },
  ingredientDetails: {
    fontSize: 12,
    color: colors.subText,
    marginTop: 2,
  },
  removeText: {
    color: colors.error,
    fontSize: 18,
    padding: 5,
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});