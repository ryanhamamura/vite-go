import { useAuth } from '../context/AuthContext';
import LoginPrompt from './LoginPrompt';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Optional role requirement
}

/**
 * A wrapper component that protects routes requiring authentication
 * Shows login prompt if user is not authenticated
 * Optionally checks for specific role requirements
 */
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <LoginPrompt />
      </div>
    );
  }

  // If role is required and user doesn't have it, show unauthorized message
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="card w-96 bg-error text-error-content">
          <div className="card-body">
            <h2 className="card-title">Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <p className="text-sm">Required role: {requiredRole}</p>
            <div className="card-actions justify-end">
              <button 
                className="btn btn-sm" 
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role (if any)
  return <>{children}</>;
};

export default ProtectedRoute;