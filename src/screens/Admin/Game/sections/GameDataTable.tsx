import { ConfirmModal } from "../../../../components/common/Generic/ConfirmModal";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useCallback, useMemo, useState } from "react";
import { SearchInputBar } from "../../../../components/common/Generic/SearchInputBar";
import { useUpdateUrlParam } from "../../../../hooks/updateUrlParam/useUpdateUrlParam";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { useFetchGamesTable } from "../../../../hooks/fetchItems/table/useFetchGamesTable";
import { useGameFilters } from "../../../../hooks/filters/admin/useGameFilters";
import { GameFilterSideBar } from "./GameFilterSideBar";
import { useGameTable } from "@/src/hooks/tables/admin/useGameTable";
import { PlusIcon, SlidersIcon, WarningIcon } from "phosphor-react-native";
import { View } from "react-native";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFocusEffect, useRouter } from "expo-router";

export function GameDataTable() {
  const { theme, space, radius } = useTheme();
  const router = useRouter();

  const { filters } = useGameFilters();
  const { updateURLParam, updateURLParams } = useUpdateUrlParam();
  const [title, setTitle] = useState(filters.title ?? "");

  const query: GamePaginatedQueryPayload = useMemo(() => ({
    limit: 5, random: false,
    title: filters.title, category: filters.category,
    launch_date_from: filters.launch_date_from, launch_date_to: filters.launch_date_to,
    price_min: filters.price_min, price_max: filters.price_max,
    active: filters.active
  }), [filters.title, filters.category, filters.launch_date_from, filters.launch_date_to, filters.price_min, filters.price_max, filters.active]);

  const {games, isLoading, refetch, internalPage, setInternalPage, totalRows} = useFetchGamesTable(query);
  const {GameColumns, confirmDeleteId, setConfirmDeleteId, handleDelete} = useGameTable(refetch);
  const [filterOpen, setFilterOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTitle("");
      updateURLParams({title: undefined, category: undefined, launch_date_from: undefined, launch_date_to: undefined, price_min: undefined, price_max: undefined, active: undefined });
      refetch();
    }, [refetch, updateURLParams])
  );

  return (
    <>
      <GameFilterSideBar open={filterOpen} onClose={() => setFilterOpen(false)} />
      {confirmDeleteId && (
        <ConfirmModal
          icon={<WarningIcon size={18} color="#f87171" />}
          title="Apagar Registro"
          message="Tem certeza de que deseja apagar este registro?"
          onConfirm={() => {
            handleDelete(confirmDeleteId)
            refetch();
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
      <Table
          columns={GameColumns}
          data={games || []}
          isLoading={isLoading}
          subHeader
          subHeaderComponent={
            <View style={{ gap: space[3], width: "100%" }}>
              <P>Pesquisar por titulo:</P>
              <View style={{ flexDirection: "row", gap: space[2], alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <SearchInputBar
                    placeholder="Pesquisar titulo.."
                    value={title}
                    onChangeText={setTitle}
                    onSearch={(value: string) => updateURLParam("title", value)}
                  />
                </View>
                <Button variant="primary" onPress={() => setFilterOpen(true)} style={{ padding: space[2], borderRadius: radius.md }}>
                  <SlidersIcon size={18} color={theme.textPrimary} />
                </Button>
              </View>
              <Button variant="cta" onPress={() => router.push("/admin/games/create")} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
                <PlusIcon size={18} color="#FFF" weight="thin" />
                <P style={{ color: "#FFF" }}>Cadastrar Jogo</P>
              </Button>
            </View>
          }
          pageSize={query.limit}
          currentPage={internalPage}
          onPageChange={setInternalPage}
          totalRows={totalRows}
        />
    </>
  )
}
