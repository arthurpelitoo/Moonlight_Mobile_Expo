import { useTheme } from "@/src/contexts/ThemeContext"
import { Tabs } from "expo-router"
import { HouseIcon, ShoppingCartIcon} from "phosphor-react-native"

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
                    title: "Home",
                    tabBarIcon: ({ color }) => <HouseIcon size={18} color={color} />
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Carrinho",
                  tabBarIcon: ({ color }) => <ShoppingCartIcon size={18} color={color} />
                }}
            />
        </Tabs>
    )
}
