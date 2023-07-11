import { Stack } from "expo-router";
import { Image, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
// react hooks
import React, { Dispatch, SetStateAction, useState } from "react";
// constants
import { COLORS } from "@/constants";
import styles from "@/styles/common";
import images from "@/constants/images";
// custom components
import PokeItem from "./pokeitem";
// data
import { REGIONS, RegionType } from "@/assets/json/regions";

export default function Pokelist() {
  const [region, setRegion] = useState("");
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

      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <RegionFilter currentRegion={region} setRegion={setRegion} />
        <View style={styles.listContainer}>
          {[...Array(20)].map((element: number, index: number) => (
            <PokeItem key={index} />
          ))}
          <PokeItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type RegionfilterProps = {
  currentRegion: string;
  setRegion: Dispatch<SetStateAction<string>>;
};

function RegionFilter(props: RegionfilterProps) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter by Region:</Text>
      <Picker
        selectedValue={props.currentRegion}
        onValueChange={(itemValue, itemIndex) => props.setRegion(itemValue)}
      >
        {REGIONS.map((region: RegionType, index: number) => (
          <Picker.Item
            key={index}
            label={`${index + 1}. ${region.name} (${region.first}-${
              region.last
            })`}
            value={region.name}
          />
        ))}
      </Picker>
    </View>
  );
}
