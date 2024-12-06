import { Image, StyleSheet, Platform } from "react-native";

import { BrazilFlagWave } from "@/components/BrazilFlagWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerHeight={160}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem vindo!</ThemedText>
        <BrazilFlagWave />
      </ThemedView>

      <ExternalLink
        style={{ marginTop: -40 }}
        href="https://www.youtube.com/@metalcodebr"
      >
        <ThemedText
          allowFontScaling={false}
          style={{ fontSize: 14 }}
          type="link"
        >
          Follow me on youtube{" "}
          <ThemedText
            type="link"
            style={{ fontSize: 14, textDecorationLine: "underline" }}
          >
            @metalcodebr
          </ThemedText>
        </ThemedText>
      </ExternalLink>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: 🔍 Explore</ThemedText>

        <ThemedText>
          Navigate to{" "}
          <ThemedText type="defaultSemiBold">
            app/(components)/index.tsx
          </ThemedText>{" "}
          to start experimenting with your favorite components.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
