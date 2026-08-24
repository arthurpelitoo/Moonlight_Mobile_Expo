import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { loginMock, registerMock } from "../fakeServices/auth.fakeservice";

export async function register(data: {
  name: string;
  email: string;
  cpf: string;
  password: string;
}) { /* empacoto os dados em objeto e transformando o objeto em JSON mando pra rota tal em metodo post para o corpo de requisição (req.body) */

    const cleanData = sanitizeData(data);

    if (process.env.EXPO_USE_MOCK === "true") {
        return registerMock(cleanData);
    }

  const response = await api.post("/api/auth/register", cleanData);
  return response.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) { /* empacoto os dados em objeto e transformando o objeto em JSON mando pra rota tal em metodo post para o corpo de requisição (req.body) */

    const cleanData = sanitizeData(data);

    if(process.env.EXPO_USE_MOCK === "true"){
        return loginMock(cleanData);
    }

    const response = await api.post("/api/auth/login", cleanData);
    return response.data;
}
