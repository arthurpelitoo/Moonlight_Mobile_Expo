import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    ArrowRightIcon, CheckIcon, EnvelopeIcon,
    EyeIcon, EyeSlashIcon, LockKeyIcon,
} from "phosphor-react-native";
import { useRouter } from "expo-router";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { LoadingDots } from "@/src/components/common/Forms/LoadingDots";
import { useLoginForm } from "@/src/hooks/validation/Customer/useLoginForm";
import { InputFieldForm } from "@/src/components/common/Forms/InputFieldForm";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { isEmailValid } from "@/src/utils/Validation/dataRules/User/userEmail";
import { DARK, FONT, FONT_SIZE } from "@/src/style/theme-pattern";

export function LoginForm() {
    const router = useRouter();
    const { fields, ui, showErrors, setField, handleBlur, toggleShowPassword, handleSubmit } = useLoginForm();

    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                    <CheckIcon size={32} color={DARK.success} weight="bold" />
                </View>
                <Text style={styles.successText}>Login realizado!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <InputFieldForm
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={fields.email}
                onChangeState={setField("email")}
                onBlur={handleBlur("email")}
                maxLength={30}
                icon={<EnvelopeIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Escrever meu email"
            />
            <FieldVerify
                passed={isEmailValid(fields.email)}
                showError={showErrors.showErrorEmail}
                errorMessage="O email não é válido"
            />

            <InputFieldForm
                label="Senha"
                secureTextEntry={!ui.showPassword}
                value={fields.password}
                onChangeState={setField("password")}
                onBlur={handleBlur("password")}
                maxLength={16}
                icon={<LockKeyIcon size={18} color={DARK.secondaryColor} />}
                placeholder="Escrever minha senha"
                rightElement={
                    <Button onPress={toggleShowPassword} variant="transparent">
                        {ui.showPassword
                            ? <EyeSlashIcon size={18} color={DARK.secondaryColor} />
                            : <EyeIcon size={18} color={DARK.secondaryColor} />}
                    </Button>
                }
            />
            <FieldVerify
                passed={!!fields.password}
                showError={showErrors.showErrorPassword}
                errorMessage="Preencha a senha"
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
                        <Text style={styles.submitText}>Fazer Login</Text>
                        <ArrowRightIcon size={16} color="#FFFFFF" weight="bold" />
                    </View>
                }
            </Button>

            {/* Navega para o cadastro */}
            <View style={styles.linkRow}>
                <Text style={styles.linkText}>Não tem uma conta? </Text>
                <Button
                    variant="transparent"
                    onPress={() => router.push("/(initial)/RegisterPage")}
                >
                    <Text style={styles.linkAction}>Criar conta</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:        { gap: 12, width: "100%" },
    successContainer: { alignItems: "center", gap: 24, paddingVertical: 32 },
    successIcon: {
        width: 64, height: 64, borderRadius: 32,
        borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
        alignItems: "center", justifyContent: "center",
    },
    successText:  { color: DARK.primaryText, fontSize: FONT_SIZE.lg, fontFamily: FONT.base },
    apiError:     { fontSize: FONT_SIZE.sm, color: DARK.danger, textAlign: "center", fontFamily: FONT.base },
    submitButton: { marginTop: 8 },
    submitInner:  { flexDirection: "row", alignItems: "center", gap: 8 },
    submitText: {
        color: "#FFFFFF", fontSize: FONT_SIZE.sm,
        fontFamily: FONT.baseMedium, letterSpacing: 1.5, textTransform: "uppercase",
    },
    linkRow:    { flexDirection: "row", justifyContent: "center", alignItems: "center" },
    linkText:   { fontSize: FONT_SIZE.sm, color: "rgba(255,255,255,0.3)", fontFamily: FONT.base },
    linkAction: { fontSize: FONT_SIZE.sm, color: "rgba(255,255,255,0.7)", fontFamily: FONT.base, textDecorationLine: "underline" },
});
