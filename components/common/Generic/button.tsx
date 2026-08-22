import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

type Props = {
    onPress: () => void;
    children: string;
}

export const Button = (props: Props) => {
    const { theme, font, fontSize, space, radius } = useTheme()
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                backgroundColor: theme.primary,
                width: 200,
                height: 100,
                borderRadius: radius.lg,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: space[5]
            }}
        >
            <Text
                style={{
                    color: theme.primaryText,
                    fontFamily: font.baseBold,
                    fontSize: fontSize.h4,
                }}
            >{props.children}</Text>
        </TouchableOpacity>
    )
}
