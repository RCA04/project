import DashboardLayout from "../../components/dashboardLayout";
import { MdModeEditOutline } from "react-icons/md";


function  EditUser(){
    return(
        <DashboardLayout>
            <div className="h-screen w-full">
                <div className="w-full h-screen flex justify-center items-center ">
                    <div className="border border-purple-300 bg-purple-300 min-h-90 min-w-75 max-w-750 max-h-90">
                        <div className="flex flex-col text-center">
                            <p>Editing Profile</p>
                        </div>
                        
                        <div className="flex flex-col text-center items-center mt-7">
                            <div className="min-w-30 min-h-40 max-w-30 max-h-40">
                            <MdModeEditOutline className="bg-cyan-400 text-4xl  rounded-full p-1 overflow-hidden hover:bg-cyan-500 hover:scale-125 hover:p-2  duration-200 transition-all fixed"/>
                            <div className="min-w-35 min-h-35 max-w-35 max-h-35 border  flex rounded-full ">
                            </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-3 text-center gap-1.5">
                            <p className="mt-2 text-gray-600">Add your profile picture!</p>
                            <p className="font-semibold text-gray-600 underline underline-offset-2 hover:text-cyan-500 hover:scale-115 duration-200 transition-all ">Maybe Later</p>
                            <div className="w-full">    
                            <button className="rounded-full cursor-pointer bg-cyan-400 hover:scale-115 border border-pink-200 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-black/50 hover:bg-cyan-500 min-w-30 transition-all duration-400">confirm</button>
                            </div>
        
        
                        </div>
                        <div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default EditUser;