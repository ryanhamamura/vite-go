import axios from 'axios';

// Token management
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Create an axios instance with custom config
const apiClient = axios.create({
  baseURL: '/api', // Base URL will be prepended to all requests
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Helper functions for token management
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Token expiration checking
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  } catch (error) {
    return true; // If we can't decode the token, assume it's expired
  }
};

// Function to refresh the token
export const refreshAuthToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');
  
  try {
    const response = await axios.post('/api/auth/refresh', { 
      refreshToken 
    });
    
    const { token, refreshToken: newRefreshToken } = response.data;
    setToken(token);
    setRefreshToken(newRefreshToken);
    return token;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

// Add a request interceptor for handling auth tokens, etc.
apiClient.interceptors.request.use(
  async (config) => {
    // Get the token from storage
    let token = getToken();
    
    // If token exists, check if it's expired
    if (token && isTokenExpired(token)) {
      try {
        // Try to refresh the token
        token = await refreshAuthToken();
      } catch (error) {
        // If refresh fails, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    // If we have a valid token, add it to the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expired error (status 401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const token = await refreshAuthToken();
        
        // Update the failed request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle common errors globally
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 401:
          // Already handled above if token refresh was possible
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