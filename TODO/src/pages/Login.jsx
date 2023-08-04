import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Register.css';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../components/Loader';



function Login() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

      const submitHandler = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
          const { data } = await axios.post(
            `${server}/user/login`,
            {
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
          console.log(error);
          console.log(data.message);
          setIsAuthenticated(false);
          setLoading(false);
        }
      };
      if (isAuthenticated) {
        return <Navigate to={"/"} />;
      }

  return (
    loading ? <Loader/> : (
        (
    <form className="form" onSubmit={submitHandler}>
      <div className="title">
        Welcome,
        <br />
        <span>Login to continue</span>
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        name="email"
        className="input"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        name="password"
        className="input"
        required
      />
      <div className="links">
        <button disabled={loading} className="button-confirm">Let`s go →</button>
        <Link  className="sign" to={"/Register"}>
          Sign Up
        </Link>
      </div>
    </form>
  )
    )
  )
}

export default Login