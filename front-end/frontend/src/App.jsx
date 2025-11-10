import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import AddProject from "./pages/addProjects";
import EditProject from "./pages/editProjects";
import ProtectedRoute from "./components/protectedRoute";
import Tasks from "./pages/tasks";
import AddTask from "./pages/addTask";
import EditTask from "./pages/editTask";
import ProjectDetails from "./pages/projectDetails";
import TaskDetails from "./pages/taskDetails";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Welcome from "./pages/welcome";
import EditUser from "./pages/editUser";
import { ToastContainer } from "react-toastify";

/**
 * Componente Layout
 * Gerencia a exibição da Navbar e define as rotas da aplicação
 */
function Layout() {
    const location = useLocation();

    // Rotas onde a Navbar não deve ser exibida
    const hideNavbarRoutes = ["/login", "/register", "/", "/welcome"].includes(location.pathname);

    return(
        <>
            {/* Exibe a Navbar apenas em rotas específicas */}
            {!hideNavbarRoutes && <Navbar />}
            
            {/* Define todas as rotas da aplicação */}
            <Routes>
                {/* Rotas públicas - não requerem autenticação */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rotas protegidas - requerem autenticação */}
                <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
                <Route path="/edit-user" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                
                {/* Rotas de Projetos */}
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/projects/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
                <Route path="/projects/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
                <Route path="/projects/details/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
                
                {/* Rotas de Tarefas */}
                <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path="/tasks/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
                <Route path="/tasks/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
                <Route path="/tasks/details/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
            </Routes>
            
            {/* Container para exibir notificações toast */}
            <ToastContainer 
                position="top-right" 
                theme="colored" 
                autoClose={4000} 
                hideProgressBar 
            />
        </>
    );
}

/**
 * Componente principal da aplicação
 * Configura o roteamento e envolve a aplicação com o BrowserRouter
 */
function App() {
    return(
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;