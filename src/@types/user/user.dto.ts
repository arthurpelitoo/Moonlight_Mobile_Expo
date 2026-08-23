import type { AuthUserResponseDTO } from "../auth/auth.dto";
import type { ApiResponse } from "../common/apiResponse";

export interface UserResponseDTO {
  id_user: number;
  name: string;
  email: string;
  cpf: string;
  type: 'admin' | 'customer';
}

export interface UpdateMeResponseDTO extends ApiResponse {
    user: AuthUserResponseDTO
}
