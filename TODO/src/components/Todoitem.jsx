import React from 'react';
import '../styles/Todoitem.css';

function Todoitem({title, description, isCompleted, updateHandler, deleteHandler, id}) {
  return (

    <div className='todo-item'>
       <div className='todo'>
        <h4 className='task-title'>{title}</h4>
        <p className='description'>{description}</p>
       </div>
       <div className='todo-btn'>
        <input onChange={updateHandler} type="checkbox" name="" id="" checked={isCompleted} />
        <button onClick={deleteHandler} className='button-confirm'>Delete</button>
       </div>
    </div>
  )
}

export default Todoitem