import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// components
import Loading from "../../components/loading";
// hooks
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
// types
import { PokeAPI } from "pokeapi-types";
import { COLORS, TYPE_COLORS } from "../../constants";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function EvolutionItem({ name }: { name: string }) {
  const { data: pokemon, isLoading } = useFetch<PokeAPI.Pokemon>(
    `${API_URL}/${name}`,
  );

  const [imageUrl, setImageUrl] = useState<string>();
  const [pokemonType, setPokemonType] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    setImageUrl(pokemon?.sprites.front_default);
    setPokemonType(pokemon?.types[0].type.name);
  }, [pokemon]);

  if (isLoading) return <Loading />;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/details/${name}`);
      }}
      style={{
        width: "25%",
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
        padding: 5,
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      }}
    >
      <Image
        source={imageUrl}
        style={{ width: "100%", aspectRatio: 1, zIndex: 1 }}
      />
      {/* This is added so that the background color will be lighter 
      without needing to add a lighter version for every color */}
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: TYPE_COLORS[pokemonType] || COLORS.whiteDarker,
          position: "absolute",
          top: 0,
          left: 0,
          transform: [{ scale: 1.4 }],
          zIndex: -1,
          opacity: 0.5,
        }}
      />
    </TouchableOpacity>
  );
}
