import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIngredients } from "../../context/IngredientsContext";
import { useDietary } from "../../context/DietaryContext";

/**
 * Mock user data for demo purposes
 */
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
};

/**
 * Type definition for icon names used in menu items
 */
type IconName =
  | "heart"
  | "ban"
  | "list"
  | "gear"
  | "question-circle"
  | "sign-out"
  | "user-circle"
  | "chevron-right"
  | "cutlery";

/**
 * Profile Screen Component
 *
 * Main profile screen that displays:
 * - User information
 * - Statistics (saved recipes, ingredients, excluded recipes)
 * - Navigation menu to various settings
 * - Logout functionality
 *
 * Also handles loading and saving user preferences.
 */
export default function Profile() {
  const { pantryIngredients } = useIngredients();
  const { activeDiets } = useDietary();
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [excluded, setExcluded] = React.useState<string[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  /**
   * Load saved preferences on mount and screen focus
   */
  const loadSavedState = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      const savedExcluded = await AsyncStorage.getItem("excluded");

      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedExcluded) setExcluded(JSON.parse(savedExcluded));
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
  };

  // Load preferences on mount and focus
  React.useEffect(() => {
    loadSavedState();

    // Add focus listener
    const unsubscribe = navigation.addListener("focus", () => {
      loadSavedState();
    });

    // Cleanup subscription
    return unsubscribe;
  }, [navigation]);

  /**
   * Handle user logout
   * Clears all stored data and navigates to login screen
   */
  const handleLogout = async () => {
    try {
      // Clear all stored data
      await AsyncStorage.multiRemove([
        "userEmail",
        "userPassword",
        "pantryIngredients",
        "activeIngredients",
        "favorites",
        "excluded",
      ]);

      Alert.alert("Success", "Logged out successfully!");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to logout properly");
    }
  };

  /**
   * Handle menu item press
   * Navigates to appropriate screen based on menu item
   */
  const handleMenuPress = (route: string) => {
    if (route === "dietary") {
      router.push("/(settings)/dietary");
    }
  };

  /**
   * Render a menu item with icon and value
   */
  const renderMenuItem = (
    icon: IconName,
    title: string,
    value: string | number
  ) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <FontAwesome name={icon} size={24} color="#4A90E2" />
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        <Text style={styles.menuItemValue}>{value}</Text>
        <FontAwesome name="chevron-right" size={16} color="#888" />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user-circle" size={80} color="#4A90E2" />
        </View>
        <Text style={styles.userName}>{MOCK_USER.name}</Text>
        <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
      </View>

      {/* User Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Saved Recipes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pantryIngredients.length}</Text>
          <Text style={styles.statLabel}>Ingredients</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{excluded.length}</Text>
          <Text style={styles.statLabel}>Excluded</Text>
        </View>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        {renderMenuItem("heart", "Saved Recipes", favorites.length)}
        {renderMenuItem("ban", "Excluded Recipes", excluded.length)}
        {renderMenuItem("list", "My Ingredients", pantryIngredients.length)}
        <TouchableOpacity onPress={() => handleMenuPress("dietary")}>
          {renderMenuItem("cutlery", "Dietary Preferences", activeDiets.length)}
        </TouchableOpacity>
        {renderMenuItem("gear", "Settings", "")}
        {renderMenuItem("question-circle", "Help & Support", "")}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#888",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemValue: {
    fontSize: 16,
    color: "#888",
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e74c3c",
    margin: 20,
    padding: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
