import { View, Text, TouchableOpacity } from "react-native";
import details from "../../styles/details";
import { useEffect, useReducer, useState } from "react";
// custom hooks
import fetchData from "../../utils/fetch";
// types
import { PokeAPI } from "pokeapi-types";
import { fetchReducer, INITIAL_STATE } from "./fetchReducer";

type Species = PokeAPI.PokemonSpecies;
type EvolutionChain = PokeAPI.EvolutionChain;

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

export default function Evolution({ pokemonId }: { pokemonId: number }) {
  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE as any);

  async function fetchEvolutionChain() {
    dispatch({ type: "FETCH_START" });
    try {
      const species = await fetchData<Species>(`${SPECIES_URL}/${pokemonId}`);
      dispatch({ type: "FETCH_SPECIES_SUCCESS", species: species });
      // throw new Error("test");
      const evolutionChain = await fetchData<EvolutionChain>(
        species.evolution_chain.url,
      );
      dispatch({ type: "FETCH_EVOLUTION_SUCCESS", evolution: evolutionChain });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR" });
    }
  }

  useEffect(() => {
    fetchEvolutionChain();
  }, []);

  if (state.error)
    return (
      <View>
        <Text>Error while loading the evolution chain...</Text>
        <TouchableOpacity
          onPress={() => {
            fetchEvolutionChain;
          }}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  if (state.loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={details.container}>
      <Text>{pokemonId}</Text>
      <Text>{state.species?.name}</Text>
      <Text>{state.evolutionChain?.id}</Text>
    </View>
  );
}
