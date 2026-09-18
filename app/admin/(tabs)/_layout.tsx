import { useTheme } from "@/src/contexts/ThemeContext"
import { Tabs } from "expo-router"
import { GameControllerIcon, GaugeIcon, TagIcon, UsersThreeIcon } from "phosphor-react-native"

export default function TabsLayout() {
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
                name="index"
                options={{
                    title: "Painel Adm.",
                    tabBarIcon: ({ color }) => <GaugeIcon size={18} color={color} />
                }}
            />
            <Tabs.Screen
                name="games"
                options={{
                    title: "Dashb. Jogos",
                  tabBarIcon: ({ color }) => <GameControllerIcon size={18} color={color} />
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: "Dashb. Usuario",
                  tabBarIcon: ({ color }) => <UsersThreeIcon size={18} color={color} />
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: "Dashb. Categoria",
                  tabBarIcon: ({ color }) => <TagIcon size={18} color={color} />
                }}
            />
        </Tabs>
    )
}
