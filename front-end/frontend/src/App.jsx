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
import Portfolio from "./pages/portfolio"
import { ToastContainer } from "react-toastify";

function Layout(){
  const location = useLocation();

  //show Navbar only on specific routes
  const hideNavbarRoutes = ["/login", "/register" , "/"].includes(location.pathname);


  return(
    <>
    {!hideNavbarRoutes && <Navbar />}
      <Routes>
        {/*rotas públicas*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>}/>
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio/></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/projects/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
        <Route path="/projects/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
        <Route path="/projects/details/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/tasks/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
        <Route path="/tasks/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        <Route path="/tasks/details/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
        
        {/* <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} /> */}
      
      </Routes>
       <ToastContainer position="top-right" theme="colored" autoClose={4000} hideProgressBar/>
    </>
  );

}

function App(){
  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    
  )
}

export default App;