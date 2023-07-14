import { Image, Text, View, TouchableOpacity } from "react-native";
// constants
import { COLORS, IMAGES } from "@/constants";
import styles from "@/styles/common";
// util functions
import { capitalize } from "@/utils/string";

const API_URL = "https://pokeapi.co/api/v2/";

export type PokemonType = {
  name: string;
  url: string;
};

export default function PokeItem(pokemon: PokemonType) {
  return (
    <TouchableOpacity style={styles.listing}>
      <Image source={IMAGES.eevee} />
      <Text style={styles.listingText}>{capitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
}
