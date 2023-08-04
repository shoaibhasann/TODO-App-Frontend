import React, { useContext, useEffect, useState } from 'react'
import '../styles/Register.css';
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Todoitem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

function Home() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [refresh , setRefresh] = useState(false);
  console.log('home', isAuthenticated);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true
      })

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
       const { data } = await axios.post(
         `${server}/task/`,
         {
           title,
           description
         },
         {
           headers: {
             "Content-Type": "application/json",
           },
           withCredentials: true,
         }
       );
       toast.success(data.message);
       setTitle('');
       setDescription('');
       setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setRefresh(prev => !prev)
    }
  }
  

  useEffect(() => {
        axios.get(`${server}/task/`, {
          withCredentials: true
        })
        .then((response) => {
          const allTask = response.data.allTask;
          setTasks(allTask);
        }).catch((err) => {
          toast.error(err.response.data.message);
        })
  },[refresh]);

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>;
  }
  
  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div className="title">Add your task</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          name="title"
          className="input"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          name="description"
          className="input"
          required
        />
        <div className="links">
          <button className="button-confirm">
            Add Task→
          </button>
        </div>
      </form>
      <div className="todo-container">
        {tasks.map((task) => (
          <Todoitem
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={() => updateHandler(task._id)}
            deleteHandler={() => deleteHandler(task._id)}
          />
        ))}
      </div>
    </>
  );
}

export default Home;