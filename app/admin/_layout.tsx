import { useTheme } from "@/src/contexts/ThemeContext"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function Layout() {
    const { theme } = useTheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.secondaryColor,
                tabBarStyle: {
                    backgroundColor: theme.secondaryBg,
                    borderTopColor: theme.borderColor,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="home" color={color} />
                }}
            />
        </Tabs>
    )
}
