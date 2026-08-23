// import { useSearchParams } from "react-router-dom";

// /**
//  * Hook para usar funções que atualizam parametros de url
//  * e o hook de searchparams do react-router-dom.
//  */
// export function useUpdateUrlParam() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const updateURLParam = (key: string, value: string | undefined) => {
//     setSearchParams((prev) => {
//       if (value) prev.set(key, value);
//       else prev.delete(key);
//       return prev;
//     });
//   };

//   const updateURLParams = (
//     paramsToUpdate: Record<string, string | undefined>,
//   ) => {
//     setSearchParams((prev) => {
//       Object.entries(paramsToUpdate).forEach(([key, value]) => {
//         if (value) prev.set(key, value);
//         else prev.delete(key);
//       });
//       return prev;
//     });
//   };

//   return {
//     searchParams, updateURLParam, updateURLParams
//   }
// }
