import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AddressBookIcon,
  ArrowRightIcon,
  CheckIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  UserIcon,
} from '@phosphor-icons/react-native';

import { Button } from '../../../../components/common/Generic/Button/Button';
import { LoadingDots } from '../../../../components/common/Forms/LoadingDots';
import { InputFieldForm } from '../../../../components/common/Forms/InputFieldForm';
import { PasswordStrength } from '../../../../components/common/Forms/VerifyComponents/PasswordStrength';
import { FieldVerify } from '../../../../components/common/Forms/VerifyComponents/section/FieldVerify';
// Lógica e regras já existentes no projeto — só importar, sem duplicar:
import { useRegisterForm } from '../../../../hooks/validation/Customer/useRegisterForm';
import { isNameValid } from '../../../../utils/Validation/dataRules/User/userName';
import { isCPFValid } from '../../../../utils/Validation/dataRules/User/userCpf';
import { isEmailValid } from '../../../../utils/Validation/dataRules/User/userEmail';

import { COLORS } from '../../../../style/colors';
import { FONTS } from '../../../../style/typography';

export function RegisterForm() {
  const navigation = useNavigation();
  const {
    fields, ui, showErrors,
    setField, setCpf, handleBlur,
    toggleShowPassword, toggleShowConfirm,
    handleSubmit,
  } = useRegisterForm();

  // Tela de sucesso
  if (ui.submitted && !ui.apiError && ui.success) {
    return (
      <View style={styles.successWrap}>
        <View style={styles.successCircle}>
          <CheckIcon size={32} color={COLORS.success} weight="bold" />
        </View>
        <Text style={styles.successTitle}>Conta criada!</Text>
      </View>
    );
  }

  return (
    <View style={styles.form}>
      <InputFieldForm
        id="reg-name"
        label="Nome de usuário"
        value={fields.name}
        onChangeState={setField('name')}
        onBlur={handleBlur('name')}
        maxLength={16}
        icon={<UserIcon size={18} color={COLORS.textSubtle} />}
        placeholder="Escreva seu nome"
      />
      <FieldVerify
        passed={isNameValid(fields.name)}
        showError={showErrors.showErrorUser}
        errorMessage="Insira 1 ou até 16 caracteres"
      />

      <InputFieldForm
        id="reg-cpf"
        label="CPF"
        inputMode="numeric"
        value={fields.cpf}
        onChangeState={setCpf}
        onBlur={handleBlur('cpf')}
        maxLength={14}
        icon={<AddressBookIcon size={18} color={COLORS.textSubtle} weight="thin" />}
        placeholder="ex: 000.000.000-00"
      />
      <FieldVerify
        passed={isCPFValid(fields.cpf)}
        showError={showErrors.showErrorCpf}
        errorMessage="O cpf não é válido"
      />

      <InputFieldForm
        id="reg-email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={fields.email}
        onChangeState={setField('email')}
        onBlur={handleBlur('email')}
        maxLength={30}
        icon={<EnvelopeIcon size={18} color={COLORS.textSubtle} />}
        placeholder="Escreva seu email"
      />
      <FieldVerify
        passed={isEmailValid(fields.email)}
        showError={showErrors.showErrorEmail}
        errorMessage="O email não é válido"
      />

      <InputFieldForm
        id="reg-password"
        label="Senha"
        secureTextEntry={!ui.showPassword}
        value={fields.password}
        onChangeState={setField('password')}
        onBlur={handleBlur('password')}
        maxLength={16}
        icon={<LockKeyIcon size={18} color={COLORS.textSubtle} />}
        placeholder="Escreva uma senha forte"
        rightElement={
          <Button
            id="reg-pass-btn-showpassword"
            variant="transparent"
            onPress={toggleShowPassword}
            style={styles.eyeButton}
          >
            {ui.showPassword ? (
              <EyeSlashIcon size={18} color={COLORS.textSubtle} />
            ) : (
              <EyeIcon size={18} color={COLORS.textSubtle} />
            )}
          </Button>
        }
      />
      <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />

      <InputFieldForm
        id="reg-confirmpassword"
        label="Confirmar senha"
        secureTextEntry={!ui.showConfirm}
        value={fields.confirmPassword}
        onChangeState={setField('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        maxLength={16}
        icon={<LockKeyIcon size={18} color={COLORS.textSubtle} />}
        placeholder="Confirme a senha"
        rightElement={
          <Button
            id="reg-confirmpassword-btn-showpassword"
            variant="transparent"
            onPress={toggleShowConfirm}
            style={styles.eyeButton}
          >
            {ui.showConfirm ? (
              <EyeSlashIcon size={18} color={COLORS.textSubtle} />
            ) : (
              <EyeIcon size={18} color={COLORS.textSubtle} />
            )}
          </Button>
        }
      />
      <FieldVerify
        showError={showErrors.showErrorConfirmPass}
        passed={fields.password === fields.confirmPassword}
        errorMessage="As senhas não coincidem"
      />

      {ui.apiError ? <Text style={styles.apiError}>{ui.apiError}</Text> : null}

      <Button
        id="reg-submit-btn"
        variant="primary"
        disabled={ui.loading}
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        {ui.loading ? (
          <LoadingDots />
        ) : (
          <View style={styles.submitContent}>
            <Text style={styles.submitText}>Criar Conta</Text>
            <ArrowRightIcon size={16} color="#fff" weight="bold" />
          </View>
        )}
      </Button>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Já tem uma conta? </Text>
        <Button variant="transparent" onPress={() => navigation.navigate('Login')}>
          Fazer login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 4,
  },
  successWrap: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: 16,
    letterSpacing: 1,
  },
  eyeButton: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
  },
  apiError: {
    color: COLORS.danger,
    fontFamily: FONTS.regular,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  submitButton: {
    marginTop: 8,
  },
  submitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  loginText: {
    color: 'rgba(255,255,255,0.3)',
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
});
