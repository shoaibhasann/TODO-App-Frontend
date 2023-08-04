import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster, toast } from 'react-hot-toast';
import { Context, server } from './main';
import axios from 'axios';


function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, loading, setLoading } = useContext(Context);
  console.log('app.js',isAuthenticated)

  useEffect(() => {
    setLoading(true);
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
  }, [])
  
  return (
     <Router>
      <Header/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
      </Routes>
      <Toaster/>
     </Router>
  )
}

export default App