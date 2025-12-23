import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';
import { colors } from '../theme/colors';
import { MacroCard } from '../components/MacroCard';

export default function HomeScreen({ navigation }) {
  const { recipes } = useContext(RecipeContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.ingredientCount}>{item.ingredients.length} ingredients</Text>
      </View>
      <MacroCard {...item.totals} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes saved yet.</Text>
            <Text style={styles.emptySubText}>Start by adding a new recipe!</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  ingredientCount: {
    fontSize: 14,
    color: colors.subText,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: colors.white,
    fontSize: 32,
    marginTop: -4,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.subText,
    marginTop: 8,
  }
});