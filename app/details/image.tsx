import { View, Text } from "react-native";
import { Image } from "expo-image";
// constants
import details from "../../styles/details";
// types
import { PokemonType } from "../../constants/types";

type ImageProps = {
  pokemon: PokemonType;
  isLoading: boolean;
  error: Error | null;
};

export default function PokemonImage(props: ImageProps) {
  return (
    <View style={details.imageContainer}>
      {props.isLoading ? (
        <Text style={details.text}>Loading...</Text>
      ) : props.error ? (
        <Text style={details.text}>Something went wrong...</Text>
      ) : (
        <Image
          source={
            props.pokemon?.sprites.other["official-artwork"].front_default
          }
          transition={{
            duration: 0.5,
            effect: "cross-dissolve",
            timing: "ease-in-out",
          }}
          style={details.image}
        />
      )}
    </View>
  );
}
