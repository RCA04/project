import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout";
import { MdModeEditOutline } from "react-icons/md";
import { UseAuth } from "../../context/AuthContext";
import { updateUserService } from "../../services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getPhotoUrl as getPhotoUrlHelper } from "../../utils/apiHelpers";

function EditUser(){
    const { user, token, updateUser } = UseAuth();
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

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

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleConfirm = async () => {
        if (!user || !token) {
            toast.error("User is not Autenticated!");
            return;
        }

        if (!name.trim()) {
            toast.error("Please insert a Name!");
            return;
        }

        if (!user.id) {
            console.error("User ID not Found:", user);
            toast.error("Erro: User id not Found!");
            return;
        }

        setLoading(true);
        try {
    let response;

    if (selectedPhoto) {
      const formData = new FormData();
      formData.append('_method' , 'PUT')
      formData.append('name', name.trim());
      formData.append('photo', selectedPhoto);

      response = await updateUserService(user.id, formData, token, true);
    } else {
      response = await updateUserService(
        user.id,
        { name: name.trim() },
        token,
        false
      );
    }

    console.log('Resposta do updateUserService:', response);
    
    // Tenta obter a URL da foto de diferentes formas possíveis
    const photoUrl = response?.photo_url 
        || response?.user?.profile_photo 
        || response?.profile_photo
        || response?.user?.photo_url;
    
    console.log('URL da foto obtida:', photoUrl);
    
    const updatedUser = {
      ...response.user,
      profile_photo: photoUrl || user.profile_photo,
    };
    
    console.log('Usuário atualizado:', updatedUser);
    updateUser(updatedUser);
            
            toast.success("Perfil atualizado com sucesso!");
            navigate('/dashboard');
        } catch (error) {
            toast.error(error)
            
            if (error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
                console.error("Erros de validação:", validationErrors);
                const firstError = Object.values(validationErrors)[0];
                toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
            } else {
                const errorMessage = error.response?.data?.message 
                    || error.response?.data?.error 
                    || error.message 
                    || "Erro ao atualizar perfil. Tente novamente.";
                
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const getPhotoUrl = () => {
        if (photoPreview) return photoPreview;
        return getPhotoUrlHelper(user?.profile_photo);
    };

    useEffect(() =>{
        console.log(selectedPhoto)
    },[selectedPhoto])    

    return(
        <DashboardLayout>
            <div className="h-screen w-full">
                <div className="w-full h-screen flex justify-center items-center ">
                    <div className="border border-purple-300 bg-slate-300 min-h-120 min-w-75 max-w-750 max-h-120 rounded-3xl shadow-2xl shadow-purple-800 p-6">
                        <div className="flex flex-col text-center">
                            <p className="text-xl font-semibold">Editing Profile</p>
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
                        </div>

                        <div className="w-full flex flex-col mt-6 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-left font-semibold text-gray-700">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    className="px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    placeholder="Enter your Name"
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col mt-6 text-center gap-1.5">
                            <div className="w-full">    
                                <button 
                                    onClick={handleConfirm}
                                    disabled={loading || !name.trim()}
                                    className="rounded-full cursor-pointer bg-cyan-400 hover:scale-115 border border-pink-200 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-black/50 hover:bg-cyan-500 min-w-30 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2"
                                >
                                    {loading ? 'Salvando...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default EditUser;