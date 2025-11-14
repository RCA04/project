import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UseAuth } from "../../context/AuthContext";
import { loginService } from "../../services/authServices";

/**
 * Componente de Login
 * Permite ao usuário fazer login na aplicação
 */
function Login() {
    const navigate = useNavigate();
    const { login } = UseAuth();

    // Estado para controlar se está em modo login ou registro (não utilizado atualmente)
    const [state, setState] = useState("login");

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    /**
     * Manipula o envio do formulário de login
     * Autentica o usuário e redireciona para o dashboard
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService(formData);
            const { token, user } = response;
            
            // Atualiza o contexto de autenticação
            login(token, user);
            toast.success(response.message);
            navigate("/dashboard");
        } catch(error) {
            // Trata erros de validação (400) com mensagens específicas
            if (error.response?.status === 400) {
                const errorMessage = error.validationMessage || error.response?.data?.message || "Dados inválidos. Verifique suas credenciais.";
                toast.error(errorMessage);
            } else if (error.response?.status === 401) {
                toast.error("Credenciais inválidas. Verifique seu email e senha.");
            } else if (error.response?.status === 422) {
                const errorMessage = error.response?.data?.message || "Erro de validação. Verifique os dados informados.";
                toast.error(errorMessage);
            } else {
                toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            }
            console.error("Erro no login:", error);
        } finally {
            // Limpa o formulário após a tentativa
            setFormData({
                email: '',
                password: ''
            });
        }
    };

    /**
     * Manipula mudanças nos campos do formulário
     * Atualiza o estado com os valores digitados
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return ( 

        <div className="flex justify-center items-center h-screen w-full">

            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">

                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>

                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>



                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">

                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>

                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />

                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">

                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>

                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />

                </div>

                <div className="mt-4 text-left text-indigo-500">

                    <button className="text-sm" type="reset">Forget password?</button>

                </div>

                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">

                    {state === "login" ? "Login" : "Sign up"}

                </button>

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <Link to="/register" className="text-indigo-500 hover:underline">click here</Link></p>

            </form>

        </div>
    )

}

export default Login;