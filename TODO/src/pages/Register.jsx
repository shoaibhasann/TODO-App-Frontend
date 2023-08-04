import React, { useContext, useState } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context, server } from '../main';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/user`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
    }
  }
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    loading ? <Loader/> : (
      <form className="form" onSubmit={submitHandler}>
      <div className="title">
        Welcome,
        <br />
        <span>Sign Up Today and Unleash Your Inner Ninja!</span>
      </div>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" name="name" className="input" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" name="email" className="input" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" className="input" required />
      <button disabled={loading} className="button-confirm">Let`s go →</button>
    </form>
  )
    )
}

export default Register