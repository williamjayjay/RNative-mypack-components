import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import InteractiveTextInput from "@/components/InteractiveTextInput/InteractiveTextInput";

export default function TabTwoScreen() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPasswd, setInputPasswd] = useState("");
  const [seePasswd, setsSeePasswd] = useState(false);

  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerHeight={160}
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Components</ThemedText>
      </ThemedView>

      <ExternalLink
        style={{ marginTop: -24 }}
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

      <ThemedText>This app includes my components favorites.</ThemedText>
      <Collapsible title="InputField">
        <ThemedText style={{ fontSize: 14, marginBottom: 3, color: "orange" }}>
          This is React Native Interactive Text Input:
        </ThemedText>

        <InteractiveTextInput
          editable={true}
          allowFontScaling={false}
          value={inputEmail}
          onChangeText={(value) => setInputEmail(value)}
          placeholder={"william@mail.com.br"}
          originalColor="#505050"
          mainColor={colorScheme === "dark" ? "#FFF" : "#000"}
          placeholderTextColor="#505050"
          textInputStyle={{
            width: "100%",
            backgroundColor: "transparent",
            color: colorScheme === "dark" ? "#FFF" : "#000",
          }}
        />

        <InteractiveTextInput
          placeholder="Password"
          value={inputPasswd}
          onChangeText={(value) => setInputPasswd(value)}
          enableIcon
          originalColor="#505050"
          mainColor={colorScheme === "dark" ? "#FFF" : "#000"}
          placeholderTextColor="#505050"
          textInputStyle={{
            width: "100%",
            backgroundColor: "transparent",
            color: colorScheme === "dark" ? "#FFF" : "#000",
            marginTop: 16,
          }}
          secureTextEntry={!seePasswd}
          IconComponent={
            seePasswd ? (
              <IconSymbol
                style={{ alignSelf: "center", marginTop: 15 }}
                size={24}
                name="eye"
                color="#505050"
              />
            ) : (
              <IconSymbol
                style={{ alignSelf: "center", marginTop: 15 }}
                size={24}
                name="eye.slash"
                color="#505050"
              />
            )
          }
          onIconPress={() => {
            setsSeePasswd(!seePasswd);
          }}
        />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
  },
});
