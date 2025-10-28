// src/pages/Dashboard.jsx
import DashboardLayout from "../../components/dashboardLayout";
import { FiUsers, FiShoppingCart, FiBell } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { useEffect, useState } from "react";
import api from "../../axios";
import {UseAuth} from "../../context/AuthContext"


export default function Dashboard() {

  const [stats, setStats] = useState({
    project_count:0,
    task_count: 0
});

    const {token} = UseAuth();


  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchStats = async () => {
      try{
       // const token = localStorage.getItem("token");
       const response = await api.get('/dashboard-stats',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(response.data);

      }catch(error){
        console.log('Erro stats loading', error)

      }finally{
        setLoading(false);
      }
    }
    fetchStats()
  },[token]);



  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      {loading? (
        <p className="text-gray-600">Loading Dashboard Data</p>
       ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
          <div className="p-4 rounded-full bg-indigo-100 text-indigo-600">
            <GoProject size={28} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Projects</h2>
            <p className="text-2xl font-bold text-gray-800">{stats.project_count}</p>
          </div>
        </div>

        {/* Sales Card */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4">
          <div className="p-4 rounded-full bg-green-100 text-green-600">
            <FiShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Tasks</h2>
            <p className="text-2xl font-bold text-gray-800">{stats.task_count}</p>
          </div>
        </div>

        {/* Notifications Card */}
     
      </div>
      )}

      
    </DashboardLayout>
  );
}