import { useTheme } from "@/src/contexts/ThemeContext";
import { useState } from "react";
import { LayoutAnimation, Platform, Pressable, UIManager, View } from "react-native";
import { P } from "./Text";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CollapseProps = {
  label: string;
  children: React.ReactNode;
}

export function Collapse({ label, children }: CollapseProps) {
  const [open, setOpen] = useState(false);
  const { theme, space } = useTheme();

  function toggle() : void{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  }

  return (
    <View style={{width: "100%", backgroundColor: theme.baseSoft}}>
      <Pressable
        onPress={toggle}
        style={{ backgroundColor: theme.blueCta, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: space[2], paddingVertical: space[3]}}
      >
        <P style={{ color: theme.ctaText }}>{label}</P>
        {open ? (
          <CaretUpIcon size={16} color={theme.ctaText}/>
        ) : (
          <CaretDownIcon size={16} color={theme.ctaText}/>
        )}
      </Pressable>

      {open && <View>{children}</View>}
    </View>
  )
}
