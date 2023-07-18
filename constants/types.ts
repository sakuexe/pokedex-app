import { PokeAPI } from "pokeapi-types";
// TODO: Add the versions of sprites to the interface too

interface PokemonInterface extends PokeAPI.Pokemon {
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
    other: {
      dream_world?: {
        front_default?: string;
        front_female?: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
}

type PokemonType = PokemonInterface;

export { PokemonType };
