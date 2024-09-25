import axios from 'axios';

const TaskList = ({ tasks, fetchTasks, token }) => {
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://todo-reactsql.onrender.com/api/tasks/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();  // Refresh the task list after successful update
    } catch (error) {
      console.error("Failed to update task status:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-reactsql.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();  // Refresh the task list after successful deletion
    } catch (error) {
      console.error("Failed to delete task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.status}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value)}>
            <option value="started">Started</option>
            <option value="ongoing">Ongoing</option>
            <option value="finished">Finished</option>
          </select>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
