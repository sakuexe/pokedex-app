import { View, Text, TouchableOpacity } from "react-native";
import details from "../../styles/details";
import { useEffect, useReducer } from "react";
// components
import EvolutionItem from "./evolutionitem";
import Loading from "../../components/loading";
import ErrorView from "../../components/error";
// constants
import { SIZES } from "../../constants";
// custom hooks
import fetchData from "../../utils/fetch";
// types
import { PokeAPI } from "pokeapi-types";
import { fetchReducer, INITIAL_STATE } from "./fetchReducer";

type Species = PokeAPI.PokemonSpecies;
type EvolutionChain = PokeAPI.EvolutionChain;

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

export default function Evolution({ pokemonId }: { pokemonId: number }) {
  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);

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

  // show loading state if evolution chain is not fetched yet
  // if the fetched data would be empty, fetch function would throw an error
  // so if there is no evolution chain, we can assume that it is still loading
  if (state.loading || !state.evolutionChain) return <Loading />;

  const flattenedEvolutionChain = flattenEvolutionChain(
    state.evolutionChain?.chain.evolves_to[0],
  );

  return (
    <View style={{ marginHorizontal: SIZES.md }}>
      <View
        style={{
          marginBottom: SIZES.md,
          alignItems: "center",
        }}
      >
        <Text style={details.h3}>Evolution Chain</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* first evolution */}
        <EvolutionItem
          name={state.evolutionChain?.chain?.species.name}
          evolutionKey="first-evolution"
          key={state.evolutionChain?.chain?.species.name}
        />
        {/* rest of the evolution tree */}
        {flattenedEvolutionChain.map((evolution, index: number) => (
          <>
            {index <= flattenedEvolutionChain.length - 1 && (
              <Text key={`arrow-${index}`} style={details.h4}>
                →
              </Text>
            )}
            <EvolutionItem
              evolutionKey={index}
              name={evolution?.species.name}
              key={evolution?.species.name}
            />
          </>
        ))}
      </View>
    </View>
  );
}
