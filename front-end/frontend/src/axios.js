import axios from "axios";

/**
 * Configuração do cliente Axios para comunicação com a API
 * Define a URL base e headers padrão para todas as requisições
 */
const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        Accept: "application/json",
    },
});

export default api;

