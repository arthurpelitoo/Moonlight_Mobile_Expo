import { useAuth } from "../../../../../hooks/auth/useAuth";
import { Button } from "../../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../../components/common/Forms/LoadingDots";
import { InputFieldForm } from "../../../../../components/common/Forms/InputFieldForm";
import { PasswordStrength } from "../../../../../components/common/Forms/VerifyComponents/PasswordStrength";
import { isNameValid } from "../../../../../utils/Validation/dataRules/User/userName";
import { isCPFValid } from "../../../../../utils/Validation/dataRules/User/userCpf";
import { useEditForm } from "@/src/hooks/validation/Customer/useEditForm";
import { AddressBookIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockKeyIcon, UserIcon } from "phosphor-react-native";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { Text, View } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export function EditForm() {
    const {theme, font, fontSize, space} = useTheme();
    const {user} = useAuth();

    const {fields, setField, setCpf, showErrors, ui, toggleShowPassword, toggleShowConfirm, handleBlur, handleSubmit, resetForm} = useEditForm({
        name: user?.name ?? "",
        cpf: user?.cpf ?? ""
    });

    if(!user) return null;

    useFocusEffect(
      useCallback(() => {
        resetForm();
      }, [])
    )

    /**
     * sucesso
     */
    if(ui.success && ui.submitted && !ui.apiError){
        return (
            <View style={{ alignItems: "center", gap: 24, paddingVertical: 32 }}>
                <View style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <CheckIcon size={32} color={theme.success} weight="bold" />
                </View>
                <Text style={{ color: theme.textPrimary, fontSize: fontSize.lg, fontFamily: font.base }}>
                  Alterações Realizadas com sucesso!
                </Text>
            </View>
        );
    }

    return(
        <View style={{ gap: 12, width: "100%" }}>
            <InputFieldForm
                label="Nome de usuário"
                value={fields.name} onChangeState={setField("name")}
                onBlur={handleBlur("name")} maxLength={16}
                icon={<UserIcon size={18} color={theme.secondaryColor} />}
                placeholder="Meu nome de usuário"
            />
            <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />

            <InputFieldForm
                label="Email"
                value={user.email}
                icon={<EnvelopeIcon size={18} color={theme.secondaryColor} />}
                placeholder="Meu Email"
                editable={false}
            />

            <InputFieldForm
                label="CPF"
                keyboardType="numeric"
                value={fields.cpf} onChangeState={setCpf}
                onBlur={handleBlur("cpf")} maxLength={14}
                icon={<AddressBookIcon size={18} color={theme.secondaryColor} weight="thin" />}
                placeholder="Meu Cpf"
            />
            <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O cpf não é válido" />

            <InputFieldForm
                label="Senha"
                secureTextEntry={!ui.showPassword}
                value={fields.password} onChangeState={setField("password")}
                onBlur={handleBlur("password")} maxLength={16}
                icon={<LockKeyIcon size={18} color={theme.secondaryColor} />}
                placeholder="Minha Senha ou outra nova"
                rightElement={
                    <Button onPress={toggleShowPassword} variant="transparent">
                        {ui.showPassword ? <EyeSlashIcon size={18} color={theme.secondaryColor} /> : <EyeIcon size={18} color={theme.secondaryColor} />}
                    </Button>
                }
            />
            <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />

            <InputFieldForm
                label="Confirmar senha"
                secureTextEntry={!ui.showConfirm}
                value={fields.confirmPassword} onChangeState={setField("confirmPassword")}
                onBlur={handleBlur("confirmPassword")} maxLength={16}
                icon={<LockKeyIcon size={18} color={theme.secondaryColor} />}
                placeholder="Confirme a senha"
                rightElement={
                    <Button onPress={toggleShowConfirm} variant="transparent">
                        {ui.showConfirm ? <EyeSlashIcon size={18} color={theme.secondaryColor} /> : <EyeIcon size={18} color={theme.secondaryColor} />}
                    </Button>
                }
            />
            <FieldVerify
                showError={showErrors.showErrorConfirmPass}
                passed={fields.password === fields.confirmPassword}
                errorMessage="As senhas não coincidem"
            />

            {ui.apiError && (
                <Text style={{ fontSize: fontSize.sm, color: theme.danger, textAlign: "center", fontFamily: font.base }}>
                    {ui.apiError}
                </Text>
            )}

            <Button
                onPress={handleSubmit}
                disabled={ui.loading}
                variant="cta"
                style={{ padding: space[2], marginVertical: space[2] }}
            >
              {ui.loading
                  ? <LoadingDots />
                  : <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{
                          color: theme.ctaText,
                          fontSize: fontSize.md,
                          fontFamily: font.baseMedium,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                      }}>
                        Finalizar Alterações
                      </Text>
                      <ArrowRightIcon size={16} color={theme.ctaText} weight="bold" />
                  </View>
              }
            </Button>
        </View>
    )
}
