import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_PANTRY_INGREDIENTS, Ingredient } from "@/app/data/mockData";

/**
 * IngredientsContext
 *
 * Manages the user's pantry ingredients and active ingredient selection.
 * This context provides functionality to:
 * - Track all available ingredients in the user's pantry
 * - Manage currently selected/active ingredients for recipe filtering
 * - Persist ingredient data across app sessions using AsyncStorage
 */

// Define the shape of our context data
type IngredientsContextType = {
  pantryIngredients: Ingredient[];
  setPantryIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  activeIngredients: Ingredient[];
  setActiveIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

// Create the context with undefined initial value
const IngredientsContext = createContext<IngredientsContextType | undefined>(
  undefined
);

/**
 * IngredientsProvider Component
 *
 * Provides ingredient state and management functions to the app.
 * Handles:
 * - Loading saved ingredients from storage
 * - Initializing with default ingredients if none exist
 * - Saving changes to storage
 * - Managing active ingredient selection
 */
export function IngredientsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Track all available pantry ingredients
  const [pantryIngredients, setPantryIngredients] = useState<Ingredient[]>([]);
  // Track currently selected ingredients for recipe filtering
  const [activeIngredients, setActiveIngredients] = useState<Ingredient[]>([]);
  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load stored data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedPantry = await AsyncStorage.getItem("pantryIngredients");
        const storedActive = await AsyncStorage.getItem("activeIngredients");

        // Initialize pantry with stored or default ingredients
        if (storedPantry) {
          setPantryIngredients(JSON.parse(storedPantry));
        } else {
          setPantryIngredients(DEFAULT_PANTRY_INGREDIENTS);
        }

        // Initialize active ingredients if stored
        if (storedActive) {
          setActiveIngredients(JSON.parse(storedActive));
        }
      } catch (error) {
        console.error("Error loading stored ingredients:", error);
        // Fallback to default ingredients on error
        setPantryIngredients(DEFAULT_PANTRY_INGREDIENTS);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // Save pantry ingredients whenever they change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(
        "pantryIngredients",
        JSON.stringify(pantryIngredients)
      );
    }
  }, [pantryIngredients, isLoading]);

  // Save active ingredients whenever they change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(
        "activeIngredients",
        JSON.stringify(activeIngredients)
      );
    }
  }, [activeIngredients, isLoading]);

  // Skip rendering until initial load is complete
  if (isLoading) {
    return null;
  }

  return (
    <IngredientsContext.Provider
      value={{
        pantryIngredients,
        setPantryIngredients,
        activeIngredients,
        setActiveIngredients,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

/**
 * useIngredients Hook
 *
 * Custom hook to access ingredients context.
 * Throws an error if used outside of IngredientsProvider.
 */
export function useIngredients() {
  const context = useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error(
      "useIngredients must be used within an IngredientsProvider"
    );
  }
  return context;
}

export default IngredientsProvider;
