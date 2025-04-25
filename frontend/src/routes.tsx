import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import TPFDDTool from './pages/TPFDDTool'
import ProcessFlow from './pages/ProcessFlow'
import MUREP from './pages/MUREP'
import Register from './pages/Register'

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
      <Route path="/" element={<Home />} />
      <Route path="/tpfdd" element={<TPFDDTool />} />
      <Route path="/processflow" element={<ProcessFlow />} />
      <Route path="/murep" element={<MUREP />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes