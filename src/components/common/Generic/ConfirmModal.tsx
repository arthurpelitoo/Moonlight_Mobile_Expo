import { Modal, View } from "react-native";
import { Button } from "./Button/Button";
import { P } from "./Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { ReactNode } from "react";

type ConfirmModalProps = {
  icon: ReactNode;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ icon, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  const { theme, space, radius, font, fontSize } = useTheme();

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center" }}>
        <View style={{
          backgroundColor: theme.baseSoft,
          borderWidth: 1,
          borderColor: theme.borderBase,
          borderRadius: radius.xl,
          padding: space[8],
          width: 340,
          gap: space[6],
        }}>
          <View style={{ gap: space[2] }}>
            {icon}
            <P style={{ color: theme.textPrimary, fontFamily: font.baseMedium }}>{title}</P>
            <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor, lineHeight: 20 }}>{message}</P>
          </View>

          <View style={{ flexDirection: "row", gap: space[2], justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              onPress={onCancel}
              style={{ paddingHorizontal: space[4], paddingVertical: space[2], borderRadius: radius.md, borderWidth: 1, borderColor: theme.borderBase }}
            >
              <P style={{ color: theme.secondaryColor, fontSize: fontSize.sm }}>Cancelar</P>
            </Button>
            <Button
              variant="danger"
              onPress={onConfirm}
              style={{ paddingHorizontal: space[4], paddingVertical: space[2], borderRadius: radius.md }}
            >
              <P style={{ color: "#FFF", fontSize: fontSize.sm, fontFamily: font.baseMedium }}>Confirmar</P>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
