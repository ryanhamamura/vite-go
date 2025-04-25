import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [rank, setRank] = useState('')
  const [jdir, setJdir] = useState('')
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    // Validate first name
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    // Validate last name
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Validate phone (simple validation - can be enhanced)
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Validate rank
    if (!rank.trim()) {
      newErrors.rank = 'Rank is required'
    }
    
    // Validate JDIR
    if (!jdir.trim()) {
      newErrors.jdir = 'JDIR is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real application, you would make an API request here
        /*
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            rank,
            jdir
          }),
        })
        
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Registration failed')
        }
        */
        
        setSubmitSuccess(true)
        // Clear form
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setRank('')
        setJdir('')
        
      } catch (error) {
        console.error('Registration error:', error)
        setErrors({
          form: 'Registration failed. Please try again.'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>Register</li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <div className="card w-full max-w-2xl bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8">User Registration</h1>
            
            {submitSuccess && (
              <div className="alert alert-success mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Registration successful! Your account has been created.</span>
              </div>
            )}
            
            {errors.form && (
              <div className="alert alert-error mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.form}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <span className="text-error text-sm mt-1">{errors.firstName}</span>}
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <span className="text-error text-sm mt-1">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
              </div>
              
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <span className="text-error text-sm mt-1">{errors.phone}</span>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Rank</span>
                  </label>
                  <select 
                    className={`select select-bordered w-full ${errors.rank ? 'select-error' : ''}`}
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  >
                    <option value="" disabled>Select your rank</option>
                    <option value="Amn">Amn</option>
                    <option value="A1C">A1C</option>
                    <option value="SrA">SrA</option>
                    <option value="SSgt">SSgt</option>
                    <option value="TSgt">TSgt</option>
                    <option value="MSgt">MSgt</option>
                    <option value="SMSgt">SMSgt</option>
                    <option value="CMSgt">CMSgt</option>
                    <option value="2Lt">2Lt</option>
                    <option value="1Lt">1Lt</option>
                    <option value="Capt">Capt</option>
                    <option value="Maj">Maj</option>
                    <option value="Lt Col">Lt Col</option>
                    <option value="Col">Col</option>
                    <option value="Brig Gen">Brig Gen</option>
                    <option value="Maj Gen">Maj Gen</option>
                    <option value="Lt Gen">Lt Gen</option>
                    <option value="Gen">Gen</option>
                    <option value="Civilian">Civilian</option>
                    <option value="Contractor">Contractor</option>
                  </select>
                  {errors.rank && <span className="text-error text-sm mt-1">{errors.rank}</span>}
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">JDIR</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your JDIR" 
                    className={`input input-bordered w-full ${errors.jdir ? 'input-error' : ''}`}
                    value={jdir}
                    onChange={(e) => setJdir(e.target.value)}
                  />
                  {errors.jdir && <span className="text-error text-sm mt-1">{errors.jdir}</span>}
                </div>
              </div>
              
              <div className="form-control">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register