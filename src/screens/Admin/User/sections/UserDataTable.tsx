import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { PlusIcon, SlidersIcon, WarningIcon } from "phosphor-react-native";
import { ConfirmModal } from "@/src/components/common/Generic/ConfirmModal";
import { Table } from "@/src/components/common/Generic/Table/Table";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { SearchInputBar } from "@/src/components/common/Generic/SearchInputBar";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFetchUsersTable } from "@/src/hooks/fetchItems/table/useFetchUsersTable";
import { useUserTable } from "@/src/hooks/tables/admin/useUserTable";
import { useUserFilters } from "@/src/hooks/filters/admin/useUserFilters";
import { useUpdateUrlParam } from "@/src/hooks/updateUrlParam/useUpdateUrlParam";
import { UserFilterSideBar } from "./UserFilterSideBar";
import type { UserPaginatedQueryPayload } from "@/src/@types/user/user.payload";
import { useFocusEffect, useRouter } from "expo-router";

export function UserDataTable() {
  const { theme, space, radius } = useTheme();
  const router = useRouter();

  const { filters } = useUserFilters();
  const { updateURLParam, updateURLParams } = useUpdateUrlParam();
  const [name, setName] = useState(filters.name ?? "");

  const query: UserPaginatedQueryPayload = useMemo(() => ({
    limit: 5, random: false,
    name: filters.name, cpf: filters.cpf, email: filters.email, role: filters.role,
  }), [filters.name, filters.cpf, filters.email, filters.role]);

  const { users, isLoading, refetch, internalPage, setInternalPage, totalRows } = useFetchUsersTable(query);

  const { UserColumns, confirmDeleteId, setConfirmDeleteId, handleDelete } = useUserTable(refetch);
  const [filterOpen, setFilterOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      updateURLParams({ name: undefined, cpf: undefined, email: undefined, role: undefined });
      refetch();
    }, [])
  )

  return (
    <>
      <UserFilterSideBar open={filterOpen} onClose={() => setFilterOpen(false)} />
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
        columns={UserColumns}
        data={users || []}
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
              <Button variant="primary" onPress={() => setFilterOpen(true)} style={{ padding: space[2], borderRadius: radius.md }}>
                <SlidersIcon size={18} color={theme.textPrimary} />
              </Button>
            </View>
            <Button variant="cta" onPress={() => router.push("/admin/users/create")} style={{ padding: space[3], borderRadius: radius.md, flexDirection: "row", gap: space[2], justifyContent: "center" }}>
              <PlusIcon size={18} color="#FFF" weight="thin" />
              <P style={{ color: "#FFF" }}>Cadastrar usuário</P>
            </Button>
          </View>
        }
        pageSize={query.limit}
        currentPage={internalPage}
        onPageChange={setInternalPage}
        totalRows={totalRows}
      />
    </>
  );
}
