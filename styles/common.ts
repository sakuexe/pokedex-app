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
    width: 120,
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  listingText: {
    color: COLORS.white,
    fontWeight: "bold",
    marginTop: -14,
    paddingBottom: 20,
  },
  listingImage: {
    width: "100%",
    height: "100%",
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.sm,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    paddingHorizontal: SIZES.sm,
    paddingBottom: SIZES.lg,
    borderBottomEndRadius: SIZES.lg,
    borderBottomStartRadius: SIZES.lg,
  },
  filterPicker: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
  },
  filterText: {
    fontSize: SIZES.md,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default styles;
