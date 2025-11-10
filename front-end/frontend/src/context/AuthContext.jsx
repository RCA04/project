import { createContext, useContext, useState, useEffect} from "react";

// 1 create context 
const AuthContext = createContext();

// 2 Provide context wrapper 
export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')): null)



// sync  changes to localstorage whenever token/user changes

useEffect(()=>{
    if(token){
        localStorage.setItem("token", token);
    }else{
        localStorage.removeItem("token");
    }

    if(user){
        localStorage.setItem("user" ,JSON.stringify(user));
    }else{
        localStorage.removeItem("user");
    }
},[token,user])

    const login = (token, user) =>{
        setToken(token);
        setUser(user);
    }

    const logout = () =>{
        setToken(null);
        setUser(null);
    }

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    }

    return(
        <AuthContext.Provider value={{token, user, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}


//3 custom hook for easy usage

export function UseAuth(){
    return useContext(AuthContext);
}