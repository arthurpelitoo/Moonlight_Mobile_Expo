import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { formatCPF } from "../../../utils/Validation/dataRules/User/userCpf";
import { validateEditUser } from "../../../utils/Validation/Customer/ValidateEditUser";
import { getEditFormErrors } from "../../../utils/Validation/formErrors/Customer/getFormErrors";
import { updateMe } from "../../../services/realServices/user.service";

type EditInitialData = {
    name: string,
    cpf: string,
    password: string,
    confirmPassword: string,
}

const fallbackFields : EditInitialData = {
  name: "",
  password: "",
  confirmPassword: "",
  cpf: ""
}

const initialTouched = {
    name: false,
    cpf: false,
    password: false,
    confirmPassword: false,
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
 * Estado e validação do formulário de edição de usuario.
 *
 * O hook não recebe dados iniciais: sempre nasce com `emptyFields`.
 * Quem preenche o formulário é o componente, chamando `createForm`:
 *   - modo "create": `createForm()` → campos vazios
 *   - modo "edit":   `createForm(initialData)` quando o usuario chega da API
 *
 * @returns
 *  - `fields`, `ui`, `showErrors`, `isValid`: estado e validação atuais
 *  - `setField`, `handleBlur`, `toggleCategory`: handlers dos campos
 *  - `createForm(initialData?)`: (re)inicializa campos, `ui` e `touched`.
 *    Referência estável (useCallback com `[]`), segura em deps de useEffect/useFocusEffect.
 *  - `handleSubmit(id_user?)`: valida, envia e redireciona pra tabela em caso de sucesso
 */
export function useEditForm(){
  const { login, token, user } = useAuth();

  const [fields, setFields] = useState(fallbackFields);
  const [touched, setTouched] = useState(initialTouched);
  const [ui, setUi] = useState(initialUi);

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

  const createForm = useCallback((initialFields?: EditInitialData) => {
    setFields(initialFields ?? fallbackFields);
    setTouched(initialTouched);
    setUi(initialUi);
  }, []);

  const handleSubmit = async () => {
      setUi(prev => ({ ...prev, submitted: true, apiError: null }));
      if (!isValid) return;
      if (!user) return;

      try {
          setUi(prev => ({ ...prev, loading: true }));
          const data = await updateMe({
              name: fields.name,
              cpf: fields.cpf,
              password: fields.password,
          });
          await login(token!, data.user);
          setUi(prev => ({ ...prev, success: true }));
          setTimeout(() => {
              setUi(initialUi); // reseta
              setFields(prev => ({ ...prev, password: "", confirmPassword: ""}));
              setTouched(initialTouched);
              router.replace("/profile");
          }, 1500);
      } catch (err) {
          const message = err instanceof Error ? err.message : "Erro inesperado.";
          setUi(prev => ({ ...prev, apiError: message }));
      } finally {
          setUi(prev => ({ ...prev, loading: false }));
      }
  };

  return { fields, ui, showErrors, setField, setCpf, handleBlur, toggleShowPassword, toggleShowConfirm, handleSubmit, createForm };
}
