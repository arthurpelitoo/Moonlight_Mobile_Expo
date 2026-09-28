import { Button } from "../../../../components/common/Generic/Button/Button";
import { InputBar } from "../../../../components/common/Generic/InputBar";
import { useState } from "react";
import { useFetchCategories } from "../../../../hooks/fetchItems/store/useFetchCategories";
import { useGameFilters } from "../../../../hooks/filters/admin/useGameFilters";
import { maskPrice } from "../../../../utils/Validation/dataRules/Game/gamePrice";
import { Modal, ScrollView, View } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { H3, P } from "@/src/components/common/Generic/Text";
import { XIcon } from "phosphor-react-native";

type GameFilterSideBarProps = {
  open: boolean;
  onClose: () => void;
}

export function GameFilterSideBar(props: GameFilterSideBarProps) {
  const { theme, space, radius, font, currentColor } = useTheme();
  const { categories } = useFetchCategories();
  const { filters } = useGameFilters();

  // estado local — segura o que o usuário está digitando
  const [priceMin, setPriceMin] = useState(filters.price_min ? String(filters.price_min) : "0.00");
  const [priceMax, setPriceMax] = useState(filters.price_max ? String(filters.price_max) : "0.00");
  const [launchDateFrom, setLaunchDateFrom] = useState(filters.launch_date_from ?? "");
  const [launchDateTo, setLaunchDateTo] = useState(filters.launch_date_to ?? "");

  function handlePriceCleanUp() {
    setPriceMin("0.00");
    setPriceMax("0.00");
    filters.onPriceCleanUp?.();
  }

  function handleLaunchDateCleanUp() {
    setLaunchDateFrom("");
    setLaunchDateTo("");
    filters.onLaunchCleanUp?.();
  }

  function handleConfirmPrice() { filters.onConfirmPrice?.(priceMin, priceMax); }
  function handleConfirmLaunchDate() { filters.onConfirmLaunchDate?.(launchDateFrom, launchDateTo); }

  return (
    <Modal visible={props.open} animationType="slide" transparent onRequestClose={props.onClose}>
      <View style={{ flex: 1, backgroundColor: currentColor === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: theme.baseSoft, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, maxHeight: "80%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: space[5] }}>
            <H3>Filtros</H3>
            <Button variant="transparent" onPress={props.onClose}><XIcon size={20} color={theme.textPrimary} /></Button>
          </View>
          <ScrollView contentContainerStyle={{ padding: space[5], gap: space[5] }}>
            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Categorias</P>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space[2] }}>
                <Button variant="transparent"
                onPress={() => {
                  filters.onChangeCategory("");
                  props.onClose();
                }}>
                  Limpar
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category.id_category}
                    variant={category.name === filters.category ? "cta" : "primary"}
                    onPress={() => {
                      filters.onChangeCategory(category.name);
                      props.onClose()
                    }}
                    style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}
                  >
                    {category.name}
                  </Button>
                ))}
              </View>
            </View>

            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Preços</P>
              <Button onPress={() => handlePriceCleanUp()}>Limpar Filtros</Button>
              <View style={{ flexDirection: "row", gap: space[3], alignItems: "center" }}>
                <InputBar variant="secondary" value={priceMin} onChangeText={(v) => setPriceMin(maskPrice(v))} placeholder="min." keyboardType="numeric" style={{ flex: 1 }} />
                <P>até</P>
                <InputBar variant="secondary" value={priceMax} onChangeText={(v) => setPriceMax(maskPrice(v))} placeholder="max." keyboardType="numeric" style={{ flex: 1 }} />
              </View>
              <Button variant="cta" onPress={() => handleConfirmPrice()} style={{ padding: space[2], borderRadius: radius.md }}><P style={{ color: "#FFF", textAlign: "center" }}>Aplicar</P></Button>
            </View>
            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Data de Lançamento</P>
              <Button onPress={() => handleLaunchDateCleanUp()}>Limpar Filtros</Button>
              <View style={{ flexDirection: "row", gap: space[3], alignItems: "center" }}>
                <InputBar variant="secondary" value={launchDateFrom} onChangeText={setLaunchDateFrom} placeholder="AAAA-MM-DD" style={{ flex: 1 }} />
                <P>até</P>
                <InputBar variant="secondary" value={launchDateTo} onChangeText={setLaunchDateTo} placeholder="AAAA-MM-DD" style={{ flex: 1 }} />
              </View>
              <Button variant="cta" onPress={() => handleConfirmLaunchDate()} style={{ padding: space[2], borderRadius: radius.md }}><P style={{ color: "#FFF", textAlign: "center" }}>Aplicar</P></Button>
            </View>
            <View style={{ gap: space[2] }}>
              <P style={{ fontFamily: font.baseMedium }}>Jogo Ativo</P>
              <View style={{ flexDirection: "row", gap: space[2] }}>
                <Button onPress={() => filters.onChangeActive("")} variant={filters.active === undefined ? "cta" : "primary"} style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}>Todos</Button>
                <Button onPress={() => filters.onChangeActive("true")} variant={filters.active === true ? "cta" : "primary"} style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}>Sim</Button>
                <Button onPress={() => filters.onChangeActive("false")} variant={filters.active === false ? "cta" : "primary"} style={{ paddingHorizontal: space[3], paddingVertical: space[2], borderRadius: radius.md }}>Não</Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
