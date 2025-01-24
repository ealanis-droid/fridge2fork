import { Stack } from "expo-router";

/**
 * SettingsLayout Component
 *
 * Defines the navigation stack for the settings section of the app.
 * This is a separate navigation group that handles settings-related screens
 * like dietary preferences.
 *
 * The (settings) group is separate from the main tab navigation,
 * allowing these screens to be accessed from anywhere in the app
 * while maintaining proper navigation hierarchy.
 */
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="dietary"
        options={{
          title: "Dietary Preferences",
        }}
      />
    </Stack>
  );
}
