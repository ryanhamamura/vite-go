import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import TPFDDTool from './pages/TPFDDTool'
import ProcessFlow from './pages/ProcessFlow'
import MUREP from './pages/MUREP'
import Register from './pages/Register'

// Components
import ProtectedRoute from './components/ProtectedRoute'

/**
 * Application routes configuration
 * Centralized route definitions make it easier to:
 * - Maintain and update routes
 * - Implement code splitting
 * - Add route-level guards or layouts
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes - accessible to all users */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes - requires authentication */}
      <Route 
        path="/tpfdd" 
        element={
          <ProtectedRoute>
            <TPFDDTool />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected routes with role requirements */}
      <Route 
        path="/processflow" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ProcessFlow />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/murep" 
        element={
          <ProtectedRoute>
            <MUREP />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default AppRoutes