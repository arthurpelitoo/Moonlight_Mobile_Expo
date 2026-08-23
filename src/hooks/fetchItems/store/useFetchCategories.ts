// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchCategories } from "../../../services/realServices/category.service";
// import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

// export function useFetchCategories() {
//   const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     setIsLoading(true);
//     fetchCategories()
//       .then((response) => {
//         if (isMounted) {
//           setCategories(response || []);
//           setIsLoading(false);
//         }
//       })
//       .catch(() => toast.error("Não foi possivel carregar as categorias."))
//       .finally(() => {
//         if (isMounted) setIsLoading(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return { categories, isLoading };
// }
