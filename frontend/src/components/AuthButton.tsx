import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthButton() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login();
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      setError('Login failed. Please ensure your smartcard is inserted.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await logout();
      // Redirect to home page after logout
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <span className="text-sm font-medium">
            Welcome, {user.rank} {user.lastName}
          </span>
        </div>
        <button 
          onClick={handleLogout} 
          className="btn btn-sm btn-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <button 
          onClick={handleLogin} 
          className="btn btn-sm btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login with CAC'}
        </button>
        <Link to="/register" className="btn btn-sm btn-outline">
          Register
        </Link>
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

export default AuthButton;