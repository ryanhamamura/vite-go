import apiClient, { setToken, setRefreshToken, clearTokens } from './apiClient';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    rank: string;
    jdir: string;
    subjectName: string; // DN from the certificate
    role: string;
  };
  token: string;
  refreshToken: string;
}

export const authService = {
  /**
   * Login using client certificate (smartcard)
   * This will trigger the browser to prompt for smartcard selection
   */
  login: async () => {
    // Make a request to the authentication endpoint that requires client certificate
    // The browser will automatically prompt the user to select their smartcard
    const response = await apiClient.post<AuthResponse>('/auth/login', {}, {
      // Special config for certificate auth - forces new TLS handshake
      withCredentials: true
    });
    
    // Store tokens returned from server after successful certificate auth
    setToken(response.data.token);
    setRefreshToken(response.data.refreshToken);
    
    return response.data;
  },
  
  /**
   * Logout user and clear tokens
   */
  logout: async () => {
    try {
      // Notify backend about logout
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear tokens locally, even if server request fails
      clearTokens();
    }
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    // Simple check if token exists - actual validation happens in apiClient interceptors
    return !!localStorage.getItem('auth_token');
  },
  
  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  
  /**
   * Check certificate status (for debugging)
   * Useful to verify if a valid certificate is being presented
   */
  checkCertStatus: async () => {
    try {
      const response = await apiClient.get('/auth/cert-status', {
        withCredentials: true
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error
      };
    }
  }
};

export default authService;