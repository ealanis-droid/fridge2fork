import { Stack } from "expo-router";
import { IngredientsProvider } from "./context/IngredientsContext";
import { DietaryProvider } from "./context/DietaryContext";

/**
 * RootLayout Component
 *
 * This is the root layout component that defines the main navigation structure
 * and provides context providers for the entire app.
 *
 * Navigation Groups:
 * - (tabs): Main tab navigation (home, pantry, recipes, profile)
 * - (recipe): Recipe detail screens
 * - (settings): Settings-related screens (dietary preferences)
 * - auth: Authentication screens (login)
 *
 * Context Providers:
 * - DietaryProvider: Manages dietary preferences and excluded ingredients
 * - IngredientsProvider: Manages pantry and active ingredients
 */
export default function RootLayout() {
  return (
    <DietaryProvider>
      <IngredientsProvider>
        <Stack>
          {/* Main tab navigation */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Recipe detail screens */}
          <Stack.Screen
            name="(recipe)"
            options={{
              headerShown: false,
            }}
          />

          {/* Settings screens */}
          <Stack.Screen name="(settings)" options={{ headerShown: false }} />

          {/* Authentication screens */}
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        </Stack>
      </IngredientsProvider>
    </DietaryProvider>
  );
}
