import { useCallback, useSyncExternalStore } from "react";
import { urlParamStore } from "@/src/utils/urlParamStore";

export function useUpdateUrlParam() {
  const params = useSyncExternalStore(urlParamStore.subscribe, urlParamStore.getSnapshot);

  const updateURLParam = useCallback((key: string, value: string | undefined) => {
    urlParamStore.setParam(key, value);
  }, []);

  const updateURLParams = useCallback((paramsToUpdate: Record<string, string | undefined>) => {
    urlParamStore.setParams(paramsToUpdate);
  }, []);

  const searchParams = {
    get: (key: string): string | null => params[key] ?? null,
  };

  return { searchParams, updateURLParam, updateURLParams };
}
