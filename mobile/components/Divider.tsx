import { defaultShortcuts, ShortcutProps } from "@/style/shortcuts";
import { View } from "react-native";

interface DividerProps extends ShortcutProps {}

export function Divider(props: DividerProps) {
    return (
        <View 
            style={[defaultShortcuts(props), {
                height: 1,
                width: "100%",
                backgroundColor: "lightgray",
            }]}
        />
    )
} 