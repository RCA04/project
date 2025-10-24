import api from "../../axios";
import { useState } from "react";
import { useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import { Link } from "react-router-dom";

export default function Projects() {
  
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch projects from API (placeholder code)
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(prev => prev.filter(project => project.id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project.");
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
                  {project.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                    View
                  </button>
                  <Link to={`/projects/edit/${project.id}`} className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition">
                    Edit
                  </Link>
                  <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
                ))}




            </tbody>
          </table>
        </div>
        )}   
      </div>
    </DashboardLayout>
  );
}