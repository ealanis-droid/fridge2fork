import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useIngredients } from "@/app/context/IngredientsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDietary } from "@/app/context/DietaryContext";
import { MOCK_RECIPES, Recipe } from "@/app/data/mockData";

/**
 * Recipes Screen Component
 *
 * Main screen for displaying and filtering recipes based on:
 * - Selected ingredients from the home screen
 * - Dietary preferences
 *
 * Features:
 * - Recipe filtering based on ingredients and dietary restrictions
 * - Favorite/exclude recipe functionality
 * - Navigation to recipe details
 * - Persistent favorites and exclusions
 */
export default function Recipes() {
  // Local state for user preferences
  const [favorites, setFavorites] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Get route parameters and context data
  const { filterIngredients } = useLocalSearchParams();
  const { pantryIngredients } = useIngredients();
  const { excludedIngredients } = useDietary();

  /**
   * Load saved favorites and exclusions on mount
   */
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        const savedExcluded = await AsyncStorage.getItem("excluded");

        if (savedFavorites) {
          try {
            setFavorites(JSON.parse(savedFavorites));
          } catch (error) {
            console.error("Error parsing favorites JSON:", error);
            setFavorites([]);
          }
        }
        if (savedExcluded) {
          try {
            setExcluded(JSON.parse(savedExcluded));
          } catch (error) {
            console.error("Error parsing excluded JSON:", error);
            setExcluded([]);
          }
        }
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    };

    loadSavedState();
  }, []);

  /**
   * Save favorites and exclusions when they change
   */
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        await AsyncStorage.setItem("excluded", JSON.stringify(excluded));
      } catch (error) {
        console.error("Error saving state:", error);
      }
    };

    saveState();
  }, [favorites, excluded]);

  /**
   * Process filter ingredients from route params
   */
  useEffect(() => {
    if (filterIngredients) {
      try {
        // Parse the JSON string back into an array of ingredient objects
        const parsedIngredients = JSON.parse(filterIngredients as string);

        // Extract the names from the ingredient objects
        const ingredientNames = parsedIngredients.map((ing: { name: string }) =>
          ing.name.toLowerCase()
        );

        setSelectedIngredients(ingredientNames);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error processing filter ingredients:", error);
        setErrorMessage("Error processing ingredients");
        setSelectedIngredients([]);
      }
    } else {
      setErrorMessage("Please select ingredients to see recipes.");
      setSelectedIngredients([]);
    }
  }, [filterIngredients]);

  /**
   * Filter recipes based on selected ingredients and dietary preferences
   */
  const filterRecipesByIngredients = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return [];
    }

    return Object.values(MOCK_RECIPES).filter((recipe) => {
      // Check if recipe contains any excluded ingredients
      const hasExcludedIngredient = recipe.ingredients.some((ingredient) =>
        excludedIngredients.includes(ingredient)
      );
      if (hasExcludedIngredient) {
        return false;
      }

      // Check if recipe contains at least one of the selected ingredients
      const hasSelectedIngredient = recipe.ingredients.some((ingredient) =>
        selectedIngredients.includes(ingredient.toLowerCase())
      );

      return hasSelectedIngredient;
    });
  }, [selectedIngredients, excludedIngredients]);

  /**
   * Toggle a recipe's favorite status
   */
  const toggleFavorite = async (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fId) => fId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
  };

  /**
   * Toggle a recipe's excluded status
   */
  const toggleExcluded = async (id: string) => {
    const newExcluded = excluded.includes(id)
      ? excluded.filter((eId) => eId !== id)
      : [...excluded, id];

    setExcluded(newExcluded);
  };

  /**
   * Navigate to recipe detail screen
   */
  const handleRecipePress = (id: string) => {
    router.push({
      pathname: "/(recipe)/[id]",
      params: { id },
    });
  };

  /**
   * Render individual recipe card
   */
  const renderRecipe = ({ item }: { item: Recipe }) => {
    const isFavorite = favorites.includes(item.id);
    const isExcluded = excluded.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.recipeCard, isExcluded && styles.excludedRecipe]}
        onPress={() => handleRecipePress(item.id)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <Text style={styles.recipeDescription}>{item.description}</Text>
          <View style={styles.recipeMetadata}>
            <Text style={styles.metadataText}>🕒 {item.time}</Text>
            <Text style={styles.metadataText}>📊 {item.difficulty}</Text>
            <Text style={styles.metadataText}>👥 {item.servings} servings</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            style={styles.actionButton}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color={isFavorite ? "#e74c3c" : "#888"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleExcluded(item.id);
            }}
            style={styles.actionButton}
          >
            <FontAwesome
              name={isExcluded ? "ban" : "times-circle-o"}
              size={24}
              color={isExcluded ? "#e74c3c" : "#888"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <FlatList
        data={filterRecipesByIngredients}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  recipeList: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  excludedRecipe: {
    opacity: 0.5,
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  recipeInfo: {
    padding: 15,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeDescription: {
    color: "#666",
    marginBottom: 10,
  },
  recipeMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metadataText: {
    color: "#888",
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    marginLeft: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
