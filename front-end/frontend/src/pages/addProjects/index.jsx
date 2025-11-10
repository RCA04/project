import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout";
import api from '../../axios'
import { toast } from "react-toastify";
import {UseAuth} from "../../context/AuthContext"
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Componente para adicionar um novo projeto
 * Permite ao usuário criar um projeto com nome, descrição e data de vencimento
 */
export default function AddProject() {
    // Obtém o token de autenticação do contexto
    const {token} = UseAuth();   
    
    // Estado para armazenar os dados do formulário
    const [data, setData] = useState({  
        name: '',
        description: '',
        due_date: ''
    });

    // Estado para controlar o loading durante a submissão
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    /**
     * Manipula o envio do formulário
     * Cria um novo projeto através da API
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Envia os dados do projeto para a API
            await api.post(`/projects`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success('Project added successfully');
            navigate("/projects");
        } catch(error) {
            // Trata erros de validação ou outros erros da API
            if(error.response && error.response.data.message) {
                toast.error('Project error to add project');
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            // Limpa o formulário e remove o estado de loading
            setData({
                name: '',
                description: '',
                due_date: ''
            });
            setLoading(false);
        }
    };

    /**
     * Manipula mudanças nos campos do formulário
     * Atualiza o estado com os valores digitados
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
  
    return (
    <DashboardLayout>
      <div className="w-full flex-col flex mt-3 items-start">
      <Link className="text-4xl text-cyan-500  hover:scale-110 transition-all duration-150" to='/projects'><FaArrowAltCircleLeft /></Link>
      <p className="text-sm font-semibold text-gray-600">return</p>
      </div>

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Project
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter project title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter project description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
                name="description"
                value={data.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
                name="due_date"
                value={data.due_date}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Adding..." : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}