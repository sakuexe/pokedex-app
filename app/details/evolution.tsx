import { View, Text } from "react-native";
import details from "../../styles/details";
// custom hooks
import useFetch from "../../hooks/useFetch";
// types
import { PokemonType } from "../../constants/types";
import { PokeAPI } from "pokeapi-types";

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

export default function Evolution({ pokemonId }: { pokemonId: number }) {
  if (!pokemonId) return null;
  const {
    data: species,
    isLoading: isLoadingSpecies,
    error: speciesError,
  } = useFetch<PokeAPI.PokemonSpecies>(`${SPECIES_URL}/${pokemonId}`);

  // const {
  //   data: evolution,
  //   isLoading: isLoadingEvolution,
  //   error: evolutionError,
  // } = useFetch<PokeAPI.EvolutionChain>();

  return (
    <View style={details.container}>
      <Text>{pokemonId}</Text>
      <Text>{species?.name}</Text>
    </View>
  );
}
