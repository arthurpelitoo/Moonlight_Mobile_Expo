import { DARK, FONT, FONT_SIZE, LIGHT, RADIUS, SPACE, ThemeColor } from "@/style/theme-pattern";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  currentColor: ThemeColor;
  theme: typeof DARK;
  font: typeof FONT;
  fontSize: typeof FONT_SIZE;
  space: typeof SPACE;
  radius: typeof RADIUS;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const colorSchema = useColorScheme();
  const [color, setColor] = useState<ThemeColor>(colorSchema ?? "dark"); // light e dark
    const [theme, setTheme] = useState(DARK); // Hexadecimal

    const toggleTheme = () => {
        if (color === "light") {
          setTheme(DARK);
          setColor("dark");
        } else if (color === "dark") {
          setTheme(LIGHT);
          setColor("light");
        } else {
          setTheme(DARK);
          setColor("dark");
        }
    }

    useEffect(() => {
      if (colorSchema === "light") {
        setColor("light");
        setTheme(LIGHT);
      } else {
        setColor("dark");
        setTheme(DARK);
      }
    }, [colorSchema])

    return (
        <ThemeContext.Provider value={{
            currentColor: color,
            theme: theme,
            font: FONT,
            fontSize: FONT_SIZE,
            radius: RADIUS,
            space: SPACE,
            toggleTheme: toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === null) {
      throw new Error("Use dentro do <ThemeContext>")
  }
  return context;
}
