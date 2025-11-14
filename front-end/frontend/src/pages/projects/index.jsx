import api from "../../axios";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAddCircle } from "react-icons/md";
import { UseAuth } from "../../context/AuthContext";

/**
 * Componente de Listagem de Projetos
 * Exibe todos os projetos do usuário em uma tabela
 * Permite visualizar, editar e excluir projetos
 */
export default function Projects() {
    // Obtém o token de autenticação do contexto
    const {token} = UseAuth();
    
    // Estado para armazenar a lista de projetos
    const [projects, setProjects] = useState([]);
    
    // Estado para controlar o loading durante o carregamento
    const [loading, setLoading] = useState(true);

    /**
     * Busca os projetos do usuário ao carregar o componente
     */
    useEffect(() => {
        const fetchProjects = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const response = await api.get("/projects", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects(response.data);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
                toast.error("Erro ao carregar projetos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [token]);

    /**
     * Exclui um projeto após confirmação do usuário
     * @param {number} id - ID do projeto a ser excluído
     */
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;
        
        try {
            await api.delete(`/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Remove o projeto da lista local
            setProjects(prev => prev.filter(project => project.id !== id));
            toast.success("Project deleted successfully!");
        } catch (error) {
            console.error("Erro ao excluir projeto:", error);
            toast.error("An error occurred while deleting the project.");
        }
    };

  return (
    <DashboardLayout>

      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h1>

        {loading ? (
            <p className="text-gray-600">loading projects ...</p>
        ): projects.length === 0 ? (
            <p className="text-gray-600">No projects found.</p>
        ):(
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {project.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {project.due_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Link to={`/projects/details/${project.id}`} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                    View
                  </Link>
                  <Link to={`/projects/edit/${project.id}`} className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition">
                    Edit
                  </Link>
                  <button onClick={()=>handleDelete(project.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
        )}
        <div className="w-full flex-col flex mt-3 items-end">
          <Link className="text-5xl text-cyan-500  hover:scale-110 transition-all duration-150" to='/projects/add'><MdAddCircle/></Link>
          <p className="text-sm font-semibold text-gray-600">add Project</p>
        </div>
      </div>
    </DashboardLayout>
  );
}