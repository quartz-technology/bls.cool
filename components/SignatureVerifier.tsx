import React from "react";
import {Button, TextArea, useToast, View, VStack, Text, Divider} from "native-base";
import * as bls from "@noble/bls12-381";
import {InterfaceToastProps} from "native-base/lib/typescript/components/composites/Toast";
import ToastAlert from "./ToastAlert";
import {isHexadecimal} from 'is-hexadecimal'

export type ToastType = {show: (props: InterfaceToastProps) => any, close: (id: any) => void, closeAll: () => void, isActive: (id: any) => boolean};

export default function SignatureVerifier() {
    const toast: ToastType = useToast();
    const [message, setMessage] = React.useState<string>("");
    const [signature, setSignature] = React.useState<string>("");
    const [pubKey, setPubKey] = React.useState<string>("");
    const [enabled, setEnabled] = React.useState<boolean>(false);

    React.useEffect(() => {
        const regexSignature = /^[a-fA-F0-9]{192}$/g
        const regexPublicKey = /^[a-fA-F0-9]{96}$/g

        if (signature.match(regexSignature) && pubKey.match(regexPublicKey)) {
            if (message.length % 2 == 0 && message.length != 0) {
                for (const c of message) {
                    if (!isHexadecimal(c)) {
                        setEnabled(false);
                        return;
                    }
                }
                setEnabled(true);
            } else {
                setEnabled(false);
            }
        } else {
            setEnabled(false);
        }
    }, [signature, message, pubKey]);

    return (
        <View>
            <VStack space={5} alignItems="center">
            <VStack space={10} alignItems={"start"}>
                <VStack space={2} alignItems={"start"}>
                    <Text fontSize={{
                        base: 'md',
                        md: 'lg',
                        lg: 'xl'
                    }} bold={true}>Enter your signature below:</Text>
                    <TextArea placeholder="..." w={[50, 100, 200, 400, 500]} maxW="500" h={"100vh"} maxH={"100"} value={signature} onChangeText={(newText) => {
                        setSignature(newText);
                    }} />
                </VStack>
                <Divider />
                <VStack space={2} alignItems={"start"}>
                    <Text fontSize={{
                        base: 'md',
                        md: 'lg',
                        lg: 'xl'
                    }} bold={true}>Enter your message below:</Text>
                    <TextArea placeholder="dead..." w={[50, 100, 200, 400, 500]} maxW="500" h={"100vh"} maxH={"100"} value={message} onChangeText={(newText) => {
                        setMessage(newText);
                    }} />
                </VStack>
                <Divider />
                <VStack space={2} alignItems={"start"}>
                    <Text fontSize={{
                        base: 'md',
                        md: 'lg',
                        lg: 'xl'
                    }} bold={true}>Enter your public key below:</Text>
                    <TextArea placeholder="beef..." w={[50, 100, 200, 400, 500]} maxW="500" h={"100vh"} maxH={"100"} value={pubKey} onChangeText={(newText) => {
                        setPubKey(newText);
                    }} />
                </VStack>
            </VStack>
                <Button isDisabled={!(enabled)} onPress={async () => {
                    const isVerified = (await bls.verify(signature, message, pubKey));
                    let status: "error" | "success" = "error";
                    let title = "failed"
                    let description = "The signature does not match the public key / message.";

                    if (isVerified) {
                        status = "success";
                        title = "succeeded"
                        description = "The signature corresponds to the public key / message."
                    }

                    toast.show({ render: ({ id }) => {
                            return <ToastAlert toast={toast} title={"Verification " + title} description={description} id={id} status={status} />;
                        }
                    });
                }}>
                    Verify Signature
                </Button>
            </VStack>
        </View>
    )
}
