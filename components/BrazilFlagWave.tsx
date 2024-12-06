import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";

export function BrazilFlagWave() {
  const waveAnimation = useSharedValue(0);

  useEffect(() => {
    waveAnimation.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 300 }),
        withTiming(-10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${waveAnimation.value}deg` },
      { skewX: `${Math.sin(waveAnimation.value * 0.5)}deg` },
      { scaleX: 1 + Math.sin(waveAnimation.value * 0.1) * 0.05 },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>🇧🇷</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 68,
    marginTop: -6,
  },
});
