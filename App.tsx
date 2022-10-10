import React from "react";
import {
  Center,
  NativeBaseProvider,
} from "native-base";
import SignatureVerifier from "./components/SignatureVerifier";

export default function App() {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={3}>
                <SignatureVerifier />
            </Center>
        </NativeBaseProvider>
  );
}
