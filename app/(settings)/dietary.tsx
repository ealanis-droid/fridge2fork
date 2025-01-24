import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDietary } from "@/app/context/DietaryContext";
import {
  DIETARY_PREFERENCES,
  type DietaryPreference,
} from "@/app/data/mockData";

/**
 * DietaryPreferences Screen Component
 *
 * Allows users to manage their dietary preferences by:
 * - Viewing available dietary options
 * - Toggling dietary preferences on/off
 * - Seeing which ingredients are excluded for each preference
 *
 * Changes to dietary preferences automatically update recipe filtering
 * through the DietaryContext.
 */
export default function DietaryPreferences() {
  // Access dietary context for preference management
  const { activeDiets, toggleDiet } = useDietary();

  return (
    <ScrollView style={styles.container}>
      {/* Screen Title and Description */}
      <Text style={styles.title}>Dietary Preferences</Text>
      <Text style={styles.subtitle}>
        Select your dietary preferences to automatically exclude recipes that
        don't match.
      </Text>

      {/* List of Dietary Options */}
      {DIETARY_PREFERENCES.map((diet: DietaryPreference) => {
        const isActive = activeDiets.includes(diet.id);
        return (
          <TouchableOpacity
            key={diet.id}
            style={[styles.preferenceItem, isActive && styles.activePreference]}
            onPress={() => toggleDiet(diet.id)}
          >
            {/* Preference Information */}
            <View style={styles.preferenceInfo}>
              <Text
                style={[styles.preferenceName, isActive && styles.activeText]}
              >
                {diet.name}
              </Text>
              <Text style={styles.excludedList}>
                Excludes: {diet.excludedIngredients.join(", ")}
              </Text>
            </View>
            {/* Toggle Indicator */}
            <FontAwesome
              name={isActive ? "check-circle" : "circle-o"}
              size={24}
              color={isActive ? "#4A90E2" : "#888"}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  activePreference: {
    backgroundColor: "#2c3e50",
    borderColor: "#4A90E2",
    borderWidth: 1,
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 10,
  },
  preferenceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  activeText: {
    color: "#4A90E2",
  },
  excludedList: {
    fontSize: 14,
    color: "#888",
  },
});
