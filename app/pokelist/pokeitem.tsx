import { Image, Text, View } from "react-native";
// constants
import { COLORS, IMAGES } from "@/constants";
import styles from "@/styles/common";

export default function PokeItem() {
  return (
    <View style={styles.listing}>
      <Image source={IMAGES.eevee} />
      <Text style={styles.listingText}>Eevee</Text>
    </View>
  );
}
