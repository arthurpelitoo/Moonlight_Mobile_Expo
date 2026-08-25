import { useCallback, useState } from "react";


type ParamsRecord = Record<string, string | undefined>;

/**
 * Hook para usar funções que atualizam parametros de pesquisa.
 */
export function useUpdateUrlParam() {
  const [params, setParams] = useState<ParamsRecord>({});

  const updateURLParam = useCallback((key: string, value: string | undefined) => {
    setParams((prev) => {
      const next = { ...prev };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  }, []);

  const updateURLParams = useCallback((
    paramsToUpdate: Record<string, string | undefined>,
  ) => {
    setParams((prev) => {
      const next = { ...prev };
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value) next[key] = value;
        else delete next[key];
      });
      return next;
    });
  }, []);

  const searchParams = {
    get: (key: string) => params[key] ?? null
  }

  return {
    searchParams, updateURLParam, updateURLParams
  }
}
