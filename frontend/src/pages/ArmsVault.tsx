import { Link } from 'react-router-dom'

function ArmsVault() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>ArmsVault</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6">ArmsVault</h1>
          <p className="text-xl mb-6">Secure munitions inventory management system with advanced tracking and reporting capabilities.</p>
          
          <div className="prose max-w-none">
            <h2>Overview</h2>
            <p>
              ArmsVault is a comprehensive inventory management system designed specifically for munitions and 
              sensitive equipment tracking. Built to meet the highest security standards, ArmsVault provides 
              military organizations with complete visibility and control over their most critical assets.
            </p>

            <h2>Key Features</h2>
            <h3>Real-time Inventory Monitoring</h3>
            <p>
              Track every item in your inventory with unparalleled precision. ArmsVault combines barcode/RFID 
              technology with secure database architecture to provide real-time status updates on location, 
              condition, and availability of all munitions and equipment. The system supports both centralized 
              and distributed inventory models.
            </p>

            <h3>Automated Compliance Reporting</h3>
            <p>
              Maintain perfect compliance with regulatory requirements through automated reporting tools. 
              ArmsVault generates comprehensive reports for audits, inspections, and regulatory submissions 
              with minimal manual input. Custom report templates ensure compatibility with various military 
              and governmental reporting standards.
            </p>

            <h3>Chain-of-Custody Tracking</h3>
            <p>
              Document every transfer, issuance, and return with tamper-evident digital records. ArmsVault's 
              chain-of-custody system maintains cryptographically secured logs of all item movements, complete 
              with digital signatures, timestamps, and biometric verification options. The system ensures 
              complete accountability throughout an item's lifecycle.
            </p>

            <h3>Predictive Maintenance Alerts</h3>
            <p>
              Anticipate maintenance needs before they impact operational readiness. ArmsVault's predictive 
              maintenance module uses historical data, usage patterns, and manufacturer specifications to forecast 
              maintenance requirements. Automated alerts ensure that preventative maintenance is performed on 
              schedule, maximizing equipment availability and operational safety.
            </p>

            <h2>Technical Specifications</h2>
            <ul>
              <li>NIST 800-171 and CMMC Level 3 compliant architecture</li>
              <li>Zero-trust security model with multi-factor authentication</li>
              <li>Secure air-gapped deployment options for high-security environments</li>
              <li>Blockchain-based transaction ledger for immutable audit trails</li>
              <li>Integration with DoD logistics and procurement systems</li>
              <li>High-availability architecture with 99.99% uptime guarantee</li>
            </ul>

            <h2>Use Cases</h2>
            <ul>
              <li>Armory management and weapons accountability</li>
              <li>Ammunition storage and distribution tracking</li>
              <li>Sensitive equipment inventory control</li>
              <li>Deployment readiness assessment</li>
              <li>Security clearance-based equipment access control</li>
              <li>Demilitarization and disposal management</li>
            </ul>

            <h2>Success Stories</h2>
            <blockquote>
              "ArmsVault revolutionized our munitions management process. What previously required a team of 12 personnel 
              to manage is now handled effectively by just 3, with greater accuracy and vastly improved security. The system's 
              inspection readiness features have been particularly valuable, allowing us to complete our annual audit in 24 hours 
              instead of the previous two weeks."
              <footer>— Major Thomas Harris, USMC Logistics Battalion</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="card bg-base-200 shadow-xl sticky top-6">
            <div className="card-body">
              <h2 className="card-title">Request Information</h2>
              <p>Interested in learning more about how ArmsVault can enhance your inventory control?</p>
              
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

export default ArmsVault