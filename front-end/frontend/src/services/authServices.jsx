import api from "../axios";


//HandleLogin

export const loginService = async (formData) =>{
    const response = await api.post('/login', formData);
    return response.data
};

export const registerService = async (formData) => {
  const response = await api.post('/register', formData);
    return response.data

}