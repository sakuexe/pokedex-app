import { View, Text, TouchableOpacity } from "react-native";
import details from "../../styles/details";
import { useEffect, useReducer } from "react";
// components
import Loading from "../../components/loading";
import ErrorView from "../../components/error";
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

  async function fetchEvolutionChain(): Promise<void> {
    dispatch({ type: "FETCH_START" });
    try {
      const species = await fetchData<Species>(`${SPECIES_URL}/${pokemonId}`);
      dispatch({ type: "FETCH_SPECIES_SUCCESS", species: species });
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

  function flattenEvolutionChain(
    obj: PokeAPI.ChainLink,
  ): Array<PokeAPI.ChainLink> {
    // flattens the evolution chain into a single array
    // so that we can map over it in O(n) time complexity
    const flattened: Array<PokeAPI.ChainLink> = [];
    function flatten(obj: PokeAPI.ChainLink): void {
      flattened.push(obj);
      if (obj?.evolves_to) {
        obj?.evolves_to.forEach((evolution) => flatten(evolution));
      }
    }
    flatten(obj);
    return flattened;
  }

  if (state.error) return <ErrorView reload={() => fetchEvolutionChain()} />;

  if (state.loading) return <Loading />;

  const flattenedEvolutionChain = flattenEvolutionChain(
    state.evolutionChain?.chain.evolves_to[0],
  );

  return (
    <View style={details.container}>
      {/* first evolution */}
      <Text>{state.evolutionChain?.chain?.species.name}</Text>
      {/* rest of the evolution tree */}
      {flattenedEvolutionChain.map((evolution, index: number) => (
        <Text key={index}>{evolution?.species.name}</Text>
      ))}
    </View>
  );
}
