import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element = {<Register />} />
      <Route path='/' element ={<Home />} />
     </Routes>
    </div>
  );
}

export default App;
