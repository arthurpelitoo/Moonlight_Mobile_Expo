import { View, Text, StyleSheet, Pressable } from "react-native";
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
import { DARK, FONT, FONT_SIZE } from "@/src/style/theme-pattern";

export function RegisterForm() {
    const router = useRouter();
    const {
        fields, ui, showErrors,
        setField, setCpf, handleBlur,
        toggleShowPassword, toggleShowConfirm,
        handleSubmit,
    } = useRegisterForm();

    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                    <CheckIcon size={32} color={DARK.success} weight="bold" />
                </View>
                <Text style={styles.successText}>Conta criada!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <InputFieldForm
                label="Nome de usuário"
                value={fields.name} onChangeState={setField("name")}
                onBlur={handleBlur("name")} maxLength={16}
                icon={<UserIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Escreva seu nome"
            />
            <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />

            <InputFieldForm
                label="CPF"
                keyboardType="numeric"
                value={fields.cpf} onChangeState={setCpf}
                onBlur={handleBlur("cpf")} maxLength={14}
                icon={<AddressBookIcon size={18} color={DARK.secondaryColor} weight="thin" />}
                placeholder="ex: 000.000.000-00"
            />
            <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O CPF não é válido" />

            <InputFieldForm
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={fields.email} onChangeState={setField("email")}
                onBlur={handleBlur("email")} maxLength={30}
                icon={<EnvelopeIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Escreva seu email"
            />
            <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido" />

            <InputFieldForm
                label="Senha"
                secureTextEntry={!ui.showPassword}
                value={fields.password} onChangeState={setField("password")}
                onBlur={handleBlur("password")} maxLength={16}
                icon={<LockKeyIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Escreva uma senha forte"
                rightElement={
                    <Button onPress={toggleShowPassword} variant="transparent">
                        {ui.showPassword ? <EyeSlashIcon size={18} color={DARK.secondaryColor} /> : <EyeIcon size={18} color={DARK.secondaryColor} />}
                    </Button>
                }
            />
            <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />

            <InputFieldForm
                label="Confirmar senha"
                secureTextEntry={!ui.showConfirm}
                value={fields.confirmPassword} onChangeState={setField("confirmPassword")}
                onBlur={handleBlur("confirmPassword")} maxLength={16}
                icon={<LockKeyIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Confirme a senha"
                rightElement={
                    <Button onPress={toggleShowConfirm} variant="transparent">
                        {ui.showConfirm ? <EyeSlashIcon size={18} color={DARK.secondaryColor} /> : <EyeIcon size={18} color={DARK.secondaryColor} />}
                    </Button>
                }
            />
            <FieldVerify
                showError={showErrors.showErrorConfirmPass}
                passed={fields.password === fields.confirmPassword}
                errorMessage="As senhas não coincidem"
            />

            {ui.apiError && (
                <Text style={styles.apiError}>{ui.apiError}</Text>
            )}

            <Button
                onPress={handleSubmit}
                disabled={ui.loading}
                variant="cta"
                style={styles.submitButton}
            >
                {ui.loading
                    ? <LoadingDots />
                    : <View style={styles.submitInner}>
                        <Text style={styles.submitText}>Criar Conta</Text>
                        <ArrowRightIcon size={16} color={DARK.primaryText} weight="bold" />
                    </View>
                }
            </Button>

            <View style={styles.loginRow}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <Pressable onPress={() => router.push("/(initial)/LoginPage")}>
                    <Text style={styles.loginLink}>Fazer login</Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        width: "100%",
    },
    successContainer: {
        alignItems: "center",
        gap: 24,
        paddingVertical: 32,
    },
    successIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    successText: {
        color: DARK.primaryText,
        fontSize: FONT_SIZE.lg,
        fontFamily: FONT.base,
    },
    apiError: {
        fontSize: FONT_SIZE.sm,
        color: DARK.danger,
        textAlign: "center",
        fontFamily: FONT.base,
    },
    submitButton: {
        marginTop: 8,
    },
    submitInner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    submitText: {
        color: DARK.primaryText,
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT.baseMedium,
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: FONT_SIZE.sm,
        color: "rgba(255,255,255,0.3)",
        fontFamily: FONT.base,
    },
    loginLink: {
        fontSize: FONT_SIZE.sm,
        color: "rgba(255,255,255,0.7)",
        fontFamily: FONT.base,
        textDecorationLine: "underline",
    },
});