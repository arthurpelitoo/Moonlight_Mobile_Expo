import { isEmailValid } from "../dataRules/User/userEmail";

export function validateLogin(data: {
    email: string,
    password: string,
}) {
    const { email, password } = data;

    const emailValid = isEmailValid(email);
    const isFormFilled = !!(email && password);

    const isValid = isFormFilled && emailValid;

    return{
        isValid
    }


}