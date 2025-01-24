import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_PANTRY_INGREDIENTS } from "@/app/data/mockData";

// Single test user for demo
const TEST_USER = { email: "test", password: "test" };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginAndInitialize = async () => {
      try {
        const isInitialized = await AsyncStorage.getItem("isInitialized");
        if (!isInitialized) {
          // First-time initialization of all required data
          await AsyncStorage.multiSet([
            ["pantryIngredients", JSON.stringify(DEFAULT_PANTRY_INGREDIENTS)],
            ["activeIngredients", JSON.stringify([])],
            ["favorites", JSON.stringify([])],
            ["excluded", JSON.stringify([])],
            ["isInitialized", "true"],
          ]);
        }

        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");

        if (storedEmail && storedPassword) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
    checkLoginAndInitialize();
  }, []);

  const handleLogin = async () => {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      try {
        await AsyncStorage.multiSet([
          ["userEmail", email],
          ["userPassword", password],
        ]);
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(tabs)/home");
      } catch (error) {
        console.error("Error during login:", error);
        Alert.alert("Error", "Failed to save login information");
      }
    } else {
      Alert.alert("Error", "Invalid credentials. Use test/test to login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.branding}>fridge2fork</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Use test/test to login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  branding: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 20,
  },
  hint: {
    color: "#888",
    marginTop: 10,
  },
});
