import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import { Toaster } from 'react-hot-toast';
import WelcomePage from './components/WelcomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
// app.js or index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <>
      <div>
        <Toaster position='top-center' />
      </div>
      <Routes>
      
          <Route path='/' element={ <WelcomePage /> } />
          <Route path='/home' element={ <Home /> } />
          <Route path='/signup' element={ <SignupPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/editor/:roomId' element={ <EditorPage /> } />
          
        
      </Routes>
    </>
  );
}

export default App;
