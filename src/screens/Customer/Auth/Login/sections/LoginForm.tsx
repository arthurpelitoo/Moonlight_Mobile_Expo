import React from "react";
import { View, Text } from "react-native";
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
import { useTheme } from "@/src/contexts/ThemeContext";
import { H3 } from "@/src/components/common/Generic/Text";

export function LoginForm() {
    const {theme, fontSize, font, space} = useTheme();
    const router = useRouter();
    const { fields, ui, showErrors, setField, handleBlur, toggleShowPassword, handleSubmit } = useLoginForm();

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
                    Login realizado!
                </Text>
            </View>
        );
    }

    return (
        <View style={{ gap: 12, width: "100%" }}>
            <InputFieldForm
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={fields.email}
                onChangeState={setField("email")}
                onBlur={handleBlur("email")}
                maxLength={30}
                icon={<EnvelopeIcon size={18} color={theme.secondaryColor} />}
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
                icon={<LockKeyIcon size={18} color={theme.secondaryColor} />}
                placeholder="Escrever minha senha"
                rightElement={
                    <Button onPress={toggleShowPassword} variant="transparent">
                        {ui.showPassword
                            ? <EyeSlashIcon size={18} color={theme.secondaryColor} />
                            : <EyeIcon size={18} color={theme.secondaryColor} />}
                    </Button>
                }
            />
            <FieldVerify
                passed={!!fields.password}
                showError={showErrors.showErrorPassword}
                errorMessage="Preencha a senha"
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
                style={{ padding: space[2], marginVertical: 8 }}
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
                            Fazer Login
                        </Text>
                        <ArrowRightIcon size={16} color="#FFFFFF" weight="bold" />
                    </View>
                }
            </Button>

            {/* Navega para o cadastro */}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <H3 style={{ fontSize: fontSize.md, color: "rgba(255,255,255,0.3)", fontFamily: font.base }}>
                    Não tem uma conta?{" "}
                </H3>
                <Button
                    variant="transparent"
                    onPress={() => router.push("/register")}
                >
                    <Text style={{
                        fontSize: fontSize.md,
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: font.base,
                        textDecorationLine: "underline",
                    }}>
                        Criar conta
                    </Text>
                </Button>
            </View>
        </View>
    );
}
