import { isCPFValid } from "../dataRules/User/userCpf";
import { isEmailValid } from "../dataRules/User/userEmail";
import { isNameValid } from "../dataRules/User/userName";
import { getPasswordVerifiedLevel } from "../dataRules/User/userPassword";

export function validateRegister(data: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    cpf: string
}) {

    const { name, email, password, confirmPassword, cpf } = data;

    const nameValid = isNameValid(name);
    const emailValid = isEmailValid(email);
    const strengthLevel = getPasswordVerifiedLevel(password);
    const passwordMatch = password === confirmPassword;
    const cpfValid = isCPFValid(cpf);

    const isFormFilled = !!(
        name && name.length <= 16 &&
        email && email.length <= 30 &&
        password && password.length <= 16 &&
        confirmPassword &&
        cpf
    );
    
    const isPasswordValid = passwordMatch && strengthLevel > 4;

    const isValid = isFormFilled && isPasswordValid && emailValid && nameValid && cpfValid;

    return{
        isValid
    }


}