import { Stack, useRouter } from "expo-router";
import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
// constants
import { COLORS } from "../constants";
// components
import HelloBanner from "./hellobanner";

export default function Home() {
  const navigateTo = (screen: string) => {
    const router = useRouter();
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
            navigateTo("/pokelist/");
          }}
        >
          <Text>Search pokemon</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
