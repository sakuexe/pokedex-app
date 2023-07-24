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
import React, { useEffect, useReducer, useState } from "react";
// custom hooks
import { pokeReducer as listReducer, INITIAL_STATE } from "./listReducer";
import { removeData } from "../../utils/datastore";
// constants
import { COLORS, SIZES } from "../../constants";
import styles from "../../styles/common";
// custom components
import PokeItem from "./pokeitem";
import ErrorView from "../../components/error";
import Loading from "../../components/loading";
// data
import { REGIONS } from "../../assets/json/regions";
import PickerFilter from "./filter";

export default function Pokelist() {
  const [pokeState, dispatch] = useReducer(listReducer, INITIAL_STATE);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCHING" });
      const api = new PokemonClient();
      const pokemon = await api.listPokemons(0, 24);
      dispatch({ type: "FETCH_SUCCESS", data: pokemon.results });
    }
    try {
      fetchData();
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", error: error });
    }
  }, []);

  const setRegion = (value: number) => {
    dispatch({ type: "SET_REGION", region: value });
  };

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
        ListHeaderComponent={
          <>
            <PickerFilter
              currentState={pokeState.region}
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
        numColumns={3}
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
        data={pokeState.pokeList}
        renderItem={({ item }) => {
          if (pokeState.error)
            return <ErrorView noButton message="Error fetching Pokemon" />;
          if (pokeState.loading) return <Loading color={COLORS.primary} />;
          return <PokeItem name={item.name} url={item.url} />;
        }}
        keyExtractor={(item) => item.name}
        onEndReached={async () => {
          if (pokeState.loading || pokeState.error) return;
          // const morePokemon = await fetchData<PokemonList>(data.next);
          // setPokemonList(pokemonList.concat(morePokemon.results));
          console.warn("end reached");
        }}
      />
    </SafeAreaView>
  );
}
