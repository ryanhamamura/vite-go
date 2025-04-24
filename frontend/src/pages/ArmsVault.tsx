import { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'

// Types
interface Location {
  id: number
  name: string
  type: string
  capacity: number
  currentCount: number
}

interface Transaction {
  id: number
  date: string
  type: string
  location: string
  destination?: string
  item: string
  quantity: number
  reason?: string
  source?: string
  user: string
}

interface InventoryItem {
  id: number
  name: string
  category: string
  inStock: number
  allocated: number
  location: string
}

// API Service Interface (for future implementation)
/*
interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// Service for handling API transactions
const transactionService = {
  // Get all transactions with optional filtering
  async getTransactions(filters?: Record<string, any>): Promise<ApiResponse<Transaction[]>> {
    try {
      const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : ''
      const response = await fetch(`/api/transactions${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }
      
      const data = await response.json()
      return { status: 'success', data }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return { status: 'error', data: [], message: 'Failed to load transactions' }
    }
  },
  
  // Get transaction by ID
  async getTransactionById(id: number): Promise<ApiResponse<Transaction>> {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch transaction')
      }
      
      const data = await response.json()
      return { status: 'success', data }
    } catch (error) {
      console.error(`Error fetching transaction #${id}:`, error)
      return { 
        status: 'error', 
        data: {} as Transaction, 
        message: 'Failed to load transaction details' 
      }
    }
  },
  
  // Create a new transaction
  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(transaction)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }
      
      const data = await response.json()
      return { status: 'success', data }
    } catch (error) {
      console.error('Error creating transaction:', error)
      return { 
        status: 'error', 
        data: {} as Transaction, 
        message: 'Failed to save transaction' 
      }
    }
  }
}
*/

// Mock data for demonstration
const mockLocations: Location[] = [
  { id: 1, name: 'Main Armory', type: 'Secure Vault', capacity: 500, currentCount: 342 },
  { id: 2, name: 'Alpha Team Locker', type: 'Field Storage', capacity: 50, currentCount: 28 },
  { id: 3, name: 'Training Center', type: 'Range Locker', capacity: 100, currentCount: 72 },
  { id: 4, name: 'Vehicle Bay', type: 'Mobile Storage', capacity: 200, currentCount: 115 }
]

const initialTransactions: Transaction[] = [
  { id: 1, date: '2025-04-22', type: 'Gain', location: 'Main Armory', item: '5.56mm NATO Rounds', quantity: 5000, user: 'Sgt. Johnson' },
  { id: 2, date: '2025-04-23', type: 'Expenditure', location: 'Training Center', item: '9mm Rounds', quantity: 500, user: 'Lt. Miller' },
  { id: 3, date: '2025-04-23', type: 'Transfer', location: 'Alpha Team Locker', destination: 'Vehicle Bay', item: 'M4 Carbines', quantity: 12, user: 'Cpt. Williams' },
  { id: 4, date: '2025-04-24', type: 'Other Loss', location: 'Main Armory', item: 'Smoke Grenades', quantity: 6, reason: 'Defective', user: 'Sgt. Davis' }
]

const mockInventoryItems: InventoryItem[] = [
  { id: 1, name: 'M4 Carbine', category: 'Weapon', inStock: 120, allocated: 87, location: 'Main Armory' },
  { id: 2, name: '5.56mm NATO Rounds', category: 'Ammunition', inStock: 25000, allocated: 12000, location: 'Main Armory' },
  { id: 3, name: 'M9 Pistol', category: 'Weapon', inStock: 75, allocated: 42, location: 'Main Armory' },
  { id: 4, name: '9mm Rounds', category: 'Ammunition', inStock: 10000, allocated: 5000, location: 'Main Armory' },
  { id: 5, name: 'M67 Fragmentation Grenade', category: 'Explosive', inStock: 200, allocated: 50, location: 'Main Armory' },
  { id: 6, name: 'M18 Smoke Grenade', category: 'Non-lethal', inStock: 300, allocated: 120, location: 'Vehicle Bay' }
]

type TabType = 'overview' | 'locations' | 'transactions' | 'reports'

function ArmsVault() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showNewLocationForm, setShowNewLocationForm] = useState(false)
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false)
  const [transactionType, setTransactionType] = useState('Gain')
  const [reportType, setReportType] = useState('Inventory')
  
  // Transaction state
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [nextTransactionId, setNextTransactionId] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  
  // Transaction form state
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [formLocation, setFormLocation] = useState<string>('')
  const [formDestination, setFormDestination] = useState<string>('')
  const [formItem, setFormItem] = useState<string>('')
  const [formQuantity, setFormQuantity] = useState<string>('')
  const [formSource, setFormSource] = useState<string>('')
  const [formReason, setFormReason] = useState<string>('')
  const [formNotes, setFormNotes] = useState<string>('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // For API integration (uncomment when API is ready)
  /*
  // Fetch transactions from API when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      
      try {
        // Fetch transactions from API
        const response = await fetch('/api/transactions', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
        // Handle error state
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTransactions()
  }, [])
  */
  
  // Add new transaction
  const handleSubmitTransaction = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!formLocation || !formItem || !formQuantity) {
      alert('Please fill in all required fields')
      return
    }
    
    // For Transfer type, destination is required
    if (transactionType === 'Transfer' && !formDestination) {
      alert('Please select a destination for the transfer')
      return
    }
    
    // For Other Loss, reason is required
    if (transactionType === 'Other Loss' && !formReason) {
      alert('Please provide a reason for the loss')
      return
    }
    
    const newTransaction: Transaction = {
      id: nextTransactionId,
      date: formDate,
      type: transactionType,
      location: formLocation,
      item: formItem,
      quantity: parseInt(formQuantity),
      user: 'Current User' // In a real app, this would come from authentication
    }
    
    // Add conditional properties
    if (transactionType === 'Transfer') {
      newTransaction.destination = formDestination
    }
    
    if (transactionType === 'Gain') {
      newTransaction.source = formSource
    }
    
    if (transactionType === 'Other Loss') {
      newTransaction.reason = formReason
    }
    
    // *** API INTEGRATION - POST NEW TRANSACTION ***
    /* 
    // This would be uncommented and implemented when the backend API is ready
    try {
      // Show loading state
      // setIsLoading(true)
      
      // Send transaction data to API
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken // Authentication token would be used here
        },
        body: JSON.stringify(newTransaction)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save transaction')
      }
      
      // Get the saved transaction with server-generated ID
      const savedTransaction = await response.json()
      
      // Update transactions list with the server response
      setTransactions([savedTransaction, ...transactions])
      
      // Hide loading state and show success
      // setIsLoading(false)
      setFormSubmitted(true)
      
    } catch (error) {
      // Handle error state
      console.error('Error saving transaction:', error)
      alert('Failed to save transaction. Please try again.')
      // setIsLoading(false)
      return
    }
    */
    
    // This is the client-side only implementation (remove when API is integrated)
    setTransactions([newTransaction, ...transactions])
    setNextTransactionId(nextTransactionId + 1)
    
    // Reset form
    resetTransactionForm()
    setFormSubmitted(true)
    
    // Close form after submission
    setTimeout(() => {
      setShowNewTransactionForm(false)
      setFormSubmitted(false)
    }, 2000)
  }
  
  // Reset transaction form
  const resetTransactionForm = () => {
    setFormDate(new Date().toISOString().split('T')[0])
    setFormLocation('')
    setFormDestination('')
    setFormItem('')
    setFormQuantity('')
    setFormSource('')
    setFormReason('')
    setFormNotes('')
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>ArmsVault</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-base-200 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">ArmsVault</h2>
            <div className="flex flex-col gap-2">
              <button 
                className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'} justify-start`}
                onClick={() => setActiveTab('overview')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                Overview
              </button>
              <button 
                className={`btn ${activeTab === 'locations' ? 'btn-primary' : 'btn-ghost'} justify-start`}
                onClick={() => setActiveTab('locations')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Storage Locations
              </button>
              <button 
                className={`btn ${activeTab === 'transactions' ? 'btn-primary' : 'btn-ghost'} justify-start`}
                onClick={() => {
                  setActiveTab('transactions')
                  resetTransactionForm()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                Transactions
              </button>
              <button 
                className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-ghost'} justify-start`}
                onClick={() => setActiveTab('reports')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                Reports
              </button>
            </div>
          </div>

          <div className="bg-base-200 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
            <div className="stat">
              <div className="stat-title">Total Items</div>
              <div className="stat-value">25,795</div>
              <div className="stat-desc">Across all locations</div>
            </div>
            <div className="stat">
              <div className="stat-title">Transactions Today</div>
              <div className="stat-value">{transactions.filter(t => t.date === new Date().toISOString().split('T')[0]).length}</div>
              <div className="stat-desc">Updated in real-time</div>
            </div>
            <div className="stat">
              <div className="stat-title">Locations</div>
              <div className="stat-value">{mockLocations.length}</div>
              <div className="stat-desc">Active storage locations</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">ArmsVault Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="stat bg-primary text-primary-content rounded-box">
                  <div className="stat-figure text-primary-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <div className="stat-title text-primary-content opacity-80">Inventory Items</div>
                  <div className="stat-value">195</div>
                  <div className="stat-desc text-primary-content opacity-70">Item categories in system</div>
                </div>
                <div className="stat bg-accent text-accent-content rounded-box">
                  <div className="stat-figure text-accent-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div className="stat-title text-accent-content opacity-80">Value Tracked</div>
                  <div className="stat-value">$14.2M</div>
                  <div className="stat-desc text-accent-content opacity-70">Total inventory value</div>
                </div>
                <div className="stat bg-secondary text-secondary-content rounded-box">
                  <div className="stat-figure text-secondary-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                  </div>
                  <div className="stat-title text-secondary-content opacity-80">Compliance</div>
                  <div className="stat-value">99.8%</div>
                  <div className="stat-desc text-secondary-content opacity-70">Inventory accuracy</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-base-200 p-6 rounded-box shadow">
                  <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Item</th>
                          <th>Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 4).map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>
                              <span className={`badge ${transaction.type === 'Gain' ? 'badge-success' : transaction.type === 'Expenditure' ? 'badge-error' : transaction.type === 'Transfer' ? 'badge-warning' : 'badge-ghost'}`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td>{transaction.item}</td>
                            <td>{transaction.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button 
                    className="btn btn-sm btn-ghost mt-2"
                    onClick={() => setActiveTab('transactions')}
                  >
                    View All
                  </button>
                </div>
                
                <div className="bg-base-200 p-6 rounded-box shadow">
                  <h2 className="text-xl font-bold mb-4">Storage Status</h2>
                  <div className="space-y-4">
                    {mockLocations.map(location => (
                      <div key={location.id} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{location.name}</span>
                          <span className="text-sm">
                            {location.currentCount}/{location.capacity} ({Math.round((location.currentCount / location.capacity) * 100)}%)
                          </span>
                        </div>
                        <progress 
                          className={`progress ${location.currentCount / location.capacity > 0.9 ? 'progress-error' : location.currentCount / location.capacity > 0.7 ? 'progress-warning' : 'progress-success'}`} 
                          value={location.currentCount} 
                          max={location.capacity}
                        />
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-sm btn-ghost mt-4"
                    onClick={() => setActiveTab('locations')}
                  >
                    Manage Locations
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Storage Locations</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowNewLocationForm(!showNewLocationForm)}
                >
                  {showNewLocationForm ? 'Cancel' : 'Add Location'}
                </button>
              </div>

              {showNewLocationForm && (
                <div className="bg-base-200 p-6 rounded-box shadow mb-6">
                  <h2 className="text-xl font-bold mb-4">Add New Storage Location</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Location Name</span>
                      </label>
                      <input type="text" placeholder="e.g. East Wing Armory" className="input input-bordered w-full" />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Type</span>
                      </label>
                      <select className="select select-bordered w-full">
                        <option>Secure Vault</option>
                        <option>Field Storage</option>
                        <option>Range Locker</option>
                        <option>Mobile Storage</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Capacity</span>
                      </label>
                      <input type="number" placeholder="Maximum items" className="input input-bordered w-full" min="1" />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Security Level</span>
                      </label>
                      <select className="select select-bordered w-full">
                        <option>Level 1 - Standard</option>
                        <option>Level 2 - Enhanced</option>
                        <option>Level 3 - High</option>
                        <option>Level 4 - Maximum</option>
                      </select>
                    </div>
                    
                    <div className="form-control w-full md:col-span-2">
                      <label className="label">
                        <span className="label-text">Notes</span>
                      </label>
                      <textarea className="textarea textarea-bordered h-24" placeholder="Additional information about this location"></textarea>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                      <button type="button" className="btn" onClick={() => setShowNewLocationForm(false)}>Cancel</button>
                      <button type="button" className="btn btn-primary">Save Location</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto bg-base-100 rounded-box shadow">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Capacity</th>
                      <th>Current Usage</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLocations.map(location => (
                      <tr key={location.id}>
                        <td className="font-medium">{location.name}</td>
                        <td>{location.type}</td>
                        <td>{location.capacity}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <progress 
                              className={`progress w-20 ${location.currentCount / location.capacity > 0.9 ? 'progress-error' : location.currentCount / location.capacity > 0.7 ? 'progress-warning' : 'progress-success'}`} 
                              value={location.currentCount} 
                              max={location.capacity}
                            />
                            <span>{Math.round((location.currentCount / location.capacity) * 100)}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${location.currentCount / location.capacity > 0.9 ? 'badge-error' : location.currentCount / location.capacity > 0.7 ? 'badge-warning' : 'badge-success'}`}>
                            {location.currentCount / location.capacity > 0.9 ? 'Near Capacity' : location.currentCount / location.capacity > 0.7 ? 'Filling Up' : 'Available'}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">View</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Inventory Transactions</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowNewTransactionForm(!showNewTransactionForm)
                    resetTransactionForm()
                  }}
                >
                  {showNewTransactionForm ? 'Cancel' : 'New Transaction'}
                </button>
              </div>

              {showNewTransactionForm && (
                <div className="bg-base-200 p-6 rounded-box shadow mb-6">
                  <h2 className="text-xl font-bold mb-4">Record New Transaction</h2>
                  
                  <div className="tabs tabs-boxed mb-4">
                    <a 
                      className={`tab ${transactionType === 'Gain' ? 'tab-active' : ''}`}
                      onClick={() => setTransactionType('Gain')}
                    >
                      Gain
                    </a>
                    <a 
                      className={`tab ${transactionType === 'Expenditure' ? 'tab-active' : ''}`}
                      onClick={() => setTransactionType('Expenditure')}
                    >
                      Expenditure
                    </a>
                    <a 
                      className={`tab ${transactionType === 'Transfer' ? 'tab-active' : ''}`}
                      onClick={() => setTransactionType('Transfer')}
                    >
                      Transfer
                    </a>
                    <a 
                      className={`tab ${transactionType === 'Other Loss' ? 'tab-active' : ''}`}
                      onClick={() => setTransactionType('Other Loss')}
                    >
                      Other Loss
                    </a>
                  </div>
                  
                  {formSubmitted && (
                    <div className="alert alert-success mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Transaction recorded successfully!</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmitTransaction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Date</span>
                      </label>
                      <input 
                        type="date" 
                        className="input input-bordered w-full" 
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <select 
                        className="select select-bordered w-full"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select location</option>
                        {mockLocations.map(location => (
                          <option key={location.id} value={location.name}>{location.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    {transactionType === 'Transfer' && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Destination</span>
                        </label>
                        <select 
                          className="select select-bordered w-full"
                          value={formDestination}
                          onChange={(e) => setFormDestination(e.target.value)}
                          required={transactionType === 'Transfer'}
                        >
                          <option value="" disabled>Select destination</option>
                          {mockLocations
                            .filter(loc => loc.name !== formLocation)
                            .map(location => (
                              <option key={location.id} value={location.name}>{location.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Item</span>
                      </label>
                      <select 
                        className="select select-bordered w-full"
                        value={formItem}
                        onChange={(e) => setFormItem(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select item</option>
                        {mockInventoryItems.map(item => (
                          <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Quantity</span>
                      </label>
                      <input 
                        type="number" 
                        placeholder="Quantity" 
                        className="input input-bordered w-full" 
                        min="1"
                        value={formQuantity}
                        onChange={(e) => setFormQuantity(e.target.value)}
                        required
                      />
                    </div>
                    
                    {transactionType === 'Gain' && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Source</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Supply Shipment #123" 
                          className="input input-bordered w-full"
                          value={formSource}
                          onChange={(e) => setFormSource(e.target.value)}
                        />
                      </div>
                    )}
                    
                    {transactionType === 'Other Loss' && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Reason</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Damaged in training" 
                          className="input input-bordered w-full"
                          value={formReason}
                          onChange={(e) => setFormReason(e.target.value)}
                          required={transactionType === 'Other Loss'}
                        />
                      </div>
                    )}
                    
                    <div className="form-control w-full md:col-span-2">
                      <label className="label">
                        <span className="label-text">Notes</span>
                      </label>
                      <textarea 
                        className="textarea textarea-bordered h-24" 
                        placeholder="Additional details about this transaction"
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                      <button 
                        type="button" 
                        className="btn" 
                        onClick={() => setShowNewTransactionForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">Record Transaction</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-base-200 p-4 rounded-box shadow mb-6">
                <h2 className="text-xl font-bold mb-2">Transaction Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Range</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>Today</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Month</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>All Types</option>
                      <option>Gain</option>
                      <option>Expenditure</option>
                      <option>Transfer</option>
                      <option>Other Loss</option>
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>All Locations</option>
                      {mockLocations.map(location => (
                        <option key={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Item Category</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>All Categories</option>
                      <option>Weapon</option>
                      <option>Ammunition</option>
                      <option>Explosive</option>
                      <option>Non-lethal</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto bg-base-100 rounded-box shadow">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Location</th>
                      <th>User</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>
                          <span className={`badge ${transaction.type === 'Gain' ? 'badge-success' : transaction.type === 'Expenditure' ? 'badge-error' : transaction.type === 'Transfer' ? 'badge-warning' : 'badge-ghost'}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td>{transaction.item}</td>
                        <td>{transaction.quantity}</td>
                        <td>{transaction.location}{transaction.destination && ` → ${transaction.destination}`}</td>
                        <td>{transaction.user}</td>
                        <td>
                          <button className="btn btn-xs btn-ghost">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 flex justify-between">
                  <span className="text-sm">Showing {transactions.length} transactions</span>
                  <div className="join">
                    <button className="join-item btn btn-sm">«</button>
                    <button className="join-item btn btn-sm btn-active">1</button>
                    <button className="join-item btn btn-sm">2</button>
                    <button className="join-item btn btn-sm">3</button>
                    <button className="join-item btn btn-sm">»</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Inventory Reports</h1>
              
              <div className="bg-base-200 p-6 rounded-box shadow mb-6">
                <h2 className="text-xl font-bold mb-4">Generate Report</h2>
                
                <div className="tabs tabs-boxed mb-4">
                  <a 
                    className={`tab ${reportType === 'Inventory' ? 'tab-active' : ''}`}
                    onClick={() => setReportType('Inventory')}
                  >
                    Inventory Status
                  </a>
                  <a 
                    className={`tab ${reportType === 'Transaction' ? 'tab-active' : ''}`}
                    onClick={() => setReportType('Transaction')}
                  >
                    Transaction History
                  </a>
                  <a 
                    className={`tab ${reportType === 'Audit' ? 'tab-active' : ''}`}
                    onClick={() => setReportType('Audit')}
                  >
                    Audit Report
                  </a>
                  <a 
                    className={`tab ${reportType === 'Forecast' ? 'tab-active' : ''}`}
                    onClick={() => setReportType('Forecast')}
                  >
                    Usage Forecast
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>All Locations</option>
                      {mockLocations.map(location => (
                        <option key={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Range</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>Current Status (Today)</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Month</option>
                      <option>Last Quarter</option>
                      <option>Year to Date</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Format</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                      <option>On-screen</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary">Generate Report</button>
                </div>
              </div>
              
              <div className="bg-base-200 p-6 rounded-box shadow">
                <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date Generated</th>
                        <th>Report Type</th>
                        <th>Parameters</th>
                        <th>Generated By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-04-24</td>
                        <td>Inventory Status</td>
                        <td>All Locations, Current Status</td>
                        <td>Sgt. Johnson</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-primary">Download</button>
                            <button className="btn btn-xs btn-ghost">View</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2025-04-23</td>
                        <td>Transaction History</td>
                        <td>Main Armory, Last 7 Days</td>
                        <td>Lt. Miller</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-primary">Download</button>
                            <button className="btn btn-xs btn-ghost">View</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2025-04-20</td>
                        <td>Audit Report</td>
                        <td>All Locations, Last Quarter</td>
                        <td>Cpt. Williams</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-primary">Download</button>
                            <button className="btn btn-xs btn-ghost">View</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2025-04-15</td>
                        <td>Usage Forecast</td>
                        <td>All Locations, Next 90 Days</td>
                        <td>Maj. Anderson</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-primary">Download</button>
                            <button className="btn btn-xs btn-ghost">View</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArmsVault