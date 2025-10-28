import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react"
import Api from "../../axios"
import { toast } from "react-toastify";
import { registerService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

function Register(){


    const navigate = useNavigate();
    const state = "register"


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleSubmit = async (e) => {

        e.preventDefault()

        try{
           const response = await registerService(formData)
            const token = response.token
            localStorage.setItem("token", token)
            toast.success(response.message)
            navigate('/dashboard')
        }catch(error){
                toast.error("An error occurred. Please try again.", error)
        }finally{
            setFormData({
                name: '',
                email: '',
                password: ''
            })
        }


    }


    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))

    }



return(
    <div className="flex justify-center items-center h-screen w-full">
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            <input id="email" name='name' value={formData.name} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" required />

            <input id="email" name='email' value={formData.email} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" required />

            <input id="email" name='password' value={formData.password} onChange={handleChange} className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" required />

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">

                    {state === "register" ? "Sign up" : "Login"}

                </button>

            <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link></p>

        </form>
    </div>
)
}

export default Register;