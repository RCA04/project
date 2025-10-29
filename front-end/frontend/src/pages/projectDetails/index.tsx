import React, { useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../axios";
import { UseAuth } from "../../context/AuthContext";

export default function ProjectDetails() {

  const {token} = UseAuth();
  

  const { id } = useParams();
  const [ProjectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch project details from API (mocked here for demonstration)
    const fetchProjectDetails = async () => {
      try{
        const response = await api.get(`/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectDetails(response.data);
        console.log(response.data)
        setLoading(false)
      }catch(error){
        console.log("Error fetching project details:", error);
      }finally{
        setLoading(true)
      }    
    }
    fetchProjectDetails();
  },[id]);


    return (

        
        <DashboardLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Project Info Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {ProjectDetails?.name || "Project Name not found"}
            </h2>
            <p className="text-gray-600 mb-4">
              {ProjectDetails?.description || "Project description not found."}
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <span className="text-sm text-gray-500">Due Date</span>
                <p className="text-gray-800 font-medium">{ProjectDetails?.due_date || "Due date not found."}</p>
              </div>
  
            </div>
          </div>
  
          {/* Tasks Table */}
  
          {ProjectDetails.tasks?.length === 0 ? (
            
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Nenhuma Task foi Encontrada
            </h2>
          </div>
          
          
          ) : (
            
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                  </tr>
                </thead>
    
                <tbody className="divide-y divide-gray-200">
                  {ProjectDetails.tasks?.map((task) => (
    
                    <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{task.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{task.due_date}</td>
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