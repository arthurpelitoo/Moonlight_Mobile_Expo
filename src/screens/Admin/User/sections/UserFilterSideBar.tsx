import { Button } from "../../../../components/common/Generic/Button/Button";
import { InputBar } from "../../../../components/common/Generic/InputBar";
import { useState } from "react";
import { useUserFilters } from "../../../../hooks/filters/admin/useUserFilters";
import { formatCPF } from "../../../../utils/Validation/dataRules/User/userCpf";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFetchRoles } from "@/src/hooks/fetchItems/admin/useFetchRoles";
import { Modal, ScrollView, View } from "react-native";
import { H3, P } from "@/src/components/common/Generic/Text";
import { XIcon } from "phosphor-react-native";

type UserFilterSideBarProps = {
  open: boolean;
  onClose: () => void;
}

export function UserFilterSideBar(props: UserFilterSideBarProps) {
  const { theme, space, radius, font } = useTheme();
  const { roles } = useFetchRoles();
  const { filters } = useUserFilters();

  const [cpf, setCpf] = useState(filters.cpf ?? "");
  const [email, setEmail] = useState(filters.email ?? "");

  const handleCleanUp = () => { setCpf(""); setEmail(""); filters.onCleanUpFilters?.(); props.onClose(); };
  const handleConfirm = () => { filters.onConfirmFilters?.(cpf.replace(/\D/g, ""), email); props.onClose(); };

  return (
    <Modal visible={props.open} animationType="slide" transparent onRequestClose={props.onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: theme.baseSoft, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, maxHeight: "80%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: space[5] }}>
            <H3>Filtros</H3>
            <Button variant="transparent" onPress={props.onClose}><XIcon size={20} color={theme.textPrimary} /></Button>
          </View>

          <ScrollView contentContainerStyle={{ padding: space[5], gap: space[5] }}>
            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Cargos</P>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space[2] }}>
                <Button variant="transparent"
                onPress={() => {
                  filters.onChangeRole("");
                  props.onClose();
                }}>
                  Limpar
                </Button>
                {roles?.map((role) => (
                  <Button
                    key={role.id_role}
                    variant={role.name === filters.role ? "cta" : "primary"}
                    onPress={() => {
                      filters.onChangeRole(role.name);
                      props.onClose()
                    }}
                    style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}
                  >
                    {role.name}
                  </Button>
                ))}
              </View>
            </View>

            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Email</P>
              <InputBar variant="secondary" value={email} onChangeText={setEmail} placeholder="ex: abc@servico.com" />
            </View>

            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>CPF</P>
              <InputBar variant="secondary" value={cpf} onChangeText={(v) => setCpf(formatCPF(v))} placeholder="ex: 000.000.000-00" maxLength={14} keyboardType="numeric" />
            </View>

            <Button variant="cta" style={{ padding: space[3], borderRadius: radius.md }} onPress={handleConfirm}><P>Aplicar filtros</P></Button>
            <Button variant="danger" style={{ padding: space[3], borderRadius: radius.md }} onPress={handleCleanUp}><P>Apagar filtros</P></Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
