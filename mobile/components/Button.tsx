import { ShortcutProps, defaultShortcuts } from "@/style/shortcuts";
import {ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "./Text";
import { StyleSheet } from "react-native";

interface ButtonProps extends TouchableOpacityProps, ShortcutProps{
    variant?: "contained" | "outlined" | "ghost"
    isLoading?: boolean
}

export function Button({
    onPress,
    children,
    variant = "contained",
    isLoading,
    ...restProps
}: ButtonProps) {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={onPress}
            style={[
                defaultShortcuts(restProps),
                styles[variant].button,
                isLoading && disabled.button
            ]}
        >
            {isLoading ?
                <ActivityIndicator animating size={22} /> :
                <Text style={styles[variant].text}>{children}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = ({
    contained: StyleSheet.create({
        button: {
            padding: 15,
            borderRadius: 50,
            backgroundColor: "black"
        },
        text: {
            textAlign: "center",
            color: "white",
            fontSize: 20
        }
    }),
    outlined: StyleSheet.create({
        button: {
            padding: 15,
            borderRadius: 50,
            borderColor: "darkgray",
            borderWidth: 1
        },
        text: {
            textAlign: "center",
            color: "black",
            fontSize: 20
        }
    }),
    ghost: StyleSheet.create({
        button: {
            padding: 15,
            borderRadius: 50,
            backgroundColor: "transparent",
        },
        text: {
            textAlign: "center",
            color: "black",
            fontSize: 20
        }
    }),
})

const disabled = StyleSheet.create({
    button: {
        opacity: 0.5,
    }
})