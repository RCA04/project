import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { UseAuth } from "../../context/AuthContext";
import { updateUserService } from "../../services/authServices";
import { toast } from "react-toastify";
import api from "../../axios";

function Welcome(){
    const { user, token, updateUser } = UseAuth();
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleConfirm = async () => {
        if (!selectedPhoto) {
            toast.error("Por favor, selecione uma foto!");
            return;
        }

        if (!user || !token) {
            toast.error("Usuário não autenticado!");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('photo', selectedPhoto);
            formData.append('name', user.name || '');
            formData.append('_method', 'PUT');

            const response = await updateUserService(user.id, formData, token, true);
            
            const updatedUser = {
                ...response.user,
                profile_photo: response.photo_url || response.user.profile_photo
            };
            updateUser(updatedUser);
            
            toast.success("Foto de perfil atualizada com sucesso!");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar foto de perfil. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const getPhotoUrl = () => {
        if (photoPreview) return photoPreview;
        const p = user?.profile_photo;
        if (!p) return null;
        if (typeof p !== 'string') return null;
        if (p.startsWith('http')) return p;
        const apiBase = api?.defaults?.baseURL || '';
        const host = apiBase.replace(/\/?api\/?$/, '');
        if (p.startsWith('/storage')) return `${host}${p}`;
        if (p.startsWith('storage')) return `${host}/${p}`;
        return `${host}/storage/${p}`;
    };

    return(
        <div className="h-screen w-full">
            <div className="w-full h-screen flex justify-center items-center ">
                <div className="border border-purple-300 bg-slate-300 min-h-120 min-w-75 max-w-750 max-h-120 shadow-2xl shadow-purple-800">
                    <div className="flex flex-col text-center">
                        <p>Hi, Welcome:</p>
                        <p className="mt-1.5"><strong>{user?.name || 'User'}</strong></p>
                    </div>
                    
                    <div className="flex flex-col text-center items-center mt-7">
                        <div className="min-w-30 min-h-40 max-w-30 max-h-40 relative">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                className="hidden"
                            />
                            <MdModeEditOutline 
                                onClick={handleEditClick}
                                className="bg-cyan-400 text-4xl rounded-full p-1 overflow-hidden hover:bg-cyan-500 hover:scale-125 hover:p-2 duration-200 transition-all absolute z-50 cursor-pointer"
                            />
                            <div className="min-w-35 min-h-35 max-w-35 max-h-35 border z-40 flex rounded-full overflow-hidden bg-gray-200">
                                {getPhotoUrl() ? (
                                    <img 
                                        src={getPhotoUrl()} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-sm">Foto</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">Add your profile picture!</p>
                    </div>
                    <div className="w-full flex flex-col mt-3 text-center gap-1.5">
                        <Link className="font-semibold text-gray-600 underline underline-offset-2 hover:text-cyan-500 hover:scale-115 duration-200 transition-all " to='/dashboard'>Maybe Later</Link>
                        <div className="w-full">    
                            <button 
                                onClick={handleConfirm}
                                disabled={loading || !selectedPhoto}
                                className="rounded-full cursor-pointer bg-cyan-400 hover:scale-115 border border-pink-200 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-black/50 hover:bg-cyan-500 min-w-30 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Salvando...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;