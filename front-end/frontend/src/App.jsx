import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

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

        {/*rotas protegidas*/}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} /> */}
      
      </Routes>
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