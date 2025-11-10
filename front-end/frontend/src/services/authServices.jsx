import api from "../axios";
import axios from "axios";

/**
 * Serviço de Autenticação
 * Centraliza todas as chamadas de API relacionadas à autenticação
 */

/**
 * Realiza o login do usuário
 * @param {Object} formData - Dados do formulário (email, password)
 * @returns {Promise<Object>} Resposta da API com token e dados do usuário
 */
export const loginService = async (formData) => {
    const response = await api.post('/login', formData);
    return response.data;
};

/**
 * Registra um novo usuário
 * @param {Object} formData - Dados do formulário (name, email, password)
 * @returns {Promise<Object>} Resposta da API com token e dados do usuário
 */
export const registerService = async (formData) => {
    const response = await api.post('/register', formData);
    return response.data;
};

/**
 * Atualiza os dados do usuário
 * Suporta atualização com ou sem upload de foto
 * @param {number} userId - ID do usuário a ser atualizado
 * @param {Object|FormData} data - Dados a serem atualizados
 * @param {string} token - Token de autenticação
 * @param {boolean} isFormData - Indica se os dados são FormData (para upload de arquivo)
 * @returns {Promise<Object>} Resposta da API com dados atualizados do usuário
 */
export const updateUserService = async (userId, data, token, isFormData = false) => {
    try {
        let response;
        
        // Se for FormData (upload de foto), usa uma instância do axios com configuração específica
        if (isFormData) {
            const axiosInstance = axios.create({
                baseURL: 'http://localhost:8000/api',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // Envia como POST para suportar multipart/form-data
            response = await axiosInstance.post(`/update-user/${userId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        } else {
            // Para dados JSON normais, usa PUT
            response = await api.put(`/update-user/${userId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        return response.data;
    } catch (error) {
        // Propaga o erro para ser tratado pelo componente
        throw error;
    }
};