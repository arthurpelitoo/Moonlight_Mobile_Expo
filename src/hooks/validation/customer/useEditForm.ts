// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { formatCPF } from "../../../utils/Validation/dataRules/User/userCpf";
import { validateEditUser } from "../../../utils/Validation/Customer/ValidateEditUser";
import { getEditFormErrors } from "../../../utils/Validation/formErrors/Customer/getFormErrors";
// import { updateMe } from "../../../services/realServices/user.service";


export function useEditForm(initialData: {name: string, cpf: string}){
    // const navigate = useNavigate();
    const { login, token, user } = useAuth();

    const [fields, setFields] = useState({
            name: initialData.name,
            password: "",
            confirmPassword: "",
            cpf: formatCPF(initialData.cpf)
        });

        const [touched, setTouched] = useState({
            name: false,
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

        const { isValid } = validateEditUser(fields);
        const showErrors = getEditFormErrors(fields, touched, ui.submitted);

        // Atualiza um campo genérico
        const setField = (field: keyof typeof fields) => (value: string) => {
            setFields(prev => ({ ...prev, [field]: value }));
            setUi(prev => ({...prev, apiError: null}));
        }

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
            if (!user) return;

            try {
                setUi(prev => ({ ...prev, loading: true }));
                // const data = await updateMe({
                //     name: fields.name,
                //     cpf: fields.cpf,
                //     password: fields.password,
                // });
                // login(token!, data.user);
                setUi(prev => ({ ...prev, success: true }));
                setTimeout(() => {
                    setUi({ showPassword: false, showConfirm: false, loading: false, success: false, submitted: false, apiError: null }); // reseta
                    setFields(prev => ({ ...prev, password: "", confirmPassword: ""}));
                    setTouched({ name: false, cpf: false, password: false, confirmPassword: false})
                    // navigate("/profile");
                }, 1500);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Erro inesperado.";
                setUi(prev => ({ ...prev, apiError: message }));
            } finally {
                setUi(prev => ({ ...prev, loading: false }));
            }
        };

        return { fields, ui, showErrors, setField, setCpf, handleBlur, toggleShowPassword, toggleShowConfirm, handleSubmit };
}
