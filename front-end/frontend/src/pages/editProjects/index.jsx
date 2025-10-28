import { useEffect, useState } from "react";
import api from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout";
import { toast } from "react-toastify";
import { UseAuth } from "../../context/AuthContext";

export default function EditProject() {
  
    const {token} = UseAuth();
  
    const [id] = useParams();
    const [data, setData] = useState({
        title: '',
        description: '',
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

        useEffect(() => {
        // Fetch existing project data
        const fetchProject = async () => {
            try {
               // const token = localStorage.getItem("token");
               const response = await api.get(`/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData({
                    title: response.data.name,
                    description: response.data.description,
                    dueDate: response.data.dueDate
                });
            } catch (error) {
                console.error("Error fetching project:", error);
            }finally{
              setData({
                title:'',
                description:'',
                dueDate:'',    
              })
            }
          }
          fetchProject();
      },[id, token]);

       const handleUpdate = async (e) => {

        e.preventDefault()
        setLoading(true)

        try{
         // const token = localStorage.getItem("token");
            await api.put(`/projects/${id}`, data,{
                headers:{
                    Authorization: `Bearer ${token}`
                }

            });
            toast.succes("Project edited successfully!");
            
            navigate("/projects");
        }catch(error){
            if(error  && error.data.message){
                toast.error(error.data.message)
            }else{
                toast.error("An error occurred. Please try again.")
            }

        }finally{
            setData({
                title: '',
                description: '',
                dueDate: ''
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
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Project
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4 w-full">
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
                name="dueDate"
                value={data.dueDate}
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