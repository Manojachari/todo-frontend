// frontend/src/App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Register from './components/Register';
import Login from './components/Login';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchTasks = async () => {
    const { data } = await axios.get('https://todo-reactsql.onrender.com/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(data);
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken('');
  };

  return (
    <div className="app">
        {!token ? (
        <>
        <div className='loginpage'>
          <Register />
          <Login setToken={setToken} />
          </div>
        </>
      ) : (
        <>
      <h1>Todo List</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      <button className='button1' onClick={handleLogout}>Logout</button>
      </>)}
    </div>
  );
}

export default App;
