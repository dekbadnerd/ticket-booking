import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

export default function Login() {
    const [authMode, setAuthMode] = useState<"login" | "register">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onToggleAuthMode = () => {
        setAuthMode(prevMode => prevMode === "login" ? "register" : "login")
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1}}>
                <VStack flex={1} justifyContent="center" alignItems="center" p={40} gap={40}>
                    <HStack gap={10}>
                        <Text fontSize={30} bold mb={20}>Ticket Booking</Text>
                        <TabBarIcon name="ticket" size={50} />
                    </HStack>

                    <VStack w={"100%"} gap={30}>

                        <VStack gap={5}>
                            <Text ml={10} fontSize={14} color="gray" bold={true}>Email</Text>
                            <Input
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor="darkgray"
                                autoCapitalize="none"
                                autoCorrect={false}
                                h={50}
                                p={15}
                            />
                        </VStack>

                        <VStack gap={5}>
                            <Text ml={10} fontSize={14} color="gray" bold={true}>Password</Text>
                            <Input
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="darkgray"
                                autoCapitalize="none"
                                autoCorrect={false}
                                h={50}
                                p={15}
                            />
                        </VStack>

                        <Button
                            isLoading={false} //TODO: Finish this once Auth Provider is ready
                            onPress={() => {}} //TODO:Finish this once Auth Provider is ready
                        >
                            {authMode === "login" ? "Login" : "Register"}
                        </Button>

                    </VStack>
                    <Divider w={"90%"}/>

                    <Text onPress={onToggleAuthMode} fontSize={16} underline>
                        {authMode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
                    </Text>

                </VStack>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}