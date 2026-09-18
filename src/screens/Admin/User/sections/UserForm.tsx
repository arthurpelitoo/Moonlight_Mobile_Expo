import { View } from "react-native";
import { AddressBookIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockKeyIcon, UserIcon } from "phosphor-react-native";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { LoadingDots } from "@/src/components/common/Forms/LoadingDots";
import { InputFieldForm } from "@/src/components/common/Forms/InputFieldForm";
import { PasswordStrength } from "@/src/components/common/Forms/VerifyComponents/PasswordStrength";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { isNameValid } from "@/src/utils/Validation/dataRules/User/userName";
import { formatCPF, isCPFValid } from "@/src/utils/Validation/dataRules/User/userCpf";
import { isEmailValid } from "@/src/utils/Validation/dataRules/User/userEmail";
import { useUserForm } from "@/src/hooks/validation/Admin/useUserForm";
import { useFetchRoles } from "@/src/hooks/fetchItems/admin/useFetchRoles";
import { hasSelectedRole } from "@/src/utils/Validation/dataRules/User/userRole";
import { P, H3 } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useCallback, useMemo } from "react";
import type { UserResponseDTO } from "@/src/@types/user/user.dto";
import { useFocusEffect } from "expo-router";

type UserFormProps = { mode: "create" | "edit"; user?: UserResponseDTO };

export function UserForm({ mode, user }: UserFormProps) {
  const { theme, space, radius, font, fontSize } = useTheme();
  const { roles } = useFetchRoles();

  const RoleIds = useMemo(() => {
    return user?.roles!
      .map((name) => roles.find((role) => role.name === name)?.id_role)
      .filter((id_role): id_role is number => id_role !== undefined) ?? [];
  }, [user, roles]);

  const { fields, setField, showErrors, toggleRole, toggleShowConfirm, toggleShowPassword, ui, handleBlur, handleSubmit, resetForm } =
    useUserForm(mode, user ? {
      name: user.name ?? "", email: user.email ?? "", cpf: user.cpf ?? "",
      password: "", confirmPassword: "", id_roles: RoleIds,
    } : undefined);

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [user])
  )

  if (ui.submitted && !ui.apiError && ui.success) {
    return (
      <View style={{ alignItems: "center", gap: space[6], paddingVertical: space[8] }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
          <CheckIcon size={32} color={theme.success} weight="bold" />
        </View>
        <H3>{mode === "create" ? "Usuário cadastrado!" : "Usuário atualizado!"}</H3>
      </View>
    );
  }

  return (
    <View style={{ gap: space[3], width: "100%" }}>
      <InputFieldForm label="Nome de usuário" value={fields.name} onChangeState={setField("name")} onBlur={handleBlur("name")} maxLength={16} icon={<UserIcon size={18} color={theme.secondaryColor} />} placeholder="Escreva o nome" />
      <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />

      <InputFieldForm label="CPF" keyboardType="numeric" value={formatCPF(fields.cpf)} onChangeState={(v) => setField("cpf")(formatCPF(v))} onBlur={handleBlur("cpf")} maxLength={14} icon={<AddressBookIcon size={18} color={theme.secondaryColor} weight="thin" />} placeholder="ex: 000.000.000-00" />
      <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O CPF não é válido" />

      <InputFieldForm label="Email" keyboardType="email-address" autoCapitalize="none" value={fields.email} onChangeState={setField("email")} onBlur={handleBlur("email")} maxLength={30} icon={<EnvelopeIcon size={18} color={theme.secondaryColor} />} placeholder="Escreva o email" />
      <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido" />

      <InputFieldForm label="Senha" secureTextEntry={!ui.showPassword} value={fields.password} onChangeState={setField("password")} onBlur={handleBlur("password")} maxLength={16} icon={<LockKeyIcon size={18} color={theme.secondaryColor} />} placeholder="Escreva uma senha forte"
        rightElement={<Button onPress={toggleShowPassword} variant="transparent">{ui.showPassword ? <EyeSlashIcon size={18} color={theme.secondaryColor} /> : <EyeIcon size={18} color={theme.secondaryColor} />}</Button>} />
      <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />

      <InputFieldForm label="Confirmar senha" secureTextEntry={!ui.showConfirm} value={fields.confirmPassword} onChangeState={setField("confirmPassword")} onBlur={handleBlur("confirmPassword")} maxLength={16} icon={<LockKeyIcon size={18} color={theme.secondaryColor} />} placeholder="Confirme a senha"
        rightElement={<Button onPress={toggleShowConfirm} variant="transparent">{ui.showConfirm ? <EyeSlashIcon size={18} color={theme.secondaryColor} /> : <EyeIcon size={18} color={theme.secondaryColor} />}</Button>} />
      <FieldVerify showError={showErrors.showErrorConfirmPass} passed={fields.password === fields.confirmPassword} errorMessage="As senhas não coincidem" />

      <View style={{ gap: space[2] }}>
        <P style={{ fontFamily: font.baseMedium }}>Cargos</P>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space[2] }}>
          {roles.map((role) => {
            const active = fields.id_roles.includes(role.id_role!);
            return (
              <Button key={role.id_role} variant={active ? "cta" : "primary"} onPress={() => toggleRole(role.id_role!)} style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}>
                <P style={{ color: active ? "#FFF" : theme.textPrimary }}>{role.name}</P>
              </Button>
            );
          })}
        </View>
        <FieldVerify showError={showErrors.showErrorUserRoles} passed={hasSelectedRole(fields.id_roles)} errorMessage="O usuário precisa de pelo menos um cargo" />
      </View>

      {ui.apiError && <P style={{ color: theme.danger, textAlign: "center", fontSize: fontSize.sm }}>{ui.apiError}</P>}

      <Button onPress={() => handleSubmit(user?.id_user)} disabled={ui.loading} variant="cta" style={{ padding: space[3], borderRadius: radius.md, marginTop: space[2] }}>
        {ui.loading ? <LoadingDots /> : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: space[2], justifyContent: "center" }}>
            <P style={{ color: "#FFF", textTransform: "uppercase", fontFamily: font.baseMedium }}>{mode === "create" ? "Cadastrar Usuário" : "Salvar Alterações"}</P>
            <ArrowRightIcon size={16} color="#FFF" weight="bold" />
          </View>
        )}
      </Button>
    </View>
  );
}
