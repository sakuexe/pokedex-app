import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const detailsStyles = StyleSheet.create({
  text: {
    color: COLORS.black,
    fontSize: SIZES.md,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.md,
    borderTopStartRadius: SIZES.xl,
    borderTopEndRadius: SIZES.xl,
  },
});

export default detailsStyles;
