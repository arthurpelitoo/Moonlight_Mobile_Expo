import { AddressBookIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon,
         EyeIcon, EyeSlashIcon, LockKeyIcon, UserIcon } from "@phosphor-icons/react";
import { Button } from "../../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../../components/common/Forms/LoadingDots";
import { useRegisterForm } from "../../../../../hooks/validation/customer/useRegisterForm";
import { InputFieldForm } from "../../../../../components/common/Forms/InputFieldForm";
import { PasswordStrength } from "../../../../../components/common/Forms/VerifyComponents/PasswordStrength";
import { isNameValid } from "../../../../../utils/Validation/dataRules/User/userName";
import { FieldVerify } from "../../../../../components/common/Forms/VerifyComponents/FieldVerify";
import { isCPFValid } from "../../../../../utils/Validation/dataRules/User/userCpf";
import { isEmailValid } from "../../../../../utils/Validation/dataRules/User/userEmail";

export function RegisterForm() {
    const {
        fields, ui, showErrors,
        setField, setCpf, handleBlur,
        toggleShowPassword, toggleShowConfirm,
        handleSubmit,
    } = useRegisterForm();

    // Tela de sucesso
    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <CheckIcon size={32} className="text-emerald-400" weight="bold" />
                </div>
                <h3 className="text-white text-lg font-light tracking-wider">Conta criada!</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">

            <InputFieldForm
                id="reg-name" label="Nome de usuário" type="text"
                value={fields.name} onChangeState={setField("name")}
                onBlur={handleBlur("name")} maxLength={16}
                icon={<UserIcon size={18} />} placeholder="Escreva seu nome"
            />
            <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />

            <InputFieldForm
                id="reg-cpf" label="CPF" type="text" inputMode="numeric"
                autoComplete="off" value={fields.cpf} onChangeState={setCpf}
                onBlur={handleBlur("cpf")} maxLength={14}
                icon={<AddressBookIcon size={18} weight="thin" />}
                placeholder="ex: 000.000.000-00"
            />
            <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O cpf não é válido" />

            <InputFieldForm
                id="reg-email" label="Email" type="email"
                value={fields.email} onChangeState={setField("email")}
                onBlur={handleBlur("email")} maxLength={30}
                icon={<EnvelopeIcon size={18} />} placeholder="Escreva seu email"
            />
            <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido"/>

            <InputFieldForm
                id="reg-password" label="Senha"
                type={ui.showPassword ? "text" : "password"}
                value={fields.password} onChangeState={setField("password")}
                onBlur={handleBlur("password")} maxLength={16}
                icon={<LockKeyIcon size={18} />} placeholder="Escreva uma senha forte"
                rightElement={
                    <Button id="reg-pass-btn-showpassword" onClick={toggleShowPassword} className="p-0.5 bg-white/5 border rounded-md">
                        {ui.showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                    </Button>
                }
            />
            <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />

            <InputFieldForm
                id="reg-confirmpassword" label="Confirmar senha"
                type={ui.showConfirm ? "text" : "password"}
                value={fields.confirmPassword} onChangeState={setField("confirmPassword")}
                onBlur={handleBlur("confirmPassword")} maxLength={16}
                icon={<LockKeyIcon size={18} />} placeholder="Confirme a senha"
                rightElement={
                    <Button id="reg-confirmpassword-btn-showpassword" onClick={toggleShowConfirm} className="p-0.5 bg-white/5 border rounded-md">
                        {ui.showConfirm ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                    </Button>
                }
            />
            <FieldVerify
                showError={showErrors.showErrorConfirmPass}
                passed={fields.password == fields.confirmPassword}
                errorMessage="As senhas não coincidem"
            />

            {ui.apiError && (
                <p className="text-sm text-red-400 text-center">{ui.apiError}</p>
            )}

            <Button
                onClick={handleSubmit} disabled={ui.loading}
                id="reg-submit-btn"
                as="button"
                variant="primary"
                className="w-full py-3.5 rounded-md text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 mt-2"
            >
                {ui.loading ? <LoadingDots /> : <>Criar Conta <ArrowRightIcon size={16} weight="bold" /></>}
            </Button>

            <p className="text-center text-xs text-white/30">
                Já tem uma conta?{" "}
                <Button variant="transparent" as="link" href="/login"
                    className="text-white/70 hover:text-white underline-offset-2 hover:underline transition-all">
                    Fazer login
                </Button>
            </p>
        </div>
    );
}
