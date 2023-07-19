import { View, Text } from "react-native";
// constants
import details from "../../styles/details";
import { COLORS, SIZES, TYPE_COLORS, TYPE_TEXT } from "../../constants";
// types
import { PokemonType } from "../../constants/types";

export default function Info({ pokemon }: { pokemon: PokemonType }) {
  if (!pokemon)
    return (
      <View style={details.container}>
        <Text style={details.text}>No pokemon selected</Text>
      </View>
    );
  return (
    <>
      <View style={details.mainInfo}>
        <Text style={details.h1}>{pokemon.name}</Text>
        <Text>#{pokemon.id}</Text>
        <Text>HP: {pokemon.stats[0].base_stat}</Text>
      </View>

      <View style={details.typeInfo}>
        {pokemon.types.map((type, index) => (
          <View
            key={`type-${index}`}
            style={{
              padding: SIZES.xs,
              backgroundColor: TYPE_COLORS[type.type.name],
              borderRadius: SIZES.xs,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                textTransform: "capitalize",
                color: COLORS[TYPE_TEXT[type.type.name]],
              }}
            >
              {type.type.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={details.physicalInfo}>
        <View style={details.physicalItem}>
          <Text style={details.h3}>{pokemon.height / 10} m</Text>
          <Text style={details.text}>Height</Text>
        </View>
        <View style={details.verticalDivider} />
        <View style={details.physicalItem}>
          <Text style={details.h3}>{pokemon.weight / 10} kg</Text>
          <Text style={details.text}>Weight</Text>
        </View>
      </View>
    </>
  );
}
