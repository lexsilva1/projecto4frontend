
import './App.css'
import Home from './Components/Home';
import Login from './Components/Login'
import { Route, Routes } from 'react-router-dom'
import EditTaskPage from './Components/Task/EditTaskPage';


function App() {

  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/task/:id" element={<EditTaskPage />} />
    </Routes>
  );

}

export default App
