import { useCallback, useEffect, useState } from "react";
import type { UserResponseDTO } from "../../../@types/user/user.dto";
import { fetchUserById } from "../../../services/realServices/user.service";
import Toast from "react-native-toast-message";
import { UseFetchOptions } from "@/src/@types/common/useFetchOptions";

export function useFetchUser(id_user: number, options: UseFetchOptions = {}){
    const { enabled = true } = options;
    const [user, setUser] = useState<UserResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);
    const [version, setVersion] = useState(0);

    useEffect(() => {
      if (!enabled) return;
      let cancelled = false;
      setIsLoading(true);
      fetchUserById(id_user)
        .then(response => { if (!cancelled) setUser(response); })
        .catch(() => { if (!cancelled) Toast.show({ type: "error", text1: "Não foi possivel encontrar o usuario ou ele não existe."}) })
        .finally(() => { if (!cancelled) setIsLoading(false) });
      return () => { cancelled = true; }
    }, [id_user, enabled, version]);

    const refetch = useCallback(() => setVersion(v => v + 1), []);

    return { user, isLoading, refetch }
}
