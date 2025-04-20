import { PropsWithChildren } from "react";
import { ShortcutProps, defaultShortcuts } from "@/style/shortcuts";
import { TextProps, Text as RNText } from "react-native";

interface CustomTextProps extends PropsWithChildren, ShortcutProps, TextProps {
    fontSize?: number
    bold?: boolean
    underline?: boolean
    color?: string
}

export function Text({
    fontSize = 18,
    bold,
    underline,
    color,
    children,
    ...restProps
}: CustomTextProps){
    return (
        <RNText style={[defaultShortcuts(restProps), {
            fontSize,
            fontWeight: bold ? "bold" : "normal",
            textDecorationLine: underline ? "underline" : "none",
            color,
        }]} {...restProps}>
            {children}
        </RNText>
    )
}