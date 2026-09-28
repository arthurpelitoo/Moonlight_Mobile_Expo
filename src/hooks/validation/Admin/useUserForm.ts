import { useCallback, useState } from "react";
import { validateUser } from "../../../utils/Validation/Admin/ValidateUser";
import { getUserFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import { createUser, updateUser } from "../../../services/realServices/user.service";
import type { UserPayload } from "../../../@types/user/user.payload";
import { router } from "expo-router";

type UserFormData = "create" | "edit";

type UserInitialData = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    confirmPassword: string,
    id_roles: number[]
}

const emptyFields: UserInitialData = {
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    id_roles: [] as number[]
}

const initialTouched = {
  name: false, email: false, cpf: false,
  password: false, confirmPassword: false,
  id_roles: false
}

const initialUi = {
  showPassword: false,
  showConfirm: false,
  loading: false,
  submitted: false,
  success: false,
  apiError: null as string | null,
}

/**
 * Estado e validação do formulário de usuario (criação e edição).
 *
 * O hook não recebe dados iniciais: sempre nasce com `emptyFields`.
 * Quem preenche o formulário é o componente, chamando `createForm`:
 *   - modo "create": `createForm()` → campos vazios
 *   - modo "edit":   `createForm(initialData)` quando o usuario chega da API
 *
 * @param mode "create" ou "edit"; decide se `handleSubmit` chama createUser ou updateUser.
 * @returns
 *  - `fields`, `ui`, `showErrors`, `isValid`: estado e validação atuais
 *  - `setField`, `handleBlur`, `toggleCategory`: handlers dos campos
 *  - `createForm(initialData?)`: (re)inicializa campos, `ui` e `touched`.
 *    Referência estável (useCallback com `[]`), segura em deps de useEffect/useFocusEffect.
 *  - `handleSubmit(id_user?)`: valida, envia e redireciona pra tabela em caso de sucesso
 */
export function useUserForm(mode: UserFormData){
    const [fields, setFields] = useState<UserInitialData>(emptyFields);
    const [ui, setUi] = useState(initialUi);
    const [touched, setTouched] = useState(initialTouched);

    const toggleRole = (id_role: number) => {
        // Atualizo o estado mantendo a imutabilidade
        setFields(prev => ({
            ...prev, // recupero todos os campos anteriores

            // Verifico se o ID da role já existe no array de roles
            id_roles: prev.id_roles.includes(id_role)
                ? // CASO JÁ EXISTA: Filtra o array e remove o ID que desobedesce a condição de comparação, ou seja o id que ja existe. (Desmarca a role)
                prev.id_roles.filter(id => id !== id_role)
                : // CASO NÃO EXISTA: Cria um novo array com os IDs antigos + o novo (Marcar)
                [...prev.id_roles, id_role]
        }));
    };

    const { isValid } = validateUser(fields);
    const showErrors = getUserFormErrors(fields, touched, ui.submitted);

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const toggleShowPassword = () =>
        setUi(prev => ({ ...prev, showPassword: !prev.showPassword }));

    const toggleShowConfirm = () =>
        setUi(prev => ({ ...prev, showConfirm: !prev.showConfirm }));

    const buildPayload = (): UserPayload => ({
        name: fields.name,
        email: fields.email,
        cpf: fields.cpf,
        password: fields.password,
        id_roles: fields.id_roles
    });

    const createForm = useCallback((initialData?: UserInitialData) => {
      setFields(initialData ?? emptyFields);
      setUi(initialUi);
      setTouched(initialTouched);
    }, []);

    const handleSubmit = async (id_user?: number) => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

      try {
            setUi(prev => ({ ...prev, loading: true }));
            if(mode === "edit" && id_user){
                await updateUser(id_user, buildPayload());
            } else{
                await createUser(buildPayload());
            }
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => router.push("/admin/users"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        fields, ui, showErrors,
        setField, handleBlur, toggleRole,
        toggleShowPassword, toggleShowConfirm, handleSubmit, createForm
    };
}
