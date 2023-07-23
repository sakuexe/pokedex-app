import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// components
import Loading from "../../components/loading";
import Error from "../../components/error";
// hooks
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
// types
import { PokeAPI } from "pokeapi-types";
import { COLORS, TYPE_COLORS } from "../../constants";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function EvolutionItem({
  name,
  key,
}: {
  name: string;
  key?: string | number;
}) {
  const {
    data: pokemon,
    isLoading,
    error,
    refetch,
  } = useFetch<PokeAPI.Pokemon>(`${API_URL}/${name}`);

  const [imageUrl, setImageUrl] = useState<string>();
  const [pokemonType, setPokemonType] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    setImageUrl(pokemon?.sprites.front_default);
    setPokemonType(pokemon?.types[0].type.name);
  }, [pokemon]);

  if (isLoading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <TouchableOpacity
      key={key}
      onPress={() => {
        router.push(`/details/${name}`);
      }}
      style={{
        width: "25%",
        backgroundColor: TYPE_COLORS[pokemonType] || COLORS.black,
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      }}
    >
      <Image source={imageUrl} style={{ width: "100%", aspectRatio: 1 }} />
    </TouchableOpacity>
  );
}
