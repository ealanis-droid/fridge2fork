import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DIETARY_PREFERENCES } from "../data/mockData";

/**
 * DietaryContext
 *
 * Manages the user's dietary preferences and excluded ingredients.
 * This context provides functionality to:
 * - Track active dietary preferences (e.g., vegetarian, vegan)
 * - Maintain a list of excluded ingredients based on dietary preferences
 * - Persist preferences across app sessions using AsyncStorage
 */

// Define the shape of our context data
type DietaryContextType = {
  activeDiets: string[];
  excludedIngredients: string[];
  toggleDiet: (dietId: string) => void;
};

// Create the context with undefined initial value
const DietaryContext = createContext<DietaryContextType | undefined>(undefined);

/**
 * DietaryProvider Component
 *
 * Provides dietary preference state and management functions to the app.
 * Handles:
 * - Loading saved preferences from storage
 * - Updating excluded ingredients when diets change
 * - Saving changes to storage
 */
export function DietaryProvider({ children }: { children: React.ReactNode }) {
  // Track active dietary preferences
  const [activeDiets, setActiveDiets] = useState<string[]>([]);
  // Track ingredients to exclude based on active diets
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load stored preferences on mount
  useEffect(() => {
    const loadStoredPreferences = async () => {
      try {
        const storedDiets = await AsyncStorage.getItem("activeDiets");
        if (storedDiets) {
          setActiveDiets(JSON.parse(storedDiets));
        }
      } catch (error) {
        console.error("Error loading dietary preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredPreferences();
  }, []);

  // Update excluded ingredients when active diets change
  useEffect(() => {
    if (!isLoading) {
      // Get all excluded ingredients from active diets
      const newExcludedIngredients = activeDiets.flatMap((dietId) => {
        const diet = DIETARY_PREFERENCES.find((d) => d.id === dietId);
        return diet ? diet.excludedIngredients : [];
      });

      // Remove duplicates and update state
      setExcludedIngredients([...new Set(newExcludedIngredients)]);

      // Save active diets to storage
      AsyncStorage.setItem("activeDiets", JSON.stringify(activeDiets));
    }
  }, [activeDiets, isLoading]);

  // Toggle a dietary preference on/off
  const toggleDiet = (dietId: string) => {
    setActiveDiets((prev) =>
      prev.includes(dietId)
        ? prev.filter((id) => id !== dietId)
        : [...prev, dietId]
    );
  };

  // Skip rendering until initial load is complete
  if (isLoading) {
    return null;
  }

  return (
    <DietaryContext.Provider
      value={{
        activeDiets,
        toggleDiet,
        excludedIngredients,
      }}
    >
      {children}
    </DietaryContext.Provider>
  );
}

/**
 * useDietary Hook
 *
 * Custom hook to access dietary preferences context.
 * Throws an error if used outside of DietaryProvider.
 */
export function useDietary() {
  const context = useContext(DietaryContext);
  if (context === undefined) {
    throw new Error("useDietary must be used within a DietaryProvider");
  }
  return context;
}

export { DietaryContext };

export default DietaryProvider;
