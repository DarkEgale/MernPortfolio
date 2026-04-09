import { Routes, Route } from "react-router-dom";
import { UploadProject } from "./Components/Admin/ProjectUpload/ProjectUpload";
import { Login } from "./Components/Admin/Login/Login";
import { UpdateProject } from "./Components/Admin/UpdateProject/UpdateProject";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard";
import { Navbar } from './Components/Public/Navbar/Navbar';
import { Home } from "./Pages/Public/HomePage/Home";
import { Footer } from "./Components/Public/Footer/Footer";
import { About } from "./Pages/Public/About/About";
import { Services } from "./Pages/Public/Services/Services";
import { Contact } from "./Pages/Public/Contact/Contact";
import { Projects } from "./Pages/Public/Project/Project";
import { ProjectDetails } from "./Pages/Public/ProjectDetails/ProjectsDetails";
function App() {
  const navLinks=[
    {name:'Home',path:'/',end:true},
    {name:'About me',path:'/about'},
    {name:'Services',path:'/services'},
    {name:'Projects',path:'/projects'},
    {name:'Contact',path:'/Contact'}
  ]
  return (
    <>
      <Navbar navLinks={navLinks}/>
      <Routes>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path='/projects' element={<Projects/>}/>
        <Route path="/admin/update/" element={<UpdateProject />} />
        <Route path="/projectdetails/:id" element={<ProjectDetails/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
