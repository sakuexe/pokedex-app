import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// constants
import { COLORS, IMAGES } from "@/constants";
import styles from "@/styles/common";
// util functions
import { capitalize } from "@/utils/string";
import useFetch from "@/hooks/useFetch";
// types
import { PokeAPI } from "pokeapi-types";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokemonType = {
  name: string;
  url: string;
};

export default function PokeItem(pokemon: PokemonType) {
  const { data, isLoading, error } = useFetch<PokeAPI.Pokemon>(
    `${API_URL}/${pokemon.name}`,
  ) as {
    data: PokeAPI.Pokemon | null;
    isLoading: boolean;
    error: Error | null;
  };

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
            source={{ uri: data?.sprites.front_default }}
            placeholder={IMAGES.loading}
            style={styles.listingImage}
          />
          <Text style={styles.listingText}>{capitalize(pokemon.name)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
