import { createContext, useContext, useState, useEffect} from "react";

/**
 * Contexto de Autenticação
 * Gerencia o estado de autenticação do usuário (token e dados do usuário)
 * e sincroniza com o localStorage
 */
const AuthContext = createContext();

/**
 * Provider do contexto de autenticação
 * Envolve a aplicação e fornece funções e estado de autenticação
 */
export function AuthProvider({children}) {
    // Inicializa o token a partir do localStorage ou null
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    // Inicializa o usuário a partir do localStorage ou null
    const [user, setUser] = useState(
        localStorage.getItem('user') 
            ? JSON.parse(localStorage.getItem('user')) 
            : null
    );

    /**
     * Sincroniza mudanças de token e usuário com o localStorage
     * Mantém os dados persistidos entre recarregamentos da página
     */
    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [token, user]);

    /**
     * Função para fazer login
     * Atualiza o token e os dados do usuário
     */
    const login = (token, user) => {
        setToken(token);
        setUser(user);
    };

    /**
     * Função para fazer logout
     * Remove o token e os dados do usuário
     */
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    /**
     * Função para atualizar os dados do usuário
     * Útil após edição do perfil
     */
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return(
        <AuthContext.Provider value={{token, user, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook customizado para acessar o contexto de autenticação
 * Facilita o uso do contexto em componentes filhos
 */
export function UseAuth() {
    return useContext(AuthContext);
}