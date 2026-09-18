import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { H1 } from "@/src/components/common/Generic/Text";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFetchUser } from "@/src/hooks/fetchItems/fetchOne/useFetchUser";
import { UserForm } from "./sections/UserForm";
import { useCallback } from "react";

export default function UserEditPage() {
  const { theme, space } = useTheme();
  const router = useRouter();
  const { id_user } = useLocalSearchParams<{ id_user: string }>();
  const { user, isLoading } = useFetchUser(Number(id_user));

  if (isLoading) {
    return (
      <GradientBackground style={{ justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </GradientBackground>
    );
  }
  if (!user) return null;

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView contentContainerStyle={{ padding: space[5] }}>
          <Card variant="solid" style={{ alignItems: "stretch", gap: space[6], padding: space[6] }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
              <Button variant="primary" onPress={() => router.back()} style={{ padding: space[2], borderRadius: 12 }}>
                <ArrowLeftIcon size={24} color={theme.textPrimary} weight="thin" />
              </Button>
              <H1>Editar Usuário:</H1>
            </View>
            <UserForm mode="edit" user={user} />
          </Card>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
