import { Navigate } from "react-router-dom";

/**
 * Componente de Rota Protegida
 * Verifica se o usuário está autenticado antes de renderizar o conteúdo
 * Redireciona para a página de login se não houver token
 */
export default function ProtectedRoute({children}) {
    // Verifica se existe um token de autenticação no localStorage
    const token = localStorage.getItem("token");

    // Se não houver token, redireciona para a página de login
    if(!token) {
        return <Navigate to="/login" replace />;
    }

    // Se houver token, renderiza o conteúdo protegido
    return children;
}