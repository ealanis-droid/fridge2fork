import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { MOCK_RECIPES, Recipe } from "@/app/data/mockData";

/**
 * RecipeDetail Screen Component
 *
 * Displays detailed information about a specific recipe, including:
 * - Recipe image
 * - Title and description
 * - Cooking time, difficulty, and servings
 * - List of ingredients
 * - Step-by-step cooking instructions
 *
 * The recipe is identified by the ID parameter in the route.
 */
export default function RecipeDetail() {
  // Get the recipe ID from the route parameters
  const { id } = useLocalSearchParams();
  // Find the recipe in our mock data
  const recipe: Recipe | undefined =
    MOCK_RECIPES[id as keyof typeof MOCK_RECIPES];

  return (
    <>
      {/* Configure the screen header */}
      <Stack.Screen
        options={{
          title: recipe?.name || "Recipe Details",
          headerStyle: {
            backgroundColor: "#25292e",
          },
          headerTintColor: "#fff",
          gestureEnabled: true,
        }}
      />

      {/* Display error message if recipe not found */}
      {!recipe ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>Recipe not found</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {/* Recipe Image */}
          <Image source={{ uri: recipe.image }} style={styles.image} />

          <View style={styles.content}>
            {/* Recipe Title and Description */}
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.description}>{recipe.description}</Text>

            {/* Recipe Metadata (Time, Difficulty, Servings) */}
            <View style={styles.metadataContainer}>
              <View style={styles.metadataItem}>
                <FontAwesome name="clock-o" size={20} color="#4A90E2" />
                <Text style={styles.metadataText}>{recipe.time}</Text>
              </View>
              <View style={styles.metadataItem}>
                <FontAwesome name="signal" size={20} color="#4A90E2" />
                <Text style={styles.metadataText}>{recipe.difficulty}</Text>
              </View>
              <View style={styles.metadataItem}>
                <FontAwesome name="users" size={20} color="#4A90E2" />
                <Text style={styles.metadataText}>
                  {recipe.servings} servings
                </Text>
              </View>
            </View>

            {/* Ingredients List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <View key={index} style={styles.ingredientItem}>
                  <FontAwesome name="circle" size={8} color="#4A90E2" />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Cooking Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              {recipe.steps.map((step: string, index: number) => (
                <View key={index} style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  metadataContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
  },
  metadataItem: {
    alignItems: "center",
  },
  metadataText: {
    color: "#fff",
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  stepNumber: {
    color: "#4A90E2",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    width: 25,
  },
  stepText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
});
