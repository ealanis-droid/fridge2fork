import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Check if the component is mounted before navigating
      if (!rootNavigationState?.key) {
        return;
      }

      try {
        // Check for stored credentials
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");

        if (storedEmail && storedPassword) {
          // User is logged in, navigate to home
          router.replace("/(tabs)/home");
        } else {
          // No stored credentials, navigate to login
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        // If there's an error, default to login screen
        router.replace("/auth/login");
      }
    };

    checkAuthAndNavigate();
  }, [rootNavigationState?.key]);

  return null;
}
