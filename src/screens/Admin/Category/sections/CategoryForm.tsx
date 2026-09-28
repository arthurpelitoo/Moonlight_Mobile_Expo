import { InputFieldForm } from "../../../../components/common/Forms/InputFieldForm";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../components/common/Forms/LoadingDots";
import { useCategoryForm } from "../../../../hooks/validation/Admin/useCategoryForm";
import { isCategoryNameValid } from "../../../../utils/Validation/dataRules/Category/categoryName";
import { isDescriptionValid } from "../../../../utils/Validation/dataRules/Category/categoryDescription";
import { TextAreaForm } from "../../../../components/common/Forms/TextAreaFrom";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";
import { useImageUpload } from "@/src/hooks/upload/useImageUpload";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { H3, P } from "@/src/components/common/Generic/Text";
import { ArrowRightIcon, CheckIcon, ImageIcon, TagIcon } from "phosphor-react-native";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { useFetchCategory } from "@/src/hooks/fetchItems/fetchOne/useFetchCategory";

type CategoryFormProps = {
    mode: "create" | "edit";
}

export function CategoryForm({mode} : CategoryFormProps){
  const { theme, space, radius, font, fontSize } = useTheme();
  const { id_category } = useLocalSearchParams<{ id_category: string }>();

  const { category, isLoading: isCategoryLoading, refetch: refetchCategory } = useFetchCategory(Number(id_category), {
    enabled: mode === "edit",
  });

  const getInitialData = useMemo(() => {
    if (!category || mode !== "edit") return undefined;

    return {
      name: category.name,
      description: category.description,
      image: category.image ?? ""
    }
  }, [category, mode])

  const { fields, ui, setField, handleSubmit, handleBlur, showErrors, createForm } = useCategoryForm(mode);

  const isFirstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (mode === "edit") {
        if (isFirstFocus.current) { isFirstFocus.current = false; return; }
        refetchCategory();
      } else if (mode === "create") {
        createForm();
      }
    }, [mode, refetchCategory, isFirstFocus, createForm])
  )

  useEffect(() => {
    if (mode === "edit" && getInitialData) {
      createForm(getInitialData);
    }
  }, [mode, getInitialData, createForm])

  const { handleFileUpload, uploading, previewUrl } = useImageUpload('category', setField("image"));

  const isLoading = mode === "edit" && isCategoryLoading;
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", gap: space[3], width: "100%" }}>
        <Spinner />
      </View>
    );
  }

  if (mode === "edit" && !category) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", gap: space[3], width: "100%" }}>
        <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor }}>Categoria não encontrada.</P>
      </View>
    )
  }

  // Tela de sucesso
  if (ui.submitted && !ui.apiError && ui.success) {
      return (
          <View style={{ alignItems: "center", gap: space[6], paddingVertical: space[8] }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <CheckIcon size={32} color={theme.success} weight="bold" />
              </View>
              <H3>{mode === "create" ? "Categoria cadastrada!" : "Categoria atualizada!"}</H3>
          </View>
      );
  }

  return (
      <View style={{ gap: space[3], width: "100%" }}>
        <InputFieldForm
            label="Título"
            value={fields.name} onChangeState={setField("name")}
            onBlur={handleBlur("name")}
            placeholder="Nome da Categoria"
            maxLength={25}
            icon={<TagIcon size={18} color={theme.secondaryColor} />}
        />
        <FieldVerify showError={showErrors.showErrorName} passed={isCategoryNameValid(fields.name)} errorMessage="O nome da categoria tem que ter 1 ou até no maximo 25 caracteres"/>


        <TextAreaForm
            label="Descrição"
            value={fields.description} onChangeState={setField("description")}
            placeholder="Descrição da Categoria" maxLength={255}
        />
        <FieldVerify showError={showErrors.showErrorDescription} passed={isDescriptionValid(fields.description)} errorMessage="A descrição tem que ter 1 ou até no maximo 255 caracteres"/>


        <View style={{ gap: space[3] }}>
          <Button variant="primary" onPress={handleFileUpload} disabled={uploading} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
            <ImageIcon size={18} color={theme.textPrimary} />
            <P>Escolher imagem do card</P>
          </Button>
          {uploading && <Spinner />}
          {(previewUrl || fields.image) && (
            <View style={{ alignItems: "center", gap: space[2] }}>
              <Image source={{ uri: previewUrl ?? resolveImageUrl(fields.image) }} style={{ width: 160, height: 128, borderRadius: 8 }} resizeMode="contain" />
              <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor }}>Preview da Imagem da Categoria</P>
            </View>
          )}
        </View>

        {ui.apiError && <P style={{ color: theme.danger, textAlign: "center", fontSize: fontSize.sm }}>{ui.apiError}</P>}

          <Button
            onPress={() => handleSubmit(category?.id_category)}
            disabled={ui.loading} variant="cta" style={{ padding: space[3], borderRadius: radius.md, marginTop: space[2] }}
          >
              {ui.loading ? <LoadingDots /> : (
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", gap: space[2], justifyContent: "center" }}>
                  <P style={{ color: "#FFF", textTransform: "uppercase", fontFamily: font.baseMedium }}>{mode === "create" ? "Cadastrar Categoria" : "Salvar Alterações"}</P>
                  <ArrowRightIcon size={16} color="#FFF" weight="bold" />
                </View>
              )}
          </Button>
      </View>
  );
}
