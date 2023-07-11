import { Stack, useRouter } from "expo-router";
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
// constants
import { COLORS } from "../constants";
// components
import HelloBanner from "./hellobanner";

export default function Home() {
  const router = useRouter();
  const navigateTo = (screen: string) => {
    router.push(screen);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "Pokedex ඞ",
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HelloBanner />
        <TouchableOpacity
          onPress={() => {
            navigateTo("/pokelist");
          }}
        >
          <Text>Search pokemon</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
