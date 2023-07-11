import { StyleSheet } from "react-native";

import { COLORS } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
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
    flexDirection: "row",
  },
  listing: {
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
