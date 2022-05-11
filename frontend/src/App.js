import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AOCMap from "./pages/AocMap";
import Town from "./pages/Town";

const App = () => {

  return ( 
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/register' element={<UserRegister />}></Route>
          <Route path='/login' element={<UserLogin />}></Route>
          <Route path='/profile' element={<UserProfile />}></Route>
          <Route path='/map' element={<AOCMap />}></Route>
          <Route path='/map/:id' element={<Town />}></Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App;
