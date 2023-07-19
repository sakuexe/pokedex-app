import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
// constants
import { COLORS, TYPE_COLORS, ICONS, SIZES } from "../../constants";
// util functions
import { capitalize } from "../../utils/string";
import useFetch from "../../hooks/useFetch";
// types
import { PokemonType } from "../../constants/types";
import Info from "./info";
import PokemonImage from "./image";
import details from "../../styles/details";
import Evolution from "./evolution";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PokemonInfo() {
  const searchParams = useLocalSearchParams();

  const {
    data: pokemon,
    isLoading,
    error,
    refetch,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchParams.name}`) as {
    data: PokemonType | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: TYPE_COLORS[pokemon?.types[0].type.name],
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: TYPE_COLORS[pokemon?.types[0].type.name],
          },
          headerShadowVisible: false,
          headerTitle: `#${pokemon?.id} — ${capitalize(
            searchParams.name.toString(),
          )}`,
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />

      <PokemonImage pokemon={pokemon} isLoading={isLoading} error={error} />

      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ height: "100%", flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ height: SIZES.pokemonDetailImage }} />
        <View style={details.container}>
          <Info pokemon={pokemon} />
          <View style={details.horizontalDivider} />
          {isLoading || !pokemon ? (
            <Text>loading...</Text>
          ) : error ? (
            <>
              <Text>something went wrong...</Text>
              <TouchableOpacity onPress={() => refetch}>
                <Text>Reload</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Evolution pokemonId={pokemon.id} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
