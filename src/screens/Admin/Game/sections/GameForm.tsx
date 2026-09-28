import { InputFieldForm } from "@/src/components/common/Forms/InputFieldForm";
import { LoadingDots } from "@/src/components/common/Forms/LoadingDots";
import { SelectForm } from "@/src/components/common/Forms/SelectForm";
import { TextAreaForm } from "@/src/components/common/Forms/TextAreaFrom";
import { FieldVerify } from "@/src/components/common/Forms/VerifyComponents/section/FieldVerify";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { H3, P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFetchGame } from "@/src/hooks/fetchItems/fetchOne/useFetchGame";
import { useFetchCategories } from "@/src/hooks/fetchItems/store/useFetchCategories";
import { useImageUpload } from "@/src/hooks/upload/useImageUpload";
import { useGameForm } from "@/src/hooks/validation/Admin/useGameForm";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { isLaunchDateValid } from "@/src/utils/Validation/dataRules/Game/gameLaunchDate";
import { isPriceValid, maskPrice } from "@/src/utils/Validation/dataRules/Game/gamePrice";
import { isTitleValid } from "@/src/utils/Validation/dataRules/Game/gameTitle";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { ArrowRightIcon, CalendarIcon, CheckIcon, CurrencyDollarSimpleIcon, ImageIcon, LinkIcon, SealCheckIcon, TextTIcon } from "phosphor-react-native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Image, View } from "react-native";

type GameFormProps = {
  mode: "create" | "edit";
}

