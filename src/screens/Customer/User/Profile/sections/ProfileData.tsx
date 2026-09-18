
import { Card } from "@/src/components/common/Generic/Card/Card";
import { useAuth } from "../../../../../hooks/auth/useAuth";
import { formatCPF } from "../../../../../utils/Validation/dataRules/User/userCpf";
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader";
import { H1, P } from "@/src/components/common/Generic/Text";
import { View } from "react-native";
import { AddressBookIcon, CoffeeIcon, EnvelopeIcon, UserIcon } from "phosphor-react-native";
import { useTheme } from "@/src/contexts/ThemeContext";

export function ProfileData() {
    const {theme, space} = useTheme();
    const {user} = useAuth();
    const isAdmin = user!.roles.includes("admin");

    return(
          <Card variant="solid" style={{gap: space[4], padding: space[8]}}>
            <CardHeader><H1 style={{textAlign: "center"}}>Meu Perfil:</H1></CardHeader>
            { user && (
              <View style={{alignContent: "center"}}>
                <P numberOfLines={1} style={{flex: 0, height: "auto"}}><UserIcon color={theme.iconBase} size={24} weight="thin" /> Nome: {user.name}</P>
                <P numberOfLines={1} style={{flex: 0, height: "auto"}}><EnvelopeIcon color={theme.iconBase} size={24} weight="thin" /> Email: {user.email}</P>
                <P numberOfLines={1} style={{flex: 0, height: "auto"}}><AddressBookIcon color={theme.iconBase} size={24} weight="thin" /> Cpf: {formatCPF(user.cpf)}</P>
                {isAdmin && (
                  <P numberOfLines={1} style={{flex: 0, height: "auto"}}><CoffeeIcon color={theme.iconBase} size={24} weight="thin" /> Admin</P>
                )}
              </View>
            )}
          </Card>
    )
}
