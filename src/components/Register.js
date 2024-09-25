// frontend/src/components/Register.js
import { useState } from 'react';
import axios from 'axios';
import './Register.css';  // Import the CSS file

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting
    try {
      await axios.post('https://todo-reactsql.onrender.com/auth/register', user);
      alert(`${user.username} has been registered successfully`);
      setUser({ username: '', password: '' });
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading once the request finishes
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button className='button1' type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
