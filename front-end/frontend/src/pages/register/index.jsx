import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react"
import { toast } from "react-toastify";
import { registerService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

function Register(){


    const navigate = useNavigate();
    const { login } = UseAuth();
    const state = "register"


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo:'no image'
    })


    const handleSubmit = async (e) => {

        e.preventDefault()

        try{
           const response = await registerService(formData)
            console.log('Resposta do registro:', response);
            
            // Extrai token e user da resposta (suporta diferentes estruturas)
            const token = response.token || response.data?.token;
            const user = response.user || response.data?.user;
            
            if (!token || !user) {
                console.error('Token ou user não encontrado na resposta:', response);
                toast.error('Erro: Dados de autenticação não recebidos corretamente.');
                return;
            }
            
            // Atualiza o contexto de autenticação (salva token e user)
            login(token, user);
            toast.success(response.message || 'Registro realizado com sucesso!')
            navigate('/welcome')
        }catch(error){
            console.error("Erro no registro:", error);
            // Trata erros de validação (400) com mensagens específicas
            if (error.response?.status === 400) {
                const errorMessage = error.validationMessage || error.response?.data?.message || "Dados inválidos. Verifique as informações.";
                toast.error(errorMessage);
            } else if (error.response?.status === 422) {
                // Erros de validação do Laravel
                if (error.response?.data?.errors) {
                    const firstError = Object.values(error.response.data.errors)[0];
                    const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                    toast.error(errorMessage);
                } else {
                    toast.error(error.response?.data?.message || "Erro de validação. Verifique os dados informados.");
                }
            } else {
                toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            }
        }

    }


    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))

    }



return(
    <div className="flex justify-center items-center h-screen w-full">
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            <input id="email" name='name' value={formData.name} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" required />

            <input id="email" name='email' value={formData.email} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" required />

            <input id="email" name='password' value={formData.password} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" required />

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">

                    {state === "register" ? "Sign up" : "Login"}

                </button>

            <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link></p>

        </form>
    </div>
)
}

export default Register;