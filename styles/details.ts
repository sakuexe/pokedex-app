import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const detailsStyles = StyleSheet.create({
  h1: {
    fontSize: SIZES.xxl,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  h2: {
    fontSize: SIZES.xl,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  h3: {
    fontSize: SIZES.lg,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  h4: {
    fontSize: SIZES.md,
    textTransform: "capitalize",
  },
  h5: {
    fontSize: SIZES.xs,
    textTransform: "capitalize",
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.md,
  },
  imageContainer: {
    width: "100%",
    height: SIZES.pokemonDetailImage,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xl,
    marginHorizontal: SIZES.sm,
    borderTopStartRadius: SIZES.xl,
    borderTopEndRadius: SIZES.xl,
  },
  mainInfo: {
    width: "100%",
    alignItems: "center",
  },
  typeInfo: {
    flexDirection: "row",
    gap: SIZES.sm,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.md,
  },
  physicalInfo: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: SIZES.md,
    width: "100%",
    marginVertical: SIZES.lg,
  },
  physicalItem: {
    width: "20%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: COLORS.black,
    opacity: 0.2,
  },
  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.black,
    marginVertical: SIZES.lg,
    opacity: 0.2,
  },
});

export default detailsStyles;
