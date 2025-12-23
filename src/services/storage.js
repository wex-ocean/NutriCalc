import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPE_KEY = '@nutricalc_recipes';

export const saveRecipesToStorage = async (recipes) => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem(RECIPE_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save recipes", e);
  }
};

export const loadRecipesFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECIPE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load recipes", e);
    return [];
  }
};