import { StyleSheet } from "react-native";

import { COLORS } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
});

export default styles;
