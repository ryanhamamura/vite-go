import { Link } from 'react-router-dom'

function ProcessFlow() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>ProcessFlow</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6">ProcessFlow</h1>
          <p className="text-xl mb-6">Comprehensive process map builder and task management system for streamlined military operations.</p>
          
          <div className="prose max-w-none">
            <h2>Overview</h2>
            <p>
              ProcessFlow is a powerful workflow management solution designed specifically for military operations. 
              It enables commanders and staff to design, implement, and monitor complex operational processes 
              with unprecedented clarity and control. By visualizing workflows and automating task assignments, 
              ProcessFlow eliminates communication gaps and streamlines mission execution.
            </p>

            <h2>Key Features</h2>
            <h3>Visual Workflow Designer</h3>
            <p>
              Create detailed process maps using our intuitive drag-and-drop interface. Define dependencies, 
              decision points, and parallel tracks to visualize even the most complex operational procedures. 
              The system supports military-specific templates and symbols to ensure clarity and compliance with 
              standard operating procedures.
            </p>

            <h3>Task Delegation and Tracking</h3>
            <p>
              Automatically assign tasks to appropriate personnel based on role, availability, and security clearance. 
              ProcessFlow tracks task status in real-time, alerting commanders to bottlenecks or delays before they 
              impact the overall mission. The system integrates with personnel management systems to maintain 
              accurate duty rosters and workload distribution.
            </p>

            <h3>Real-time Progress Monitoring</h3>
            <p>
              Monitor the status of all operations from a centralized dashboard. Customizable views allow different 
              stakeholders to focus on relevant metrics while maintaining operational security. Automated reporting 
              provides up-to-the-minute situational awareness for leadership at all levels.
            </p>

            <h3>Cross-team Coordination Tools</h3>
            <p>
              Facilitate seamless collaboration between different units, branches, and coalition partners. 
              ProcessFlow's secure messaging and document sharing capabilities ensure that all stakeholders 
              have access to the information they need while maintaining appropriate security boundaries. 
              The system includes translation support for multinational operations.
            </p>

            <h2>Technical Specifications</h2>
            <ul>
              <li>Role-based access control with multi-level security classification</li>
              <li>Compliant with DoD cybersecurity requirements</li>
              <li>On-premises deployment with air-gapped operation capability</li>
              <li>Integration with existing military command and control systems</li>
              <li>Offline operation with synchronization when connectivity is restored</li>
              <li>End-to-end encryption for all communications</li>
            </ul>

            <h2>Use Cases</h2>
            <ul>
              <li>Mission planning and execution</li>
              <li>Base operational workflow management</li>
              <li>Joint task force coordination</li>
              <li>Training exercise design and evaluation</li>
              <li>Maintenance procedure standardization</li>
              <li>Emergency response coordination</li>
            </ul>

            <h2>Success Stories</h2>
            <blockquote>
              "ProcessFlow transformed our joint operations capability. During Exercise Pacific Shield, we reduced planning 
              cycle time by 37% while improving cross-branch coordination. The visual workflow tools especially helped 
              our international partners integrate seamlessly into the command structure."
              <footer>— Commander Sarah Reynolds, US Naval Operations</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="card bg-base-200 shadow-xl sticky top-6">
            <div className="card-body">
              <h2 className="card-title">Request Information</h2>
              <p>Interested in learning more about how ProcessFlow can improve your operational efficiency?</p>
              
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

export default ProcessFlow