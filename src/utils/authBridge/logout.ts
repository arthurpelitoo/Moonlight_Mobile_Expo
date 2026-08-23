// PONTE: permite usar o logout() do AuthContext.Provider fora do React (ex: interceptor do axios)
//
// O problema: o axios vive fora do React, então não pode usar hooks como useContext.
// A solução: guardamos a referência da função logout aqui, e registramos ela
// quando o AuthProvider monta no useEffect(() => {setLogoutFn(logout);}, []). Aí o axios consegue chamar direto.
//
// Fluxo:
// 1. AuthProvider monta → chama setLogoutFn(logout)
// 2. Token expira → axios intercepta o 401/403
// 3. Axios chama logoutFn?.() → limpa o estado global sem reload
//
// Uma gambiarra consciente. A solução "certa" seria criar o axios
// dentro do contexto, mas isso acoplaria demais as coisas e pelo tempo não valeria a pena,
// então pra descomplicar ficou assim.

export let logoutFn: (() => void) | null = null;
export const setLogoutFn = (fn: () => void) => { logoutFn = fn; };