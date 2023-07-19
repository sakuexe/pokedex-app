import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Image } from "expo-image";
// constants
import { COLORS, TYPE_COLORS, ICONS, SIZES } from "../../constants";
import styles from "../../styles/common";
import details from "../../styles/details";
// util functions
import { capitalize } from "../../utils/string";
import useFetch from "../../hooks/useFetch";
// types
import { PokemonType } from "../../constants/types";
import Info from "./info";

export default function PokemonInfo() {
  const searchParams = useLocalSearchParams();

  const {
    data: pokemon,
    isLoading,
    error,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchParams.name}`) as {
    data: PokemonType | null;
    isLoading: boolean;
    error: Error | null;
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

      <View style={details.imageContainer}>
        {isLoading ? (
          <Text style={details.text}>Loading...</Text>
        ) : error ? (
          <Text style={details.text}>Something went wrong...</Text>
        ) : (
          <Image
            source={pokemon?.sprites.other["official-artwork"].front_default}
            transition={{
              duration: 0.5,
              effect: "cross-dissolve",
              timing: "ease-in-out",
            }}
            style={details.image}
          />
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ height: "100%", flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ height: SIZES.pokemonDetailImage }} />
        <Info pokemon={pokemon} />
      </ScrollView>
    </SafeAreaView>
  );
}
