import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { Image, Text, View } from "react-native";
import { COLORS } from "@/constants";
import styles from "@/styles/common";
import images from "@/constants/images";
import PokeItem from "./pokeitem";

export default function Pokelist() {
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
      <Text>Pokemon listing</Text>
      <View style={styles.listContainer}>
        {[...Array(10)].map((element: number, index: number) => (
          <PokeItem key={index} />
        ))}
        <PokeItem />
      </View>
    </SafeAreaView>
  );
}
