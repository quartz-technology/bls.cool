import {Alert, CloseIcon, HStack, IconButton, VStack, Text, useToast} from "native-base";
import {ToastType} from "./SignatureVerifier";

interface IProps {
    toast: ToastType;
    title: string;
    description: string;
    id: number;
    status: "success" | "error";
}

export default function ToastAlert({toast, title, description, id, status}: IProps) {
    return (
        <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status} variant={"top-accent"} >
            <VStack space={1} flexShrink={1} w="100%">
                <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="md" fontWeight="medium" flexShrink={1} color={"darkText"}>
                            {title}
                        </Text>
                    </HStack>
                    <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{color: "darkText"}} onPress={() => toast.close(id)} />
                </HStack>
                <Text px="6" color={"darkText"}>
                    {description}
                </Text>
            </VStack>
        </Alert>
    )
}
