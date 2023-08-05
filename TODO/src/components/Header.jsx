import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/Header.css';
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <nav>
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <ul>
        <li>
          <Link to={"/home"}>{isAuthenticated ? 'Home' : ''}</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <Link onClick={logoutHandler} className="button-54" to={"/"}>
              Logout
            </Link>
          ) : (
            <Link className="button-54" to={"/login"}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;