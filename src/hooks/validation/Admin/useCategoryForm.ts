import { useCallback, useState } from "react";
import { router } from "expo-router";
import { validateCategory } from "../../../utils/Validation/Admin/ValidateCategory";
import { createCategory, updateCategory } from "../../../services/realServices/category.service";
import { getCategoryFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import type { CategoryPayload } from "../../../@types/category/category.payload";

type CategoryFormData = "create" | "edit";

type CategoryInitialData = {
    name: string,
    description: string,
    image: string
}

const emptyFields: CategoryInitialData = {
    name: "",
    description: "",
    image: "",
}

const initialUi = {
  loading: false, submitted: false,
  success: false, apiError: null as string | null,
}

const initialTouched = {
  name: false,
  description: false,
  image: false
}

/**
 * Estado e validação do formulário de categoria (criação e edição).
 *
 * O hook não recebe dados iniciais: sempre nasce com `emptyFields`.
 * Quem preenche o formulário é o componente, chamando `createForm`:
 *   - modo "create": `createForm()` → campos vazios
 *   - modo "edit":   `createForm(initialData)` quando a categoria chega da API
 *
 * @param mode "create" ou "edit"; decide se `handleSubmit` chama createCategory ou updateCategory.
 * @returns
 *  - `fields`, `ui`, `showErrors`, `isValid`: estado e validação atuais
 *  - `setField`, `handleBlur`, `toggleCategory`: handlers dos campos
 *  - `createForm(initialData?)`: (re)inicializa campos, `ui` e `touched`.
 *    Referência estável (useCallback com `[]`), segura em deps de useEffect/useFocusEffect.
 *  - `handleSubmit(id_category?)`: valida, envia e redireciona pra tabela em caso de sucesso
 */
export function useCategoryForm(mode: CategoryFormData){
    const [fields, setFields] = useState<CategoryInitialData>(emptyFields);

    const [ui, setUi] = useState(initialUi);

    const [touched, setTouched] = useState(initialTouched);

    const { isValid } = validateCategory(fields); // mesma validação
    const showErrors = getCategoryFormErrors(fields, touched, ui.submitted); // mesmos erros

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const buildPayload = (): CategoryPayload => ({
        name: fields.name,
        description: fields.description,
        image: fields.image || undefined
    });

    const createForm = useCallback((initialData?: CategoryInitialData) => {
      setFields(initialData ?? emptyFields);
      setUi(initialUi);
      setTouched(initialTouched);
    }, []);

    const handleSubmit = async (id_category?: number) => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            if(mode === "edit" && id_category){
                await updateCategory(id_category, buildPayload());
            } else{
                await createCategory(buildPayload());
            }
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => router.replace("/admin/categories"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        fields, ui, showErrors, isValid,
        setField, handleBlur, handleSubmit, createForm
    };
}
