import { View, Text, TouchableOpacity } from "react-native";
import details from "../../styles/details";
import { useEffect, useReducer } from "react";
// components
import EvolutionItem from "./evolutionitem";
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

  if (state.loading) return <Loading />;

  const flattenedEvolutionChain = flattenEvolutionChain(
    state.evolutionChain?.chain.evolves_to[0],
  );

  console.log(flattenedEvolutionChain);

  return (
    <View style={details.container}>
      <Text>Evolution</Text>
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
        ></EvolutionItem>
        {/* rest of the evolution tree */}
        {flattenedEvolutionChain.map((evolution, index: number) => (
          <>
            {index <= flattenedEvolutionChain.length - 1 && (
              <Text key={`arrow-${index}`} style={details.h4}>
                →
              </Text>
            )}
            <EvolutionItem key={index} name={evolution?.species.name} />
          </>
        ))}
      </View>
    </View>
  );
}
