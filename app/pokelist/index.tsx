import { Stack } from "expo-router";
import { Image, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
// react hooks
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// constants
import { COLORS } from "../../constants";
import styles from "../../styles/common";
import images from "../../constants/images";
// custom components
import PokeItem from "./pokeitem";
// data
import { REGIONS, RegionType } from "../../assets/json/regions";

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
        <SelectionFilter
          currentState={region}
          setState={setRegion}
          selection={REGIONS}
        />
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

type FilterProps = {
  currentState: string;
  setState: Dispatch<SetStateAction<string>>;
  selection: any[];
  label?: string;
};

function SelectionFilter(props: FilterProps) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{props.label ? props.label : ""}</Text>
      <View style={styles.filterPicker}>
        <Picker
          mode="dialog"
          style={{
            color: COLORS.white,
            fontWeight: "bold",
          }}
          selectedValue={props.currentState}
          onValueChange={(itemValue, itemIndex) => props.setState(itemValue)}
        >
          {props.selection.map((item: any, index: number) => (
            <Picker.Item
              key={index}
              label={
                `${index + 1}. ${item.name} ` +
                (item.first && item.last ? `(${item.first}-${item.last})` : "")
              }
              value={item.name}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
