import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// constants
import { COLORS, IMAGES } from "@/constants";
import styles from "@/styles/common";
// util functions
import { capitalize } from "@/utils/string";
import useFetch from "@/hooks/useFetch";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokemonType = {
  name: string;
  url: string;
};

type PokemonData = {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  species: any[];
  sprites: any[];
  stats: any[];
  types: any[];
  weight: number;
};

export default function PokeItem(pokemon: PokemonType) {
  const { data, isLoading, error } = useFetch<PokemonData>(
    `${API_URL}/${pokemon.name}`,
  );

  return (
    <TouchableOpacity style={styles.listing}>
      {isLoading ? (
        <>
          <Image source={IMAGES.loading} style={styles.listingImage} />
          <Text style={styles.listingText}>Loading...</Text>
        </>
      ) : error ? (
        <Text style={styles.listingText}>Something went wrong...</Text>
      ) : (
        <>
          <Image
            source={{ uri: data?.sprites["front_default"] }}
            placeholder={IMAGES.loading}
            style={styles.listingImage}
          />
          <Text style={styles.listingText}>{capitalize(pokemon.name)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
