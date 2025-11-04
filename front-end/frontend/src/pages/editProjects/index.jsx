import { useEffect, useState } from "react";
import api from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout";
import { toast } from "react-toastify";
import { UseAuth } from "../../context/AuthContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EditProject() {
  
    const {token} = UseAuth();
  
    const {id} = useParams();
    const [data, setData] = useState({
        name: '',
        description: '',
        due_date: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(id)

        useEffect(() => {
        // Fetch existing project data
        const fetchProject = async () => {
            try {
               // const token = localStorage.getItem("token");
               const response = await api.get(`/projects/${id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      body: JSON.stringify(data)
                    }
                  });
                  setData({
                    name: response.data.name,
                    description: response.data.description,
                    due_date: response.data.due_date
                  }
                  );
                  console.log(response.data)
              } catch (error) {
                console.error("Error fetching project:", error);
              }
            }
            fetchProject();
      },[id, token, data]);

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
            toast.success("Project edited successfully!");
        }catch(error){
            if(error  && error.data.message){
                toast.error(error.data.message)
            }else{
                toast.error("An error occurred. Please try again.")
            }

        }finally{
            setData({
                name: '',
                description: '',
                due_date: ''
            })
            setLoading(false)
            navigate("/projects");
            
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
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Editting..." : "Edit Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}