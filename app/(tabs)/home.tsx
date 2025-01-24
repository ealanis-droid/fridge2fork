import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useIngredients } from "@/app/context/IngredientsContext";
import { useRouter } from "expo-router";

/**
 * Mock ingredient data for search suggestions
 * Organized by category for easier management
 */
const MOCK_INGREDIENTS = {
  fruits: ["Apple", "Banana", "Orange", "Strawberry"],
  vegetables: ["Carrot", "Tomato", "Lettuce", "Onion"],
  dairy: ["Milk", "Cheese", "Yogurt", "Butter"],
  meats: ["Chicken", "Beef", "Pork", "Fish"],
};

/**
 * Home Screen Component
 *
 * Main screen where users can:
 * - Search for ingredients
 * - Select ingredients from their pantry
 * - Toggle all ingredients at once
 * - Navigate to recipe suggestions based on selected ingredients
 */
export default function Home() {
  // State for search functionality
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Access ingredients context for pantry management
  const { pantryIngredients, activeIngredients, setActiveIngredients } =
    useIngredients();
  const router = useRouter();

  /**
   * Handles ingredient search and updates suggestions
   * @param text - Search input text
   */
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      // Flatten all ingredients and filter based on search text
      const allIngredients = Object.values(MOCK_INGREDIENTS).flat();
      const filtered = allIngredients.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  /**
   * Toggles an ingredient's active state
   * @param ingredient - The ingredient to toggle
   */
  const toggleIngredient = (ingredient: (typeof pantryIngredients)[0]) => {
    setActiveIngredients((prev) => {
      const isActive = prev.some((item) => item.id === ingredient.id);
      if (isActive) {
        return prev.filter((item) => item.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  /**
   * Toggles all ingredients between active and inactive states
   */
  const toggleAllIngredients = () => {
    if (activeIngredients.length === pantryIngredients.length) {
      setActiveIngredients([]);
    } else {
      setActiveIngredients([...pantryIngredients]);
    }
  };

  /**
   * Navigates to the recipes screen with selected ingredients
   */
  const suggestRecipe = () => {
    router.push({
      pathname: "/(tabs)/recipes",
      params: {
        filterIngredients: JSON.stringify(activeIngredients),
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ingredients..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#A9A9A9"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          {/* Search Suggestions */}
          {searchText.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchText("");
                    setSuggestions([]);
                    Keyboard.dismiss();
                  }}
                >
                  <Text>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Ingredient Selection */}
        <View style={styles.ingredientList}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Available Ingredients</Text>
            <TouchableOpacity
              style={styles.toggleAllButton}
              onPress={toggleAllIngredients}
            >
              <Text style={styles.toggleAllText}>
                {activeIngredients.length === pantryIngredients.length
                  ? "Unselect All"
                  : "Select All"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ingredientsContainer}>
            {pantryIngredients.map((ingredient) => {
              const isActive = activeIngredients.some(
                (item) => item.id === ingredient.id
              );
              return (
                <TouchableOpacity
                  key={ingredient.id}
                  style={[
                    styles.ingredientItem,
                    !isActive && styles.inactiveIngredient,
                  ]}
                  onPress={() => toggleIngredient(ingredient)}
                >
                  <Text style={styles.ingredientText}>{ingredient.name}</Text>
                  <FontAwesome
                    name={isActive ? "check-circle" : "circle-o"}
                    size={24}
                    color={isActive ? "#4A90E2" : "#888"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.suggestButton}
            onPress={suggestRecipe}
          >
            <Text style={styles.suggestButtonText}>Suggest Recipe</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  searchContainer: {
    position: "relative",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 15,
    paddingLeft: 40,
    borderRadius: 8,
    fontSize: 16,
    flex: 1,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ingredientList: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    minWidth: "45%",
    justifyContent: "space-between",
  },
  inactiveIngredient: {
    opacity: 0.6,
  },
  ingredientText: {
    fontSize: 16,
    marginRight: 10,
  },
  suggestButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  suggestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleAllButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 8,
  },
  toggleAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
