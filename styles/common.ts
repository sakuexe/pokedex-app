import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  mainHeader: {
    fontSize: SIZES.xxl,
    fontWeight: "bold",
    color: COLORS.black,
    paddingVertical: SIZES.md,
    textAlign: "center",
  },
  bannerPrimary: {
    backgroundColor: COLORS.primary,
    width: "100%",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  bannerHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.white,
  },
  bannerText: {
    color: COLORS.white,
    textAlign: "center",
  },
  listContainer: {
    marginTop: SIZES.lg,
    marginBottom: SIZES.bottomPadding,
    marginHorizontal: SIZES.sm,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SIZES.sm,
    justifyContent: "center",
  },
  listing: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listingText: {
    color: COLORS.white,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default styles;
