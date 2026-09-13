import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Interview from "./pages/Interview/Interview";
import InterviewSession from "./pages/InterviewSession/InterviewSession";
import Result from "./pages/Result/Result";
import {auth} from './firebase';
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import InterviewTips from "./pages/InterviewTips/InterviewTips";

function App() {

  const {currentUser} = useAuth();
  console.log(currentUser);

console.log(auth);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ < ProtectedRoute> <Home/> </ProtectedRoute>} />
        <Route path="/categories" element={  <ProtectedRoute> <Categories/> </ProtectedRoute>} />
       <Route path= "/tips" element= {<ProtectedRoute> <InterviewTips/> </ProtectedRoute>} />
        <Route path="/about" element={  <About/> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interview/:category" element={  <ProtectedRoute> <Interview/> </ProtectedRoute>} />
        <Route path="/interviewsession" element={  <ProtectedRoute> <InterviewSession/> </ProtectedRoute>} />
        <Route path="/result" element={  <ProtectedRoute> <Result/> </ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;