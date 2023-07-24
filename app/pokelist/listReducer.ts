import { NamedAPIResource } from "pokenode-ts";

type PokeState = {
  pokeList: NamedAPIResource[] | null;
  loading: boolean;
  error: Error | null;
  region: number;
};

export const INITIAL_STATE = {
  pokeList: null,
  loading: false,
  error: null,
  region: 0,
};

type PokeAction = {
  type: "FETCHING" | "FETCH_SUCCESS" | "FETCH_ERROR" | "SET_REGION";
  error?: Error;
  data?: NamedAPIResource[];
  region?: number;
};

export function pokeReducer(state: PokeState, action: PokeAction) {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        pokeList: action.data,
      };
    case "SET_REGION":
      return {
        ...state,
        region: action.region,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
      };
    default:
      return state;
  }
}
