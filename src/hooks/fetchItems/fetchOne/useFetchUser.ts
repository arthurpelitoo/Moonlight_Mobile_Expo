import { useEffect, useState } from "react";
import type { UserResponseDTO } from "../../../@types/user/user.dto";
import { fetchUserById } from "../../../services/realServices/user.service";
import Toast from "react-native-toast-message";

type UseFetchUserOptions = {
  enabled?: boolean;
};

export function useFetchUser(id_user: number, options: UseFetchUserOptions = {}){
    const { enabled = true } = options;
    const [user, setUser] = useState<UserResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) return;

        fetchUserById(id_user)
        .then(response => {
            setUser(response);
        }).catch(() =>
            Toast.show({ type: "error", text1: "Não foi possivel encontrar o usuario ou ele não existe."})
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_user]);

    return { user, isLoading }
}
