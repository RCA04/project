import api from "../../axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout";
import { toast } from "react-toastify";
import { UseAuth } from "../../context/AuthContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EditTask() {
    const {token} = UseAuth();
  
    const {id} = useParams();
    const [data, setData] = useState({
        project_id:'',
        title: '',
        description: '',
        due_date: '',
        status:''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        // Fetch projects from API (placeholder code)
        const fetchTasksAndProjects = async () => {
          try {
            //const token = localStorage.getItem("token");
            const response = await api.get("/projects", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);

            //get task data

            const responseTask = await api.get(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 

            setData({
                project_id: responseTask.data.project_id,
                title: responseTask.data.title,
                description: responseTask.data.description,
                due_date: responseTask.data.due_date,
                status: responseTask.data.status
            });

          } catch (error) {
            console.error("Error fetching task", error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchTasksAndProjects();
      }, []);

       const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try{
           // const token = localStorage.getItem("token");
            const response = await api.put(`/tasks/${id}`, data,{
                headers:{
                    Authorization: `Bearer ${token}`
                }

            });
            toast.success("Task updated successfully!");
            navigate("/tasks");
        }catch(error){
            toast.error('Error updating task');
        }finally{
            setData({
                project_id:'',
                title: '',
                description: '',
                due_date: '',
                status:''
            })
            setLoading(false)
        }
    }

        const handleChange = (e) => {

        const { name, value } = e.target

        setData(prev => ({ ...prev, [name]: value }))

    }
  
    return (
    <DashboardLayout>

            <div className="w-full flex-col flex mt-3 items-start">
            <Link className="text-4xl text-cyan-500  hover:scale-110 transition-all duration-150" to='/tasks'><FaArrowAltCircleLeft /></Link>
            <p className="text-sm font-semibold text-gray-600">return</p>
            </div>

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Task
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Project
              </label>

              <select name="project_id" value={data.project_id}
              className="mt-1 block w-full rounded-md border-gray-300 
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                onChange={handleChange}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>

            </div>
            
            
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter task title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
                name="title"
                value={data.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                rows={4}
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


            <select name="status" value={data.status}
              className="mt-1 block w-full rounded-md border-gray-300 
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                onChange={handleChange}
              >
                  <option value='pending' >Pendente</option>
                  <option value='progress' >Em Progresso</option>
                  <option value='completed' >Concluído</option>
              </select>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Editing..." : "Edit Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}