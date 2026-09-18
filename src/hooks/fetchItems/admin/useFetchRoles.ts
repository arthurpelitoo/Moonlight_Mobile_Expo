import { useEffect, useState } from "react";
import type { RoleResponseDTO } from "../../../@types/role/role.dto";
import { fetchRoles } from "../../../services/realServices/role.service";
import Toast from "react-native-toast-message";

export function useFetchRoles() {
  const [roles, setRoles] = useState<RoleResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsLoading(true);
    fetchRoles()
      .then((response) => {
        if (isMounted) {
          setRoles(response || []);
          setIsLoading(false);
        }
      })
      .catch(() => {
        Toast.show({ type: "error", text1: "Não foi possivel carregar os Cargos."})
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { roles, isLoading };
}
