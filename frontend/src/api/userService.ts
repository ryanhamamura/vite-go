import apiClient from './apiClient';

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rank: string;
  jdir: string;
}

export const userService = {
  /**
   * Register a new user
   */
  register: (userData: UserRegistration) => {
    return apiClient.post('/register', userData);
  },
  
  /**
   * Get user profile by ID
   */
  getUserProfile: (userId: string) => {
    return apiClient.get(`/users/${userId}`);
  },
  
  /**
   * Update user profile
   */
  updateUserProfile: (userId: string, userData: Partial<UserRegistration>) => {
    return apiClient.put(`/users/${userId}`, userData);
  }
};

export default userService;