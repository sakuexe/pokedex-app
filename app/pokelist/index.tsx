import { Stack } from "expo-router";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
// react hooks
import React, { useState } from "react";
// custom hooks
import useFetch from "../../hooks/useFetch";
// constants
import { COLORS } from "../../constants";
import styles from "../../styles/common";
// custom components
import PokeItem from "./pokeitem";
import { PokemonType } from "./pokeitem";
// data
import { REGIONS } from "../../assets/json/regions";
import PickerFilter from "./filter";

const API_URL = "https://pokeapi.co/api/v2/";

export default function Pokelist() {
  const [region, setRegion] = useState(0);
  const { data, isLoading, error } = useFetch<PokemonType>(
    `${API_URL}pokemon?limit=151`,
  );
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "Full Pokedex ඞ",
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />

      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <PickerFilter
          currentState={region}
          setState={setRegion}
          selection={REGIONS}
        />
        <View style={styles.listContainer}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data?.map((pokemon: PokemonType, index: number) => (
              <PokeItem key={index} name={pokemon.name} url={pokemon.url} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
