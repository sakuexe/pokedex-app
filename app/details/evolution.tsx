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

  if (state.error) return <ErrorView reload={() => fetchEvolutionChain()} />;

  if (state.loading) return <Loading />;

  return (
    <View style={details.container}>
      {/* first evolution */}
      <Text>{state.evolutionChain?.chain.species.name}</Text>

      {state.evolutionChain?.chain.evolves_to?.map(
        (evolution: PokeAPI.ChainLink, index: number) => (
          <>
            {/* second evolutions */}
            <Text key={`${state.species.name}-${index}`}>
              {evolution.species.name}
            </Text>

            {/* third evolutions */}
            {evolution.evolves_to.map((lastEvolution: PokeAPI.ChainLink) => (
              <Text key={lastEvolution.species.name + index.toString()}>
                {lastEvolution.species.name}
              </Text>
            ))}
          </>
        ),
      )}
    </View>
  );
}
