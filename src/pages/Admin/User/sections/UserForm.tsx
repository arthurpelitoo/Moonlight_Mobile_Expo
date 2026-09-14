import { AddressBookIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, IdentificationCardIcon, LockKeyIcon, UserIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../components/common/Forms/LoadingDots";
import { InputFieldForm } from "../../../../components/common/Forms/InputFieldForm";
import { PasswordStrength } from "../../../../components/common/Forms/VerifyComponents/PasswordStrength";
import { SelectForm } from "../../../../components/common/Forms/SelectForm";
import { FieldVerify } from "../../../../components/common/Forms/VerifyComponents/section/FieldVerify";
import { isNameValid } from "../../../../utils/Validation/dataRules/User/userName";
import { isUserTypeValid } from "../../../../utils/Validation/dataRules/User/userType";
import { formatCPF, isCPFValid } from "../../../../utils/Validation/dataRules/User/userCpf";
import { isEmailValid } from "../../../../utils/Validation/dataRules/User/userEmail";
import { useUserForm } from "../../../../hooks/validation/Admin/useUserForm";
import type { UserResponseDTO } from "../../../../@types/user/user.dto";

type UserFormProps = {
    mode: "create" | "edit";
    user?: UserResponseDTO;
}

export function UserForm({mode, user} : UserFormProps){
    const {fields, selectOptions, setField, showErrors, toggleShowConfirm, toggleShowPassword, ui, handleBlur, handleSubmit } = useUserForm(mode, user ? {
        name: user.name ?? "",
        email: user.email ?? "",
        cpf: user.cpf ?? "",
        password: "",
        confirmPassword: "",
        type: (user.type ?? "customer") as "admin" | "customer"
    } : undefined);

    // Tela de sucesso
    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <CheckIcon size={32} className="text-emerald-400" weight="bold" />
                </div>
                <h3 className="text-white text-lg font-light tracking-wider">{mode === "create" ? "Usuario cadastrado!" : "Usuario atualizado!"}</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 w-full">

            <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-3 gap-4">
                <div>
                    <InputFieldForm
                        id="user-name" label="Nome de usuário" type="text"
                        value={fields.name} onChangeState={setField("name")}
                        onBlur={handleBlur("name")} maxLength={16}
                        icon={<UserIcon size={18} />} placeholder="Escreva seu nome"
                    />
                    <FieldVerify passed={isNameValid(fields.name)} showError={showErrors.showErrorUser} errorMessage="Insira 1 ou até 16 caracteres" />
                </div>
                <div>
                    <InputFieldForm
                        id="user-cpf" label="CPF" type="text" inputMode="numeric"
                        autoComplete="off"
                        value={
                            formatCPF(fields.cpf)
                        }
                        onChangeState={(value: string) => {
                            const masked = formatCPF(value);
                            setField("cpf")(masked)
                        }}
                        onBlur={handleBlur("cpf")} maxLength={14}
                        icon={<AddressBookIcon size={18} weight="thin" />}
                        placeholder="ex: 000.000.000-00"
                    />
                    <FieldVerify passed={isCPFValid(fields.cpf)} showError={showErrors.showErrorCpf} errorMessage="O cpf não é válido" />
                </div>
                <div>
                    <InputFieldForm
                        id="user-email" label="Email" type="email"
                        value={fields.email} onChangeState={setField("email")}
                        onBlur={handleBlur("email")} maxLength={30}
                        icon={<EnvelopeIcon size={18} />} placeholder="Escreva seu email"
                    />
                    <FieldVerify passed={isEmailValid(fields.email)} showError={showErrors.showErrorEmail} errorMessage="O email não é válido" />
                </div>
            </div>
            <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-3 gap-4">
                <div>
                    <InputFieldForm
                        id="user-password" label="Senha"
                        type={ui.showPassword ? "text" : "password"}
                        value={fields.password} onChangeState={setField("password")}
                        onBlur={handleBlur("password")} maxLength={16}
                        icon={<LockKeyIcon size={18} />} placeholder="Escreva uma senha forte"
                        rightElement={
                            <Button onClick={toggleShowPassword} className="p-0.5 bg-white/5 border rounded-md">
                                {ui.showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                            </Button>
                        }
                    />
                    <PasswordStrength password={fields.password} showError={showErrors.showErrorPassword} />
                </div>
                <div>
                    <InputFieldForm
                        id="user-confirm" label="Confirmar senha"
                        type={ui.showConfirm ? "text" : "password"}
                        value={fields.confirmPassword} onChangeState={setField("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")} maxLength={16}
                        icon={<LockKeyIcon size={18} />} placeholder="Confirme a senha"
                        rightElement={
                            <Button onClick={toggleShowConfirm} className="p-0.5 bg-white/5 border rounded-md">
                                {ui.showConfirm ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                            </Button>
                        }
                    />
                    <FieldVerify
                        showError={showErrors.showErrorConfirmPass}
                        passed={fields.password == fields.confirmPassword}
                        errorMessage="As senhas não coincidem"
                    />
                </div>
                <div>
                    <SelectForm icon={<IdentificationCardIcon size={20} weight="thin" />}
                        id="user-type-select"
                        label="Tipo de Usuario"
                        variant="terciary"
                        options={selectOptions}
                        value={fields.type}
                        onChangeState={setField("type")}
                        onBlur={handleBlur("type")}
                    />
                    <FieldVerify passed={isUserTypeValid(fields.type)} showError={showErrors.showErrorUserType} errorMessage="Escolha um tipo válido"/>
                </div>
            </div>

            {ui.apiError && (
                <p className="text-sm text-red-400 text-center">{ui.apiError}</p>
            )}

            <Button
              id="user-submit-btn"
              onClick={() => handleSubmit(user?.id_user)} disabled={ui.loading}
              as="button"
              variant="primary"
              className="w-full py-3.5 rounded-md text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 mt-2"
            >
                {ui.loading ? <LoadingDots /> : <>{mode === "create" ? "Cadastrar Usuario" : "Salvar Alterações"} <ArrowRightIcon size={16} weight="bold" /></>}
            </Button>
        </div>
    )
}
