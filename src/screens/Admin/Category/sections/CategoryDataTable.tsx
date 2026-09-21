import { ConfirmModal } from "../../../../components/common/Generic/ConfirmModal";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useMemo, useState } from "react";
import { SearchInputBar } from "../../../../components/common/Generic/SearchInputBar";
import { useUpdateUrlParam } from "../../../../hooks/updateUrlParam/useUpdateUrlParam";
import type { CategoryPaginatedQueryPayload } from "../../../../@types/category/category.payload";
import { useCategoryFilters } from "../../../../hooks/filters/admin/useCategoryFilters";
import { useFetchCategoriesTable } from "../../../../hooks/fetchItems/table/useFetchCategoriesTable";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useCategoryTable } from "@/src/hooks/tables/admin/useCategoryTable";
import { PlusIcon, WarningIcon } from "phosphor-react-native";
import { View } from "react-native";
import { P } from "@/src/components/common/Generic/Text";

export function CategoryDataTable() {
  const { theme, space, radius } = useTheme();
  const router = useRouter();

  const { filters } = useCategoryFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [name, setName] = useState(filters.name ?? "");

  const query: CategoryPaginatedQueryPayload = useMemo(() => ({
      limit: 5,
      random: false,
      name: filters.name,
  }), [filters.name]);

  const {categories, isLoading, refetch, internalPage, setInternalPage, totalRows} = useFetchCategoriesTable(query);
  const { CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete } = useCategoryTable(refetch);

  return (
    <>
      {confirmDeleteId &&
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
      }
      <Table
        columns={CategoryColumns}
        data={categories || []}
        isLoading={isLoading}
        subHeader
        subHeaderComponent={
          <View style={{ gap: space[3], width: "100%" }}>
            <P>Pesquisar por nome:</P>
            <View style={{ flexDirection: "row", gap: space[2], alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <SearchInputBar
                  placeholder="Pesquisar nome..."
                  value={name}
                  onChangeText={setName}
                  onSearch={(value: string) => updateURLParam("name", value)}
                />
              </View>
            </View>
            <Button variant="cta" onPress={() => router.push("/admin/categories/create")} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
              <PlusIcon size={18} color="#FFF" weight="thin" />
              <P style={{ color: "#FFF" }}>Cadastrar categoria</P>
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
