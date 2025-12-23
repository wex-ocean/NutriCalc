import React, { createContext, useState, useEffect } from 'react';
import { loadRecipesFromStorage, saveRecipesToStorage } from '../services/storage';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadData = async () => {
      const storedRecipes = await loadRecipesFromStorage();
      setRecipes(storedRecipes);
      setLoading(false);
    };
    loadData();
  }, []);

  // Save whenever recipes change (skip initial load)
  useEffect(() => {
    if (!loading) {
      saveRecipesToStorage(recipes);
    }
  }, [recipes, loading]);

  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now().toString() };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, loading }}>
      {children}
    </RecipeContext.Provider>
  );
};