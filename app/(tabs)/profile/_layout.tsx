import { Stack } from "expo-router";

/**
 * ProfileLayout Component
 *
 * Defines the navigation stack for the profile section of the app.
 * This includes the main profile screen and any nested screens.
 *
 * Note: The dietary preferences screen is handled by the (settings) group,
 * not within the profile stack.
 */
export default function ProfileLayout() {
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
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
