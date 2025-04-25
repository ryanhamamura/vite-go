import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

// Components
import ClassificationBanner from './components/ClassificationBanner'
import AppRoutes from './routes'

function App() {
  const [theme, setTheme] = useState('custom')
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'custom' : 'dark')
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Top Classification Banner */}
      <ClassificationBanner position="top" />
      
      {/* Main Content with padding to avoid overlapping with banners */}
      <div className="flex flex-col pt-8 pb-8">
        {/* Navigation */}
        <div className="navbar bg-base-200">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Home</Link></li>
                <li>
                  <a>Products</a>
                  <ul className="p-2">
                    <li><Link to="/airtrack-pro">TPFDD</Link></li>
                    <li><Link to="/processflow">ProcessFlow</Link></li>
                    <li><Link to="/armsvault">MUREP</Link></li>
                  </ul>
                </li>
                <li><a>About</a></li>
                <li><a>Contact</a></li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">Log IS</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/">Home</Link></li>
              <li>
                <details>
                  <summary>Products</summary>
                  <ul className="p-2">
                    <li><Link to="/airtrack-pro">TPFDD</Link></li>
                    <li><Link to="/processflow">ProcessFlow</Link></li>
                    <li><Link to="/armsvault">MUREP</Link></li>
                  </ul>
                </details>
              </li>
              <li><a>About</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate mr-2">
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-grow">
          <AppRoutes />
        </div>

        {/* Footer */}
        <footer className="footer p-10 bg-neutral text-neutral-content">
          <aside>
            <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
            <p>Log IS<br/>Providing advanced military technology since 2010</p>
          </aside> 
          <nav>
            <header className="footer-title">Products</header> 
            <Link to="/airtrack-pro" className="link link-hover">TPFDD</Link> 
            <Link to="/processflow" className="link link-hover">ProcessFlow</Link> 
            <Link to="/armsvault" className="link link-hover">MUREP</Link> 
          </nav> 
          <nav>
            <header className="footer-title">Company</header> 
            <a className="link link-hover">About</a> 
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Careers</a>
          </nav> 
          <nav>
            <header className="footer-title">Legal</header> 
            <a className="link link-hover">Terms of Service</a> 
            <a className="link link-hover">Privacy Policy</a> 
            <a className="link link-hover">Cookie Policy</a> 
          </nav>
        </footer>
      </div>

      {/* Bottom Classification Banner */}
      <ClassificationBanner position="bottom" />
    </div>
  )
}

export default App