// import { useEffect, useState } from "react";
// import type { CategoryResponseDTO } from "../../../@types/category/category.dto";
// import { fetchCategoryById } from "../../../services/realServices/category.service";
// import toast from "react-hot-toast";

// export function useFetchCategory(id_category: number){
//     const [category, setCategory] = useState<CategoryResponseDTO>();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchCategoryById(id_category)
//         .then(response => {
//             setCategory(response);
//         }).catch(() =>
//             toast.error("Não foi possivel encontrar o jogo ou ele não existe.")
//         ).finally(() =>
//             setIsLoading(false)
//         );
//     }, [id_category]);

//     return { category, isLoading }
// }
