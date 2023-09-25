import logo from './logo.svg';
import './App.css';
import Navbar from './Shared/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Media from './Components/Media/Media';
import Message from './Components/Message/Message';
// import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import PostDetails from './Components/PostDetails/PostDetails';
import Signup from './Components/Login/Signup';
import About from './Components/About/About';
import PrivateAuth from './Components/PrivateAuth/PrivateAuth';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div className="app">
    
     <Routes>
        <Route path="/" element={ <Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signUp" element={<Signup></Signup>} />
        <Route path="/post/:id" element={<PrivateAuth><PostDetails></PostDetails></PrivateAuth>} />
        <Route path="/media" element={<PrivateAuth><Media></Media></PrivateAuth>} />
        <Route path="/message" element={<Message></Message>} />
        <Route path="/about" element={<PrivateAuth><About></About></PrivateAuth>} />
        </Routes>
    </div>
    </>
  );
}

export default App;
