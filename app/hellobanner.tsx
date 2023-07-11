import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
// constants
import { ICONS } from "../constants";
import styles from "../styles/common";

export default function HelloBanner() {
  const [showBannerText, setShowBannerText] = useState(true);
  const handlePress = () => {
    setShowBannerText((s: boolean) => !s);
  };

  return (
    <View style={styles.bannerPrimary}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={ICONS.pokeball}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </TouchableOpacity>
      {showBannerText && (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.bannerHeader}>Crossplatform Pokedex</Text>
          <Text style={styles.bannerText}>
            This is my first React Native application. I am using the Poke API
            to fetch data and display it here.
          </Text>
        </View>
      )}
    </View>
  );
}
