import api from "../../axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout";
import { toast } from "react-toastify";
import {UseAuth} from "../../context/AuthContext"




export default function AddTask() {
    
    const {token} = UseAuth();
    const [data, setData] = useState({
        project_id:'',
        title: '',
        description: '',
        due_date: '',
        status:'pending'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        // Fetch projects from API (placeholder code)
        const fetchProjects = async () => {
          try {
            //const token = localStorage.getItem("token");
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
      }, [token]);

       const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try{
            await api.post(`/tasks`, data,{
                headers:{
                    Authorization: `Bearer ${token}`
                }

            });
            toast.success('Task added successfully')

            navigate("/tasks");
        }catch(error){
            if(error.response  && error.response.data.message){
                
              toast.error(error.response.data.message)
            }else{
                toast.error("An error occurred. Please try again.")
            }

        }finally{
            setLoading(false)
        }
    }

        const handleChange = (e) => {

        const { name, value } = e.target

        setData(prev => ({ ...prev, [name]: value }))

    }
  
    return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Task
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
                <option value='' label='Select a project'></option>
                {projects.map((project) => (
                  <option  key={project.id} value={project.id}>
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
                placeholder="Enter Task title"
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
                placeholder="Enter Task description"
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
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}