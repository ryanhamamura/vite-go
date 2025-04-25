import axios from 'axios';

// Create an axios instance with custom config
const apiClient = axios.create({
  baseURL: '/api', // Base URL will be prepended to all requests
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor for handling auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Could add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - could redirect to login
          console.log('Unauthorized: You need to log in');
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.log('Forbidden: You do not have permission');
          break;
        case 404:
          // Not found
          console.log('Resource not found');
          break;
        case 500:
          // Server error
          console.log('Server error occurred');
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error: No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;