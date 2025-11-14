import { Navigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

/**
 * Componente de Rota Protegida
 * Verifica se o usuário está autenticado antes de renderizar o conteúdo
 * Redireciona para a página de login se não houver token ou usuário
 */
export default function ProtectedRoute({children}) {
    const { token, user } = UseAuth();

    // Se não houver token ou usuário, redireciona para a página de login
    if(!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Se houver token e usuário, renderiza o conteúdo protegido
    return children;
}