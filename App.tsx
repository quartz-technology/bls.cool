import React from "react";
import {
  Text,
  HStack,
  Center,
  Switch,
  useColorMode,
  NativeBaseProvider,
} from "native-base";
import SignatureVerifier from "./components/SignatureVerifier";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export default function App() {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={3}>
                <SignatureVerifier />
            </Center>
        </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
