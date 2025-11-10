import api from "../axios";
import axios from "axios";


//HandleLogin

export const loginService = async (formData) =>{
    const response = await api.post('/login', formData);
    return response.data
};

export const registerService = async (formData) => {
  const response = await api.post('/register', formData);
    return response.data

}

// Handle Update User
export const updateUserService = async (userId, data, token, isFormData = false) => {
    try {
        console.log("updateUserService chamado:", {
            userId,
            token: token ? "Token presente" : "Token ausente",
            isFormData,
            data: isFormData ? `FormData com ${Array.from(data.keys()).length} campos` : data
        });

        let response;
        
        if (isFormData) {
            const axiosInstance = axios.create({
                baseURL: 'http://localhost:8000/api',
                headers: {
                    'Accept': 'application/json',
                }
            });

            // IMPORTANTE: Enviar como POST com _method=PUT para uploads multipart
            response = await axiosInstance.post(`/update-user/${userId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        } else {
            response = await api.put(`/update-user/${userId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        console.log("Resposta do servidor:", response);
        return response.data;
    } catch (error) {
        console.error("Erro no updateUserService:", error);
        console.error("URL da requisição:", error.config?.url);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);
        throw error;
    }
}