export function GameForm({ mode }: GameFormProps) {
  const { theme, space, radius, font, fontSize } = useTheme();
  const { id_game } = useLocalSearchParams<{ id_game: string }>();

  const { game, isLoading: isGameLoading, refetch: refetchGame } = useFetchGame(Number(id_game), {
    enabled: mode === "edit",
  });
  const { categories, isLoading: isCategoriesLoading } = useFetchCategories();

  const categoryIds = useMemo(() => {
    if (!game?.categories || !categories) return [];

    const categoryNameToIdMap = new Map(
      categories.map((category) => [category.name, category.id_category])
    );

    return game.categories.map((name) => categoryNameToIdMap.get(name)!)
  }, [game, categories]);

  const getInitialData = useMemo(() => {
    if (!game || mode !== "edit") return undefined;

    return {
      title: game.title,
      description: game.description ?? "",
      price: game.price.toString(),
      image: game.image ?? "",
      banner_image: game.banner_image ?? "",
      link: game.link ?? "",
      launch_date: new Date(game.launch_date).toISOString().split("T")[0],
      active: game.active ? "true" : "false",
      categories: categoryIds,
    }
  }, [game, mode, categoryIds]);

  const { fields, ui, setField, handleSubmit, toggleCategory, handleBlur, showErrors, selectOptions, createForm } = useGameForm(mode);

  const isFirstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (mode === "edit") {
        if (isFirstFocus.current) { isFirstFocus.current = false; return; }
        refetchGame();
      } else if (mode === "create") {
        createForm();
      }

    }, [mode, refetchGame, isFirstFocus, createForm])
  )

  useEffect(() => {
    if (mode === "edit" && getInitialData) {
      createForm(getInitialData);
    }
  }, [getInitialData, mode, createForm])

  const bannerUpload = useImageUpload('game', setField("banner_image"));
  const cardUpload = useImageUpload('game', setField("image"));

  const isLoading = (mode === "edit" && isGameLoading) || isCategoriesLoading;
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", gap: space[3], width: "100%" }}>
        <Spinner />
      </View>
    );
  }

  if (mode === "edit" && !game) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", gap: space[3], width: "100%" }}>
        <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor }}>Jogo não encontrado.</P>
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
            <H3>{mode === "create" ? "Jogo cadastrado!" : "Jogo atualizado!"}</H3>
          </View>
      );
  }

  return (
    <View style={{ gap: space[3], width: "100%" }}>
      <InputFieldForm label="Título" value={fields.title} onChangeState={setField("title")} onBlur={handleBlur("title")} placeholder="Nome do jogo" maxLength={50} icon={<TextTIcon size={18} color={theme.secondaryColor} />} />
      <FieldVerify showError={showErrors.showErrorTitle} passed={isTitleValid(fields.title)} errorMessage="O titulo do jogo tem que ter 1 ou até no maximo 50 caracteres"/>

      <InputFieldForm label="Preço" value={fields.price} onChangeState={(value) => setField("price")(maskPrice(value))} onBlur={handleBlur("price")} placeholder="ex: 49.90" keyboardType="numeric" icon={<CurrencyDollarSimpleIcon size={18} color={theme.secondaryColor} />} />
      <FieldVerify showError={showErrors.showErrorPrice} passed={isPriceValid(fields.price)} errorMessage="O preço tem que ser maior ou igual a 0" />

      <TextAreaForm label="Descrição" value={fields.description} onChangeState={setField("description")} placeholder="Descrição do jogo" maxLength={255} />

      <View style={{ gap: space[3] }}>
        <P style={{color: theme.textPrimary, fontSize: fontSize.md, fontFamily: font.baseMedium}}>Imagem do card:</P>
        <Button variant="primary" onPress={cardUpload.handleFileUpload} disabled={cardUpload.uploading} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
          <ImageIcon size={18} color={theme.textPrimary} />
          <P>Escolher imagem do card</P>
        </Button>
        {cardUpload.uploading && <Spinner />}
        {(cardUpload.previewUrl || fields.image) && (
          <View style={{ alignItems: "center", gap: space[2] }}>
            <Image source={{ uri: cardUpload.previewUrl ?? resolveImageUrl(fields.image) }} style={{ width: 160, height: 128, borderRadius: 8 }} resizeMode="contain" />
            <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor }}>Preview da Imagem no Card</P>
          </View>
        )}
      </View>

      <View style={{ gap: space[3] }}>
        <P style={{color: theme.textPrimary, fontSize: fontSize.sm, fontFamily: font.baseMedium}}>Imagem do banner:</P>
        <Button variant="primary" onPress={bannerUpload.handleFileUpload} disabled={bannerUpload.uploading} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
          <ImageIcon size={18} color={theme.textPrimary} />
          <P>Escolher imagem do banner</P>
        </Button>
        {bannerUpload.uploading && <Spinner />}
        {(bannerUpload.previewUrl || fields.banner_image) && (
          <View style={{ alignItems: "center", gap: space[2] }}>
            <Image source={{ uri: bannerUpload.previewUrl ?? resolveImageUrl(fields.banner_image) }} style={{ width: 160, height: 128, borderRadius: 8 }} resizeMode="contain" />
            <P style={{ fontSize: fontSize.sm, color: theme.secondaryColor }}>Preview da Imagem do banner</P>
          </View>
        )}
      </View>

      <InputFieldForm label="Link (Steam/plataforma)" value={fields.link} onChangeState={setField("link")} placeholder="https://store.steampowered.com/..." maxLength={255} icon={<LinkIcon size={18} color={theme.secondaryColor} />} />

      <InputFieldForm label="Data de lançamento" value={fields.launch_date} onChangeState={setField("launch_date")} onBlur={handleBlur("launch_date")} placeholder="AAAA-MM-DD" icon={<CalendarIcon size={18} color={theme.secondaryColor} />} />
      <FieldVerify showError={showErrors.showErrorLaunchDate} passed={isLaunchDateValid(fields.launch_date)} errorMessage="A data de lançamento precisa estar preenchida" />

      <SelectForm label="Jogo ativo (visível na loja)" options={selectOptions} value={String(fields.active)} onChangeState={setField("active")} icon={<SealCheckIcon size={20} color={theme.secondaryColor} weight="thin" />} />
      <FieldVerify showError={showErrors.showErrorActive} passed={fields.active !== undefined} errorMessage="É necessário saber se o jogo vai aparecer na loja" />

      <View style={{ gap: space[2] }}>
        <P style={{ fontFamily: font.baseMedium }}>Categorias</P>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space[2] }}>
          {categories.map((category) => {
            const active = fields.categories.includes(category.id_category!);
            return (
              <Button key={category.id_category} variant={active ? "cta" : "primary"} onPress={() => toggleCategory(category.id_category!)} style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}>
                <P style={{ color: active ? "#FFF" : theme.textPrimary }}>{category.name}</P>
              </Button>
            );
          })}
        </View>
      </View>


      {ui.apiError && <P style={{ color: theme.danger, textAlign: "center", fontSize: fontSize.sm }}>{ui.apiError}</P>}

      <Button
        onPress={() => handleSubmit(game?.id_game)}
        disabled={ui.loading} variant="cta" style={{ padding: space[3], borderRadius: radius.md, marginTop: space[2] }}
      >
          {ui.loading ? <LoadingDots /> : (
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", gap: space[2], justifyContent: "center" }}>
              <P style={{ color: "#FFF", textTransform: "uppercase", fontFamily: font.baseMedium }}>{mode === "create" ? "Cadastrar Jogo" : "Salvar Alterações"}</P>
              <ArrowRightIcon size={16} color="#FFF" weight="bold" />
            </View>
          )}
      </Button>
    </View>
  );
}
