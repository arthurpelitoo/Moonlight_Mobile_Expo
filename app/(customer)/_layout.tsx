import { useTheme } from "@/src/contexts/ThemeContext"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function Layout() {
    const { theme } = useTheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.iconBase,
                tabBarInactiveTintColor: theme.secondaryColor,
                tabBarStyle: {
                    backgroundColor: theme.baseSoft,
                    borderTopColor: theme.borderBase,
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
