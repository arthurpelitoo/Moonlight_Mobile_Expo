import { useCallback, useEffect, useState } from "react";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";
import { fetchCategoryById } from "../../../services/realServices/category.service";
import Toast from "react-native-toast-message";
import { UseFetchOptions } from "@/src/@types/common/useFetchOptions";

export function useFetchCategory(id_category: number, options: UseFetchOptions = {}){
    const { enabled = true } = options;
    const [category, setCategory] = useState<CategoryResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);
    const [version, setVersion] = useState(0);

    useEffect(() => {
      if (!enabled) return;
      let cancelled = false;
      setIsLoading(true);
      fetchCategoryById(id_category)
        .then(response => { if (!cancelled) setCategory(response); })
        .catch(() => { if (!cancelled) Toast.show({ type: "error", text1: "Não foi possivel encontrar a categoria ou ela não existe."}) })
        .finally(() => { if (!cancelled) setIsLoading(false) });
      return () => { cancelled = true; }
    }, [id_category, enabled, version]);

    const refetch = useCallback(() => setVersion(v => v + 1), []);

    return { category, isLoading, refetch }
}
