import { isCPFValid } from "../../dataRules/User/userCpf";
import { isEmailValid } from "../../dataRules/User/userEmail";
import { isNameValid } from "../../dataRules/User/userName";
import { getPasswordVerifiedLevel } from "../../dataRules/User/userPassword";
import type { EditFormData, EditTouched, LoginFormData, LoginTouched, RegisterFormData, RegisterTouched } from "./formErrorsTypes";


export function getRegisterFormErrors(data: RegisterFormData, touched: RegisterTouched, submitted: boolean){
     /* validações para mostrar erro */
    const nameValid = isNameValid(data.name);
    const cpfValid = isCPFValid(data.cpf);
    const emailValid = isEmailValid(data.email);
    const strengthLevel = getPasswordVerifiedLevel(data.password);
    const passwordMatch = data.password === data.confirmPassword;
    
    return {
        showErrorUser: (touched.name || submitted) && !nameValid,
        showErrorEmail: (touched.email || submitted) && !emailValid,
        showErrorCpf: (touched.cpf || submitted) && !cpfValid,
        showErrorPassword: (touched.password || submitted) && strengthLevel < 5,
        showErrorConfirmPass: (touched.confirmPassword || submitted) && !passwordMatch
    }
}

//

export function getLoginFormErrors(data: LoginFormData, touched: LoginTouched, submitted: boolean){
    const emailValid = isEmailValid(data.email);

    return {
        showErrorEmail: (touched.email || submitted) && !emailValid,
        showErrorPassword: (touched.password || submitted) && !data.password,
    }
}

//

export function getEditFormErrors(data: EditFormData, touched: EditTouched, submitted: boolean){
    const nameValid = isNameValid(data.name);
    const cpfValid = isCPFValid(data.cpf);
    const strengthLevel = getPasswordVerifiedLevel(data.password);
    const passwordMatch = data.password === data.confirmPassword

    return {
        showErrorUser: (touched.name || submitted) && !nameValid,
        showErrorCpf: (touched.cpf || submitted) && !cpfValid,
        showErrorPassword: (touched.password || submitted) && strengthLevel < 5,
        showErrorConfirmPass: (touched.confirmPassword || submitted) && !passwordMatch
    }
}