import { View, Text } from "react-native";
import details from "../../styles/details";
import { useEffect, useState } from "react";
// custom hooks
import fetchData from "../../utils/fetch";
// types
import { PokeAPI } from "pokeapi-types";

type Species = PokeAPI.PokemonSpecies;
type EvolutionChain = PokeAPI.EvolutionChain;

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

export default function Evolution({ pokemonId }: { pokemonId: number }) {
  const [species, setSpecies] = useState<Species>();
  const [evolution, setEvolution] = useState<EvolutionChain>();

  async function fetchEvolutionChain() {
    const species = await fetchData<Species>(`${SPECIES_URL}/${pokemonId}`);
    setSpecies(species);
    const evolutionChain = await fetchData<EvolutionChain>(
      species.evolution_chain.url,
    );
    setEvolution(evolutionChain);
  }

  useEffect(() => {
    fetchEvolutionChain();
  }, []);

  return (
    <View style={details.container}>
      <Text>{pokemonId}</Text>
      <Text>{species?.name}</Text>
      <Text>{evolution?.id}</Text>
    </View>
  );
}
