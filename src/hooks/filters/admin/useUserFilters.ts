import { useUpdateUrlParam } from "../../updateUrlParam/useUpdateUrlParam";

export function useUserFilters() {
  const { searchParams, updateURLParam, updateURLParams} = useUpdateUrlParam();

  const filters = {
    name: searchParams.get("name") ?? undefined,
    cpf: searchParams.get("cpf") ?? undefined,
    email: searchParams.get("email") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    onChangeCpf: (cpf: string) => updateURLParam("cpf", cpf),
    onChangeEmail: (email: string) => updateURLParam("email", email),
    onChangeType: (type: string) => updateURLParam("type", type),

    onConfirmFilters: (cpf: string, email: string, type: string | undefined) =>
      updateURLParams({ cpf: cpf, email: email, type: type }),
    onCleanUpFilters: () =>
      updateURLParams({ cpf: undefined, email: undefined, type: undefined }),
  };

  return {
    filters
  };
}
