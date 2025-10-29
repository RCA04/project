import React, { useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../axios";
import { UseAuth } from "../../context/AuthContext";

export default function TaskDetails() {

  const {token} = UseAuth();
  

  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch project details from API (mocked here for demonstration)
    const fetchTaskDetails = async () => {
      try{
        const response = await api.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTaskDetails(response.data);
        console.log(response.data)
        setLoading(false)
      }catch(error){
        console.log("Error fetching project details:", error);
      }finally{
        setLoading(true)
      }    
    }
    fetchTaskDetails();
  },[id]);


    return (

        
        <DashboardLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Project Info Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {taskDetails?.title || "Task Title not Found"}
            </h2>
            <p className="text-gray-600 mb-4">
              {taskDetails?.description || "Task description not found."}
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <span className="text-sm text-gray-500">Due Date</span>
                <p className="text-gray-800 font-medium">{taskDetails?.due_date || "Due date not found."}</p>
              </div>
            <div>
                <span className="text-sm text-gray-500">Current Status:</span>
                <p className="text-gray-800 font-medium">{taskDetails?.status || "Status not found."}</p>
            </div>
            <div>
                <span className="text-sm text-gray-500">Associeted Project:</span>
                <p className="text-gray-800 font-medium">{taskDetails?.project?.name || "associated project not found."}</p>
            </div>
            </div>
          </div>
          </div>      
      </DashboardLayout>
 
  );
}