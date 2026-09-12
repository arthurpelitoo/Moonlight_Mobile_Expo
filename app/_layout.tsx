import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { IconContext } from "phosphor-react-native";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from '@/src/contexts/ThemeContext';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <InnerLayout/>
    </ThemeProvider>
  );
}

function InnerLayout() {
  const {theme} = useTheme();
  return(
    <IconContext.Provider value={{ color: theme.iconBase, size: 24, weight: "regular" }}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </IconContext.Provider>
  )
}
