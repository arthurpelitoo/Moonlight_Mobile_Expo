import { isCPFValid } from "../dataRules/User/userCpf";
import { isNameValid } from "../dataRules/User/userName";
import { getPasswordVerifiedLevel } from "../dataRules/User/userPassword";

export function validateEditUser(data: {
    name: string,
    password: string,
    confirmPassword: string,
    cpf: string
}) {

    const { name, password, confirmPassword, cpf } = data;

    const nameValid = isNameValid(name);
    const strengthLevel = getPasswordVerifiedLevel(password);
    const passwordMatch = password === confirmPassword
    const cpfValid = isCPFValid(cpf);

    const isFormFilled = !!(
        name && name.length <= 16 && 
        password && password.length <= 16 &&
        confirmPassword &&
        cpf
    );

    
    const isPasswordValid = passwordMatch && strengthLevel > 4;

    const isValid = isFormFilled && isPasswordValid && nameValid && cpfValid ;

    return{
        isValid
    }


}