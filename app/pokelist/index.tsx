import { Stack } from "expo-router";
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
// react hooks
import React, { useEffect, useState } from "react";
// custom hooks
import useFetch from "../../hooks/useFetch";
import fetchData from "../../utils/fetch";
import { removeData } from "../../utils/datastore";
// constants
import { COLORS, SIZES } from "../../constants";
import styles from "../../styles/common";
// custom components
import PokeItem from "./pokeitem";
import { PokeItemProps } from "./pokeitem";
import ErrorView from "../../components/error";
import Loading from "../../components/loading";
// data
import { REGIONS } from "../../assets/json/regions";
import PickerFilter from "./filter";
// types
import { PokeAPI } from "pokeapi-types";

const API_URL = "https://pokeapi.co/api/v2";

type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeItemProps[];
};

export default function Pokelist() {
  const [region, setRegion] = useState(0);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const api = new PokemonClient();
      const pokemon = await api.listPokemons(0, 24);
      setPokemonList(pokemon.results);
      setIsLoading(false);
    }
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

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
      <FlatList
        numColumns={3}
        ListHeaderComponent={
          <>
            <PickerFilter
              currentState={region}
              setState={setRegion}
              selection={REGIONS}
            />
            <TouchableOpacity
              onPress={() => {
                removeData(true);
              }}
            >
              <Text>Remove Cache</Text>
            </TouchableOpacity>
          </>
        }
        style={{
          backgroundColor: COLORS.white,
        }}
        contentContainerStyle={{
          paddingBottom: 50,
          gap: SIZES.sm,
          // min height is added to prevent the flatList callback
          // from being called on the initial render
          minHeight: Dimensions.get("window").height + 100,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: SIZES.sm,
        }}
        data={pokemonList}
        renderItem={({ item }) => {
          if (error)
            return <ErrorView noButton message="Error fetching Pokemon" />;
          if (isLoading) return <Loading color={COLORS.primary} />;
          return <PokeItem name={item.name} url={item.url} />;
        }}
        keyExtractor={(item: PokeItemProps) => item.name}
        onEndReached={async () => {
          if (isLoading || error) return;
          // const morePokemon = await fetchData<PokemonList>(data.next);
          // setPokemonList(pokemonList.concat(morePokemon.results));
          console.warn("end reached");
        }}
      />
    </SafeAreaView>
  );
}
