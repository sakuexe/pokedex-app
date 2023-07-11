import { Image, Text, View, TouchableOpacity } from "react-native";
// constants
import { COLORS, IMAGES } from "@/constants";
import styles from "@/styles/common";

export default function PokeItem() {
  return (
    <TouchableOpacity style={styles.listing}>
      <Image source={IMAGES.eevee} />
      <Text style={styles.listingText}>Eevee</Text>
    </TouchableOpacity>
  );
}
