// frontend/src/components/TaskForm.js
import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'started' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://todo-reactsql.onrender.com/api/tasks', task);
    fetchTasks();
    setTask({ title: '', description: '', status: 'started' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
        <option value="started">Started</option>
        <option value="ongoing">Ongoing</option>
        <option value="finished">Finished</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
