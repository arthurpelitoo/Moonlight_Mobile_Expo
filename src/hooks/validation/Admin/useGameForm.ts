import { useCallback, useState } from "react";
import { router } from "expo-router";
import { validateGame } from "../../../utils/Validation/Admin/ValidateGame";
import { getGameFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import { createGame, updateGame } from "../../../services/realServices/game.service";
import type { GamePayload } from "../../../@types/game/game.payload";

type GameFormData = "create" | "edit";

type GameInitialData = {
  title: string,
  description: string,
  price: string,
  image: string,
  banner_image: string,
  link: string,
  launch_date: string,
  active: string,
  categories: number[],
}

const emptyFields: GameInitialData = {
  title: "",
  description: "",
  price: "0.00",
  image: "",
  banner_image: "",
  link: "",
  launch_date: "",
  active: "true",
  categories: [] as number[],
}

const initialUi = {
  showPassword: false, showConfirm: false,
  loading: false, submitted: false,
  success: false, apiError: null as string | null,
}

const initialTouched = {
  title: false, price: false, launch_date: false, active: false
}

/**
 * Estado e validação do formulário de jogo (criação e edição).
 *
 * O hook não recebe dados iniciais: sempre nasce com `emptyFields`.
 * Quem preenche o formulário é o componente, chamando `createForm`:
 *   - modo "create": `createForm()` → campos vazios
 *   - modo "edit":   `createForm(initialData)` quando o jogo chega da API
 *
 * @param mode "create" ou "edit"; decide se `handleSubmit` chama createGame ou updateGame.
 * @returns
 *  - `fields`, `ui`, `showErrors`, `isValid`: estado e validação atuais
 *  - `setField`, `handleBlur`, `toggleCategory`: handlers dos campos
 *  - `createForm(initialData?)`: (re)inicializa campos, `ui` e `touched`.
 *    Referência estável (useCallback com `[]`), segura em deps de useEffect/useFocusEffect.
 *  - `handleSubmit(id_game?)`: valida, envia e redireciona pra tabela em caso de sucesso
 *  - `selectOptions`: opções do select "Jogo ativo"
 */
export function useGameForm(mode: GameFormData) {
  const [fields, setFields] = useState<GameInitialData>(emptyFields);
  const [ui, setUi] = useState(initialUi);
  const [touched, setTouched] = useState(initialTouched);

  const toggleCategory = (id_category: number) => {
      // Atualizo o estado mantendo a imutabilidade
      setFields(prev => ({
          ...prev, // recupero todos os campos anteriores (title, price, etc.)

          // Verifico se o ID da categoria já existe no array de categorias
          categories: prev.categories.includes(id_category)
              ? // CASO JÁ EXISTA: Filtra o array e remove o ID que desobedesce a condição de comparação, ou seja o id que ja existe. (Desmarca a categoria)
              prev.categories.filter(id => id !== id_category)
              : // CASO NÃO EXISTA: Cria um novo array com os IDs antigos + o novo (Marcar)
              [...prev.categories, id_category]
      }));
  };

  const { isValid } = validateGame(fields);
  const showErrors = getGameFormErrors(fields, touched, ui.submitted);

  const selectOptions = [
      {
          value: "false",
          label: "Não"
      },
      {
          value: "true",
          label: "Sim"
      }
  ]

  const setField = (field: keyof typeof fields) => (value: string) => {
      setFields(prev => ({ ...prev, [field]: value }));
      setUi(prev => ({ ...prev, apiError: null }));
  };

  const handleBlur = (field: keyof typeof touched) => () =>
      setTouched(prev => ({ ...prev, [field]: true }));

  const buildPayload = (): GamePayload => ({
      title: fields.title,
      description: fields.description || undefined,
      price: parseFloat(fields.price),
      image: fields.image || undefined,
      banner_image: fields.banner_image || undefined,
      link: fields.link || undefined,
      launch_date: new Date(fields.launch_date).toISOString().split("T")[0],
      active: fields.active === "true",
      categories: fields.categories,
  });

  const createForm = useCallback((initialData?: GameInitialData) => {
    setFields(initialData ?? emptyFields);
    setUi(initialUi);
    setTouched(initialTouched);
  }, []);

  const handleSubmit = async (id_game?: number) => {
      setUi(prev => ({ ...prev, submitted: true, apiError: null }));
      if (!isValid) return;

      try {
          setUi(prev => ({ ...prev, loading: true }));
          if(mode === "edit" && id_game){
              await updateGame(id_game, buildPayload());
          } else{
              await createGame(buildPayload());
          }
          setUi(prev => ({ ...prev, success: true }));
          setTimeout(() => router.replace("/admin/games"), 1500);
      } catch (err) {
          const message = err instanceof Error ? err.message : "Erro inesperado.";
          setUi(prev => ({ ...prev, apiError: message }));
      } finally {
          setUi(prev => ({ ...prev, loading: false }));
      }
  };

  return {
      fields, selectOptions, ui, showErrors, isValid, createForm,
      setField, handleBlur, toggleCategory, handleSubmit
  };
}
