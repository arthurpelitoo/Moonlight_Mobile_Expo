import { DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { ReactNode } from "react";
import { hexToRgb } from "@/src/utils/hexToRgb";

type CustomDrawerItemProps = {
  label: string;
  href: string;
  icon: (props: { size: number; color: string }) => ReactNode;
};

export function CustomDrawerItem({ label, href, icon }: CustomDrawerItemProps) {
  const { theme, radius, font } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isFocused = pathname === href;

  const activeColor = theme.inverseBase;     // mesma cor usada em drawerActiveTintColor
  const inactiveColor = theme.textPrimary;   // mesma cor usada em drawerInactiveTintColor
  const color = isFocused ? activeColor : inactiveColor;

  const activeBackgroundColor = `rgba(${hexToRgb(activeColor)}, 0.12)`;

  return (
    <DrawerItem
      label={label}
      focused={isFocused}
      activeBackgroundColor={activeBackgroundColor}
      icon={({ size }) => icon({ size, color })}
      labelStyle={{ color, fontFamily: font.base }}
      style={{ borderRadius: radius.md }}
      onPress={() => router.push(href as any)}
    />
  );
}
