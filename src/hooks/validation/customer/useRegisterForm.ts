import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../../utils/Validation/Customer/ValidateRegister";
import { getRegisterFormErrors } from "../../../utils/Validation/formErrors/Customer/getFormErrors";
import { formatCPF } from "../../../utils/Validation/dataRules/User/userCpf";
// import { register } from "../../../services/realServices/auth.service";

export function useRegisterForm() {
    // const navigate = useNavigate();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        cpf: false,
        password: false,
        confirmPassword: false,
    });

    const [ui, setUi] = useState({
        showPassword: false,
        showConfirm: false,
        loading: false,
        submitted: false,
        success: false,
        apiError: null as string | null,
    });

    const { isValid } = validateRegister(fields);
    const showErrors = getRegisterFormErrors(fields, touched, ui.submitted);

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({...prev, apiError: null}));
    };

    const setCpf = (value: string) => {
        setFields(prev => ({ ...prev, cpf: formatCPF(value) }));
        setUi(prev => ({...prev, apiError: null}));
    }

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const toggleShowPassword = () =>
        setUi(prev => ({ ...prev, showPassword: !prev.showPassword }));

    const toggleShowConfirm = () =>
        setUi(prev => ({ ...prev, showConfirm: !prev.showConfirm }));

    const handleSubmit = async () => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            // await register({
            //     name: fields.name,
            //     email: fields.email,
            //     cpf: fields.cpf,
            //     password: fields.password,
            // });
            setUi(prev => ({ ...prev, success: true }));
            // setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return { fields, ui, showErrors, setField, setCpf, handleBlur, toggleShowPassword, toggleShowConfirm, handleSubmit };
}
