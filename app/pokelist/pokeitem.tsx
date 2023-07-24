import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { ImageResult } from "expo-image-manipulator";
import { useRouter } from "expo-router";
import { NamedAPIResource, Pokemon, PokemonClient } from "pokenode-ts";
// custom components
import Loading from "../../components/loading";
import ErrorView from "../../components/error";
// constants
import { COLORS, ICONS, IMAGES } from "../../constants";
import styles from "../../styles/common";
// util functions
import { capitalize } from "../../utils/string";
import { resizeImage } from "../../utils/imagemanipulate";
import useFetch from "../../hooks/useFetch";
// types
import { PokeAPI } from "pokeapi-types";
import { useEffect, useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokeItemProps = {
  name: string;
  url: string;
};

export default function PokeItem(pokemon: PokeItemProps, index: number) {
  const router = useRouter();

  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const api = new PokemonClient();
      const data = await api.getPokemonByName(pokemon.name);
      setPokemonData(data);
      setIsLoading(false);
    }
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

  const handlePress = () => {
    router.push(`/details/${pokemon.name}`);
  };

  return (
    <TouchableOpacity key={index} onPress={handlePress} style={styles.listing}>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : error ? (
        <ErrorView noButton color={COLORS.white} message="No image found" />
      ) : (
        <>
          <Image
            source={pokemonData?.sprites.front_default || ICONS.loadcircle}
            style={{ width: "100%", height: "100%" }}
          />
          <Text style={styles.listingText}>{capitalize(pokemon.name)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
