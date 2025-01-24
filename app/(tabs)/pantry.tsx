import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useIngredients } from "../context/IngredientsContext";
import { Ingredient } from "@/app/data/mockData";

/**
 * Pantry Screen Component
 *
 * Allows users to manage their pantry ingredients by:
 * - Viewing all available ingredients
 * - Adding new ingredients
 * - Removing existing ingredients
 * - Categorizing ingredients
 *
 * The pantry state persists across app sessions and
 * affects recipe filtering in the recipes screen.
 */
export default function Pantry() {
  // State for new ingredient form
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("vegetables");

  // Access ingredients context
  const { pantryIngredients, setPantryIngredients } = useIngredients();

  /**
   * Available ingredient categories
   */
  const categories = [
    "vegetables",
    "fruits",
    "protein",
    "grains",
    "dairy",
    "seasonings",
    "oils",
  ];

  /**
   * Add a new ingredient to the pantry
   */
  const handleAddIngredient = () => {
    if (!newIngredient.trim()) {
      Alert.alert("Error", "Please enter an ingredient name");
      return;
    }

    // Create new ingredient with unique ID
    const newItem: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.trim(),
      category: selectedCategory,
    };

    setPantryIngredients((prev) => [...prev, newItem]);
    setNewIngredient("");
  };

  /**
   * Remove an ingredient from the pantry
   */
  const handleRemoveIngredient = (id: string) => {
    Alert.alert(
      "Remove Ingredient",
      "Are you sure you want to remove this ingredient?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setPantryIngredients((prev) =>
              prev.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  /**
   * Group ingredients by their category
   */
  const groupedIngredients = pantryIngredients.reduce(
    (groups: { [key: string]: Ingredient[] }, ingredient) => {
      const category = ingredient.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(ingredient);
      return groups;
    },
    {}
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Pantry Management</Text>
        {/* Add New Ingredient Form */}
        <View style={styles.addForm}>
          <TextInput
            style={styles.input}
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="Add new ingredient..."
            placeholderTextColor="#888"
          />
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddIngredient}
          >
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredient List by Category */}
        <ScrollView style={styles.list}>
          {Object.entries(groupedIngredients).map(([category, ingredients]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              {ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientItem}>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveIngredient(ingredient.id)}
                  >
                    <FontAwesome name="trash" size={24} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  pantryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  pantryText: {
    fontSize: 16,
  },
  addForm: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#4A90E2",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  ingredientName: {
    fontSize: 16,
  },
});
