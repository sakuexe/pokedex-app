import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Image } from "expo-image";
// constants
import { COLORS, ICONS } from "@/constants";
import styles from "@/styles/common";
import details from "@/styles/details";
// util functions
import { capitalize } from "@/utils/string";
import useFetch from "@/hooks/useFetch";
// types
import { PokeAPI } from "pokeapi-types";
import { useEffect } from "react";

export default function PokemonInfo() {
  const searchParams = useLocalSearchParams();

  const {
    data: pokemon,
    isLoading,
    error,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchParams.name}`);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: `#${pokemon?.id} — ${capitalize(searchParams.name)}`,
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />

      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <View style={{ backgroundColor: "#af8" }}>
          {isLoading ? (
            <Text style={details.text}>Loading...</Text>
          ) : error ? (
            <Text style={details.text}>Something went wrong...</Text>
          ) : (
            <>
              <View style={details.imageContainer}>
                <Image
                  source={
                    pokemon?.sprites.other["official-artwork"].front_default
                  }
                  style={details.image}
                />
              </View>
              <View style={details.container}>
                <Text style={details.text}>ID: {pokemon?.id}</Text>
                <Text style={details.text}>Name: {pokemon?.name}</Text>
                <Text style={details.text}>Height: {pokemon?.height}</Text>
                <Text style={details.text}>Weight: {pokemon?.weight}</Text>
                <Text style={details.text}>
                  Base Experience: {pokemon?.base_experience}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
