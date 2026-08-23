import type { NavigateFunction } from "react-router-dom";

// PONTE: permite usar o navigate() do React Router fora do React (ex: interceptor do axios)
//
// O useNavigate() só funciona dentro de componentes React.
// Registramos a referência dele no AppRoutes lá no App.tsx e usamos no axios em api.ts.
//
// Motivo do AppRoutes separado do App:
// O useNavigate() precisa estar DENTRO do BrowserRouter pra funcionar.
// Como o BrowserRouter fica no App, criamos o AppRoutes como filho dele
// pra conseguir chamar o hook sem erro.

export let navigate: NavigateFunction | null = null;
export const setNavigate = (fn: NavigateFunction) => { navigate = fn; };