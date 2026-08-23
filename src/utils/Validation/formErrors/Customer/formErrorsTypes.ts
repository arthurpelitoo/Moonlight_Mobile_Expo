export type RegisterFormData = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    confirmPassword: string
}

export type RegisterTouched = {
    name: boolean,
    email: boolean,
    cpf: boolean,
    password: boolean,
    confirmPassword: boolean
}

//

export type LoginFormData = {
    email: string,
    password: string
}

export type LoginTouched = {
    email: boolean,
    password: boolean
}

//

export type EditFormData = {
    name: string,
    cpf: string,
    password: string,
    confirmPassword: string
}

export type EditTouched = {
    name: boolean,
    cpf: boolean,
    password: boolean,
    confirmPassword: boolean
}
