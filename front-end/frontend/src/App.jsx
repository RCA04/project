import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import { Link } from "react-router-dom";

function App(){
  return(
    <Router>
      
      <nav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contacts'>Contacts</Link>
      </nav>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    
    </Router>
  )
}

export default App;