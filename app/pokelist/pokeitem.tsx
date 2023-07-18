import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { ImageResult } from "expo-image-manipulator";
import { useRouter } from "expo-router";
// constants
import { IMAGES } from "@/constants";
import styles from "@/styles/common";
// util functions
import { capitalize } from "@/utils/string";
import { resizeImage } from "@/utils/imagemanipulate";
import useFetch from "@/hooks/useFetch";
// types
import { PokeAPI } from "pokeapi-types";
import { useEffect, useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokemonType = {
  name: string;
  url: string;
};

export default function PokeItem(pokemon: PokemonType) {
  const router = useRouter();
  const { data, isLoading, error } = useFetch<PokeAPI.Pokemon>(
    `${API_URL}/${pokemon.name}`,
  ) as {
    data: PokeAPI.Pokemon | null;
    isLoading: boolean;
    error: Error | null;
  };

  const [image, setImage] = useState<ImageResult>(null);

  useEffect(() => {
    // Image.clearDiskCache();
    if (!data) return;
    (async () => {
      const resizedImage = await resizeImage(
        data.sprites.front_default,
        { width: 400 },
        0.8,
      );
      setImage(resizedImage);
    })();
  }, [data]);

  const handlePress = () => {
    router.push(`/details/${pokemon.name}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.listing}>
      {isLoading ? (
        <>
          <Image source={IMAGES.loading} style={styles.listingImage} />
          <Text style={styles.listingText}>Loading...</Text>
        </>
      ) : error ? (
        <Text style={styles.listingText}>Something went wrong...</Text>
      ) : (
        <>
          <Image source={image} style={styles.listingImage} />
          <Text style={styles.listingText}>{capitalize(pokemon.name)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
