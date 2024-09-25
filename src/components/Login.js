// frontend/src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Import the CSS file

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting
    setError(null);   // Reset error message
    try {
      const { data } = await axios.post('https://todo-reactsql.onrender.com/auth/login', credentials);
      setToken(data.token);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false); // Stop loading once the request finishes
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>
        <button className='button1' type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
