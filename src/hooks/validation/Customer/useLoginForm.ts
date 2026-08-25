import { useContext, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../auth/useAuth";
import { validateLogin } from "../../../utils/Validation/Customer/ValidateLogin";
import { getLoginFormErrors } from "../../../utils/Validation/formErrors/Customer/getFormErrors";
import { loginUser } from "../../../services/realServices/auth.service";
import { LibraryContext } from "../../library/useLibrary";

export function useLoginForm() {
    const {refreshLibrary} = useContext(LibraryContext);
    const {login} = useAuth();

    const [fields, setFields] = useState({
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const [ui, setUi] = useState({
        showPassword: false,
        loading: false,
        submitted: false,
        success: false,
        apiError: null as string | null,
    });

    const { isValid } = validateLogin(fields);
    const showErrors = getLoginFormErrors(fields, touched, ui.submitted);

    // Atualiza um campo genérico
    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({...prev, apiError: null}));
    }

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const toggleShowPassword = () =>
        setUi(prev => ({ ...prev, showPassword: !prev.showPassword }));

    const handleSubmit = async () => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            const data = await loginUser(fields);
            login(data.token, data.user);
            refreshLibrary();
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => router.replace("/"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return { fields, ui, showErrors, setField, handleBlur, toggleShowPassword, handleSubmit };
}
