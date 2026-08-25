import { useEffect, useState } from "react";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";
import { fetchCategoryById } from "../../../services/realServices/category.service";
import Toast from "react-native-toast-message";

export function useFetchCategory(id_category: number){
    const [category, setCategory] = useState<CategoryResponseDTO>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategoryById(id_category)
        .then(response => {
            setCategory(response);
        }).catch(() =>
          Toast.show({ type: "error", text1: "Não foi possivel encontrar a categoria ou ela não existe."})
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_category]);

    return { category, isLoading }
}
