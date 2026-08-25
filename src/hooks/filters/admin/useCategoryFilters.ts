import { useUpdateUrlParam } from "../../updateUrlParam/useUpdateUrlParam";

export function useCategoryFilters() {
  const { searchParams } = useUpdateUrlParam();

  const filters = {
    name: searchParams.get("name") ?? undefined,
  };

  return {
    filters
  };
}
