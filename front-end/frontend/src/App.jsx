import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
    
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} /> */}
      </Routes>
    
    </BrowserRouter>
  )
}

export default App;