import { Text, Image, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
// constants
import { COLORS } from "../constants";
// components
import HelloBanner from "./hellobanner";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "Poke API ඞ",
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />
      <HelloBanner />
    </SafeAreaView>
  );
}
