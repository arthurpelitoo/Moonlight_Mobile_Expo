// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchPaginatedCategories } from "../../../services/realServices/category.service";
// import type { CategoryPaginatedQueryPayload } from "../../../@types/category/category.payload";
// import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

// export function useFetchPaginatedCategories(query: CategoryPaginatedQueryPayload){
//     const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const {page, limit, random, name} = query;

//     useEffect(() => {
//         let isMounted = true;

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         setIsLoading(true)

//         fetchPaginatedCategories({ page, limit, random, name })
//         .then(response => {
//             if (isMounted) {
//                 setCategories(response.data || []);
//             }
//         }).catch(() =>
//             toast.error("Não foi possivel carregar as categorias.")
//         ).finally(() => {
//             if(isMounted) setIsLoading(false);
//         });

//         return () => { isMounted = false; };
//     }, [ page, limit, random, name ]);

//     return { categories, isLoading }
// }
