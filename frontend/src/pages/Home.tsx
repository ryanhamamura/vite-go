import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-[80vh] tech-gradient-bg text-white">
        <div className="tech-grid" style={{ opacity: 0.05 }}></div>
        
        {/* Large product image or shape */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30 rounded-full" 
          style={{
            background: 'radial-gradient(circle, rgba(103, 232, 249, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%) perspective(1000px) rotateX(10deg) rotateY(10deg)',
            zIndex: 0
          }}>
        </div>
        
        {/* Smaller accent shapes */}
        <div className="absolute bottom-20 left-1/4 w-32 h-32 opacity-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(103, 232, 249, 0.4) 0%, transparent 70%)',
            filter: 'blur(10px)'
          }}>
        </div>
        <div className="absolute top-40 right-1/4 w-40 h-40 opacity-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(15px)'
          }}>
        </div>
        
        <div className="hero-content text-center z-10 mt-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white tracking-tight mb-2">Log IS</h1>
            <p className="text-xl opacity-80 mb-8 max-w-xl mx-auto font-light">Advanced software solutions designed for modern military logistics, operations, and inventory management challenges.</p>
            <a href="#products" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium text-lg">
              Explore Our Solutions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12" id="products">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4">
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <div className="bg-primary text-primary-content px-4 py-2 rounded-md font-bold text-lg transform -rotate-12">
                COMING SOON
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">TPFDD</h2>
              <p className="flex-grow">Advanced airlift package tracking and analytics system designed for military logistics operations.</p>
              <ul className="list-disc list-inside mb-4 text-sm opacity-75">
                <li>Real-time package monitoring</li>
                <li>Predictive delivery analytics</li>
                <li>Supply chain optimization</li>
                <li>Situational awareness dashboard</li>
              </ul>
              <div className="card-actions justify-end">
                {/* <Link to="/tpfdd" className="btn btn-primary btn-sm">Learn More</Link> */}
                <button className="btn btn-primary btn-sm" disabled>Learn More</button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <div className="bg-primary text-primary-content px-4 py-2 rounded-md font-bold text-lg transform -rotate-12">
                COMING SOON
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">ProcessFlow</h2>
              <p className="flex-grow">Comprehensive process map builder and task management system for streamlined military operations.</p>
              <ul className="list-disc list-inside mb-4 text-sm opacity-75">
                <li>Visual workflow designer</li>
                <li>Task delegation and tracking</li>
                <li>Real-time progress monitoring</li>
                <li>Cross-team coordination tools</li>
              </ul>
              <div className="card-actions justify-end">
                {/* <Link to="/processflow" className="btn btn-primary btn-sm">Learn More</Link> */}
                <button className="btn btn-primary btn-sm" disabled>Learn More</button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <div className="bg-primary text-primary-content px-4 py-2 rounded-md font-bold text-lg transform -rotate-12">
                COMING SOON
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">MUREP</h2>
              <p className="flex-grow">Secure munitions inventory management system with advanced tracking and reporting capabilities.</p>
              <ul className="list-disc list-inside mb-4 text-sm opacity-75">
                <li>Real-time inventory monitoring</li>
                <li>Automated compliance reporting</li>
                <li>Chain-of-custody tracking</li>
                <li>Predictive maintenance alerts</li>
              </ul>
              <div className="card-actions justify-end">
                {/* <Link to="/murep" className="btn btn-primary btn-sm">Learn More</Link> */}
                <button className="btn btn-primary btn-sm" disabled>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-base-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Log IS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Military-Grade Security</h3>
              <p>All solutions meet or exceed DoD security requirements and compliance standards.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Performance</h3>
              <p>Field-tested solutions that deliver reliable performance in demanding environments.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Intuitive Design</h3>
              <p>User-centered interfaces that require minimal training and reduce operational errors.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-content rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p>Designed to work with existing military systems and infrastructure with minimal disruption.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home