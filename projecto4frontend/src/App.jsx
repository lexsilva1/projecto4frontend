
import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <Routes> 
      <Route path="/" element={<Login />} />
    </Routes>
  );

}

export default App
