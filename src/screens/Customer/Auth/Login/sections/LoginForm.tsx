import { ArrowRightIcon, CheckIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockKeyIcon } from "@phosphor-icons/react";
import { Button } from "../../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../../components/common/Forms/LoadingDots";
import { useLoginForm } from "../../../../../hooks/validation/customer/useLoginForm";
import { InputFieldForm } from "../../../../../components/common/Forms/InputFieldForm";
import { FieldVerify } from "../../../../../components/common/Forms/VerifyComponents/FieldVerify";
import { isEmailValid } from "../../../../../utils/Validation/dataRules/User/userEmail";

export function LoginForm() {

    const {fields, ui, showErrors, setField, handleBlur, toggleShowPassword, handleSubmit} = useLoginForm();

    // Tela de sucesso
    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <CheckIcon size={32} className="text-emerald-400" weight="bold" />
                </div>
                <h3 className="text-white text-lg font-light tracking-wider">Login realizado!</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <InputFieldForm
                id="log-email" label="Email" type="email"
                value={fields.email} onChangeState={setField("email")}
                onBlur={handleBlur("email")} maxLength={30}
                icon={<EnvelopeIcon size={18} />} placeholder="Escrever meu email"
            />
            <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido"/>
            <InputFieldForm
                id="log-password" label="Senha"
                type={ui.showPassword ? "text" : "password"}
                value={fields.password} onChangeState={setField("password")}
                onBlur={handleBlur("password")} maxLength={16}
                icon={<LockKeyIcon size={18} />} placeholder="Escrever minha senha"
                rightElement={
                    <Button id="log-pass-btn-showpassword" onClick={toggleShowPassword} className="p-0.5 bg-white/5 border rounded-md">
                        {ui.showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                    </Button>
                }
            />
            <FieldVerify passed={!!fields.password} showError={showErrors.showErrorPassword} errorMessage="Preencha a senha"/>

            {ui.apiError && (
                <p className="text-sm text-red-400 text-center">{ui.apiError}</p>
            )}

            <Button
                onClick={handleSubmit} disabled={ui.loading}
                id="log-submit-btn"
                as="button"
                variant="primary"
                className="w-full py-3.5 rounded-md text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 mt-2"
            >
                {ui.loading ? <LoadingDots /> : <>Fazer Login <ArrowRightIcon size={16} weight="bold" /></>}
            </Button>

            <p className="text-center text-xs text-white/30">
                Não tem uma conta?{" "}
                <Button variant="transparent" as="link" href="/register" className="text-white/70 hover:text-white underline-offset-2 hover:underline transition-all">
                    Criar conta
                </Button>
            </p>
        </div>
    );
}
