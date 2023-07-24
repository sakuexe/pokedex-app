import { Stack } from "expo-router";
import { Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
// react hooks
import React, { useEffect, useState } from "react";
// custom hooks
import useFetch from "../../hooks/useFetch";
import { removeData } from "../../utils/datastore";
// constants
import { COLORS, SIZES } from "../../constants";
import styles from "../../styles/common";
// custom components
import PokeItem from "./pokeitem";
import { PokeItemProps } from "./pokeitem";
import ErrorView from "../../components/error";
import Loading from "../../components/loading";
// data
import { REGIONS } from "../../assets/json/regions";
import PickerFilter from "./filter";

const API_URL = "https://pokeapi.co/api/v2";

type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeItemProps[];
};

export default function Pokelist() {
  const [region, setRegion] = useState(0);
  const { data, isLoading, error, refetch } = useFetch<PokemonList>(
    `${API_URL}/pokemon?limit=24`,
  );
  const pokemonList = Array<PokeItemProps>();

  useEffect(() => {
    if (data) {
      pokemonList.push(...data.results);
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerShadowVisible: false,
          headerTitle: "Full Pokedex ඞ",
          headerTitleAlign: "center",
          headerTintColor: COLORS.white,
        }}
      />
      <FlatList
        numColumns={3}
        ListHeaderComponent={
          <>
            <PickerFilter
              currentState={region}
              setState={setRegion}
              selection={REGIONS}
            />
            <TouchableOpacity
              onPress={() => {
                removeData(true);
              }}
            >
              <Text>Remove Cache</Text>
            </TouchableOpacity>
          </>
        }
        style={{ backgroundColor: COLORS.white }}
        contentContainerStyle={{
          paddingBottom: 50,
          gap: SIZES.sm,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: SIZES.sm,
        }}
        data={pokemonList}
        renderItem={({ item }) => <PokeItem name={item.name} url={item.url} />}
        keyExtractor={(item: PokeItemProps) => item.name}
        onEndReached={() => {
          console.log("end reached");
          // if (data?.next) {
          //   refetch(data.next);
          // }
        }}
      />
    </SafeAreaView>
  );
}
