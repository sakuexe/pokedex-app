import { PokeAPI } from "pokeapi-types";

type evolutionState = {
  loading: boolean;
  error: boolean;
  species: PokeAPI.PokemonSpecies;
  evolutionChain: PokeAPI.EvolutionChain;
};

type fetchAction = {
  type:
    | "FETCH_START"
    | "FETCH_SPECIES_SUCCESS"
    | "FETCH_EVOLUTION_SUCCESS"
    | "FETCH_ERROR";
  species?: PokeAPI.PokemonSpecies;
  evolution?: PokeAPI.EvolutionChain;
};

export const INITIAL_STATE: evolutionState = {
  loading: false,
  error: false,
  species: null,
  evolutionChain: null,
};

export function fetchReducer(
  state: evolutionState,
  action: fetchAction,
): evolutionState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCH_SPECIES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        species: action.species,
      };
    case "FETCH_EVOLUTION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        evolutionChain: action.evolution,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
