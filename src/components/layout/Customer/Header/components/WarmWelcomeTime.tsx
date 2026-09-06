// Obtém a hora atual para definir a saudação

import { useAuth } from "../../../../../hooks/auth/useAuth";
export function WarmWelcomeTime(){
    const {user} = useAuth();
    const hour = new Date().getHours();
    let greeting = "Olá";

    // Define a saudação com base na hora do dia
    if (hour >= 5 && hour < 12) {
        greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde";
    } else {
        greeting = "Boa noite";
    }

     // Replace with actual user data from session/context

    // Exibe a saudação e o nome do usuário
    return(
        <span>{greeting}, {user?.name}!</span>
    )
}