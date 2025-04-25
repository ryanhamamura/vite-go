import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })

  const validateForm = () => {
    let valid = true
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      valid = false
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
      valid = false
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
      valid = false
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      valid = false
    }
    
    setErrors(newErrors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Simulate API call
      // In a real application, this would be an API call to the backend
      setTimeout(() => {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: 'Your message has been sent successfully!'
        })
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }, 1000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          
          {submitStatus.submitted && (
            <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-error'} mb-6`}>
              <div>
                <span>{submitStatus.message}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                placeholder="Your name"
              />
              {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                placeholder="Your email"
              />
              {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`input input-bordered ${errors.subject ? 'input-error' : ''}`}
                placeholder="Message subject"
              />
              {errors.subject && <span className="text-error text-sm mt-1">{errors.subject}</span>}
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`textarea textarea-bordered h-32 ${errors.message ? 'textarea-error' : ''}`}
                placeholder="Your message"
              ></textarea>
              {errors.message && <span className="text-error text-sm mt-1">{errors.message}</span>}
            </div>
            
            <div className="form-control">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          
          <div className="card bg-base-200 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Address
              </h3>
              <p>123 Military Plaza, Pentagon, VA 22202</p>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Phone
              </h3>
              <p>(555) 123-4567</p>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Email
              </h3>
              <p>contact@logis.mil</p>
            </div>
          </div>
          
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Hours
              </h3>
              <p>Monday - Friday: 8:00 AM - 5:00 PM EST</p>
              <p>Weekends & Holidays: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact