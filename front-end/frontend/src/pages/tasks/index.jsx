import DashboardLayout from "../../components/dashboardLayout";
import { useState } from "react";
import { useEffect } from "react";
import { UseAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../axios";

export default function Tasks() {
  const {token} = UseAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchTasks = async () => {
        try {
         // const token = localStorage.getItem("token");
         const response = await api.get("/tasks", {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setTasks(response.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }finally{
          setLoading(false);
        }
      };
  
      fetchTasks();
    }, [token]);



      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;
    
        try {
          //const token = localStorage.getItem("token");
          await api.delete(`/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTasks(prev => prev.filter(task => task.id !== id));
          toast.success("Task deleted successfully!");
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      };
  
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h1>

        {loading ? (
            <p className="text-gray-600">loading projects ...</p>
        ): tasks.length === 0 ? (
            <p className="text-gray-600">No tasks found.</p>
        ):(
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {task.project.name}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {task.title}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  <div className="truncate w-25">
                  {task.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {task.due_date}
                </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {task.status}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Link to={`/tasks/details/${task.id}`} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                    View
                  </Link>
                  <Link to={`/tasks/edit/${task.id}`} className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition">
                    Edit
                  </Link>
                  <button onClick={()=>handleDelete(task.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
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