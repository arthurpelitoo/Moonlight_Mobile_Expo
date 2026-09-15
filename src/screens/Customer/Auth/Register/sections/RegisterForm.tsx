import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AddressBookIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockKeyIcon, UserIcon } from "phosphor-react-native";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { LoadingDots } from "@/src/components/common/Forms/LoadingDots";
import { useRegisterForm } from "@/src/hooks/validation/Customer/useRegisterForm";
import { InputFieldForm } from "@/src/components/common/Forms/InputFieldForm";
import { PasswordStrength } from "@/src/components/common/Forms/VerifyComponents/PasswordStrength";
import { isNameValid } from "@/src/utils/Validation/dataRules/User/userName";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { isCPFValid } from "@/src/utils/Validation/dataRules/User/userCpf";
import { isEmailValid } from "@/src/utils/Validation/dataRules/User/userEmail";
import { useTheme } from "@/src/contexts/ThemeContext";
import { H3 } from "@/src/components/common/Generic/Text";

export function RegisterForm() {
    const {theme, fontSize, font, space} = useTheme();
    const router = useRouter();
    const {
        fields, ui, showErrors,
        setField, setCpf, handleBlur,
        toggleShowPassword, toggleShowConfirm,
        handleSubmit,
    } = useRegisterForm();

    if (ui.submitted && !ui.apiError && ui.success) {
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
                    Conta criada!
                </Text>
            </View>
        );
    }

    return (
        <View style={{ gap: 12, width: "100%" }}>

            <InputFieldForm
                label="Nome de usuário"
                value={fields.name} onChangeState={setField("name")}
                onBlur={handleBlur("name")} maxLength={16}
                icon={<UserIcon size={18} color={theme.secondaryColor} />}
                placeholder="Escreva seu nome"
            />
            <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />

            <InputFieldForm
                label="CPF"
                keyboardType="numeric"
                value={fields.cpf} onChangeState={setCpf}
                onBlur={handleBlur("cpf")} maxLength={14}
                icon={<AddressBookIcon size={18} color={theme.secondaryColor} weight="thin" />}
                placeholder="ex: 000.000.000-00"
            />
            <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O CPF não é válido" />

            <InputFieldForm
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={fields.email} onChangeState={setField("email")}
                onBlur={handleBlur("email")} maxLength={30}
                icon={<EnvelopeIcon size={18} color={theme.secondaryColor} />}
                placeholder="Escreva seu email"
            />
            <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido" />

            <InputFieldForm
                label="Senha"
                secureTextEntry={!ui.showPassword}
                value={fields.password} onChangeState={setField("password")}
                onBlur={handleBlur("password")} maxLength={16}
                icon={<LockKeyIcon size={18} color={theme.secondaryColor} />}
                placeholder="Escreva uma senha forte"
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
                            color: "#FFFFFF",
                            fontSize: fontSize.md,
                            fontFamily: font.baseMedium,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                        }}>
                            Criar Conta
                        </Text>
                        <ArrowRightIcon size={16} color={theme.textPrimary} weight="bold" />
                    </View>
                }
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <H3 style={{ fontSize: fontSize.md, color: "rgba(255,255,255,0.3)", fontFamily: font.base }}>
                    Já tem uma conta?{" "}
                </H3>
                <Pressable onPress={() => router.push("/login")}>
                    <Text style={{
                      fontSize: fontSize.md,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: font.base,
                      textDecorationLine: "underline",
                    }}>
                        Fazer login
                    </Text>
                </Pressable>
            </View>

        </View>
    );
}
