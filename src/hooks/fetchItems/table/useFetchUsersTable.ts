// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchUsersPaginated } from "../../../services/realServices/user.service";
// import type { UserPaginatedQueryPayload } from "../../../@types/user/user.payload";
// import type { UserResponseDTO } from "../../../@types/user/user.dto";

// export function useFetchUsersTable(query: UserPaginatedQueryPayload){
//     const [users, setUsers] = useState<UserResponseDTO[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [totalRows, setTotalRows] = useState(0);
//     const [internalPage, setInternalPage] = useState(1);
//     const [version, setVersion] = useState(0);

//     const {limit, cpf, email, name, type} = query

//     useEffect(() => {
//         setUsers([]);
//         setInternalPage(1);
//     }, [limit, cpf, email, name, type]);

//     useEffect(() => {
//         let isMounted = true;

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         setIsLoading(true)
//         fetchUsersPaginated(query)
//         .then(({ data, total }) => {
//             if (isMounted) {
//                 setUsers(data);
//                 setTotalRows(total);
//             }
//         }).catch(() =>
//             toast.error("Não foi possivel carregar os usuarios.")
//         ).finally(() => {
//             if(isMounted) setIsLoading(false)
//         });
//         return () => { isMounted = false; };

//     }, [internalPage, limit, cpf, email, name, type, version]);

//     const refetch = () => setVersion(v => v + 1);

//     return { users, isLoading, totalRows, onPageChange: setInternalPage, refetch }
// }
