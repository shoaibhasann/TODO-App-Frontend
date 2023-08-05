import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster, toast } from 'react-hot-toast';
import { Context, server } from './main';
import axios from 'axios';
import Landingpage from './pages/Landingpage';


function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, loading, setLoading } = useContext(Context);

// In your initial authentication check
  useEffect(() => {
    setLoading(true);
    if (isAuthenticated) {
      axios
        .get(`${server}/user/`, {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setUser({});
          setIsAuthenticated(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Landingpage />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App