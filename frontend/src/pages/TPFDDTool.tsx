import { Link } from 'react-router-dom'

function TPFDDTool() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>TPFDD</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6">TPFDD</h1>
          <p className="text-xl mb-6">Advanced airlift package tracking and analytics system designed for military logistics operations.</p>
          
          <div className="prose max-w-none">
            <h2>Overview</h2>
            <p>
              AirTrack Pro is our flagship logistics management solution, specifically engineered for military airlift operations. 
              It provides comprehensive tracking, analytics, and planning capabilities to ensure mission-critical supplies 
              reach their destinations efficiently and securely.
            </p>

            <h2>Key Features</h2>
            <h3>Real-time Package Monitoring</h3>
            <p>
              Track the exact location of all packages in transit with military-grade GPS precision. AirTrack Pro 
              provides continuous updates on package status, including environmental conditions and handling events.
            </p>

            <h3>Predictive Delivery Analytics</h3>
            <p>
              Our advanced AI algorithms analyze historical data, current conditions, and known variables to predict 
              accurate delivery times. The system automatically adjusts for changing conditions and provides 
              confidence intervals for all delivery estimates.
            </p>

            <h3>Supply Chain Optimization</h3>
            <p>
              AirTrack Pro identifies inefficiencies in your logistics operations and suggests optimizations to reduce costs, 
              minimize delays, and improve resource utilization. The system continuously learns from each mission to 
              provide increasingly effective recommendations.
            </p>

            <h3>Situational Awareness Dashboard</h3>
            <p>
              Get a comprehensive overview of all logistics operations with our customizable dashboard. Monitor key 
              metrics, track critical shipments, and receive alerts about potential issues before they impact operations.
            </p>

            <h2>Technical Specifications</h2>
            <ul>
              <li>Military-grade encryption for all data (AES-256)</li>
              <li>Designed to operate in low-bandwidth environments</li>
              <li>Offline capability with automatic synchronization</li>
              <li>Compatible with standard military logistics systems</li>
              <li>Deployment options for both cloud and on-premises infrastructure</li>
              <li>Mobile apps for iOS and Android devices with appropriate security clearance</li>
            </ul>

            <h2>Use Cases</h2>
            <ul>
              <li>Overseas deployment logistics</li>
              <li>Emergency response supply coordination</li>
              <li>Multi-branch joint operations</li>
              <li>Strategic asset movement tracking</li>
              <li>Field hospital supply management</li>
            </ul>

            <h2>Success Stories</h2>
            <blockquote>
              "AirTrack Pro reduced our logistics response time by 43% during Operation Desert Shield, ensuring our forward units 
              received critical supplies exactly when needed. The predictive analytics capabilities were particularly valuable in 
              coordinating multi-point delivery operations."
              <footer>— Colonel James Mattock, US Army Logistics Command</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="card bg-base-200 shadow-xl sticky top-6">
            <div className="card-body">
              <h2 className="card-title">Request Information</h2>
              <p>Interested in learning more about how AirTrack Pro can enhance your logistics operations?</p>
              
              <form className="form-control w-full max-w-md mt-4">
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Full Name" className="input input-bordered w-full" />
                </div>
                
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
                </div>
                
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Organization</span>
                  </label>
                  <input type="text" placeholder="Organization Name" className="input input-bordered w-full" />
                </div>
                
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24 w-full" placeholder="How can we help you?"></textarea>
                </div>
                
                <button className="btn btn-primary w-full">Request Demo</button>
              </form>
              
              <div className="divider">OR</div>
              
              <a href="tel:+18005551234" className="btn btn-outline w-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Call Sales: (800) 555-1234
              </a>
              
              <a href="mailto:sales@logis.mil" className="btn btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Email: sales@logis.mil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TPFDDTool