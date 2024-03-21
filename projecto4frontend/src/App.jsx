
import './App.css'
import Home from './Components/Home';
import Login from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import EditTaskPage from './Components/Task/EditTaskPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/task/:id" element={<EditTaskPage />} />
    </Routes>
    <ToastContainer />
    </>
  
  );

}

export default App
