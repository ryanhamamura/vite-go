import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginPromptProps {
  onClose?: () => void;
}

/**
 * A modal that prompts the user to log in with their CAC
 * Used when redirected from protected routes
 */
const LoginPrompt = ({ onClose }: LoginPromptProps) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the return path from location state
  const from = location.state?.from || '/';

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login();
      // Navigate to the page they tried to access
      navigate(from, { replace: true });
    } catch (err) {
      setError('Login failed. Please ensure your CAC is inserted and try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      // Navigate to home page if no onClose handler
      navigate('/');
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Authentication Required</h2>
        <p>You need to log in to access this page.</p>
        
        {error && (
          <div className="alert alert-error text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <div className="mt-4 flex gap-3 justify-end">
          <button 
            className="btn btn-ghost" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Logging in...
              </>
            ) : (
              'Login with CAC'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;