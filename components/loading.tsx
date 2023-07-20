import { useEffect } from "react";
import { Animated, Easing, View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";

type LoadingProps = {
  color?: string;
};

export default function Loading(props: LoadingProps) {
  let spinValue = new Animated.Value(0);

  const rotate = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => rotate());
  };

  const rotateAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    rotate();
  }, [spinValue]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
        gap: 10,
      }}
    >
      <Animated.View
        style={{
          padding: SIZES.sm,
          width: 60,
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          borderColor: props.color ?? COLORS.black,
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderRadius: 16,
          elevation: 8,
          shadowColor: props.color ?? COLORS.black,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          transform: [{ rotate: rotateAnimation }],
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>ᐛ</Text>
      </Animated.View>
      <Text style={{ fontSize: SIZES.md }}>Loading...</Text>
    </View>
  );
}
