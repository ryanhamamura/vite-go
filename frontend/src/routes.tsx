import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import AirTrackPro from './pages/AirTrackPro'
import ProcessFlow from './pages/ProcessFlow'
import ArmsVault from './pages/ArmsVault'

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
      <Route path="/airtrack-pro" element={<AirTrackPro />} />
      <Route path="/processflow" element={<ProcessFlow />} />
      <Route path="/armsvault" element={<ArmsVault />} />
    </Routes>
  )
}

export default AppRoutes