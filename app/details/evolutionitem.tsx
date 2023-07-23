import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// hooks
import useFetch from "../../hooks/useFetch";
// types
import { PokeAPI } from "pokeapi-types";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function EvolutionItem({
  name,
  key,
}: {
  name: string;
  key: string | number;
}) {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useFetch<PokeAPI.Pokemon>(`${API_URL}/${name}`);

  return (
    <TouchableOpacity key={key}>
      <Image />
      <Text>{name}</Text>
      <Text>{`${API_URL}/${name}`}</Text>
    </TouchableOpacity>
  );
}
