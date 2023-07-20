import { View, Text, TouchableOpacity } from "react-native";
// constants
import { COLORS, SIZES } from "../constants";

type ErrorViewProps = {
  message?: string;
  reload?: () => void;
  color?: string;
};

export default function ErrorView(props: ErrorViewProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginVertical: 20,
      }}
    >
      <Text style={{ fontSize: SIZES.md }}>╰(・∇・╰)</Text>
      {props.message ? (
        <Text>{props.message}</Text>
      ) : (
        <Text>Something went wrong...</Text>
      )}
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 14,
          backgroundColor: props.color || COLORS.primary,
          borderRadius: SIZES.xs,
        }}
        onPress={() => {
          props.reload
            ? props.reload()
            : console.log("Reload function missing");
        }}
      >
        <Text style={{ color: COLORS.white }}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}
