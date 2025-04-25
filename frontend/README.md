# Vite-Go Frontend

This frontend is built with React, TypeScript, and Vite. It provides a modern UI for the Vite-Go application with a focus on dynamic user interaction and responsive design.

## Features

- **Modern UI**: Built with React 19 and styled with TailwindCSS and DaisyUI
- **Type Safety**: Full TypeScript support for better developer experience
- **Fast Development**: Vite provides lightning-fast HMR (Hot Module Replacement)
- **Responsive Design**: Mobile-first UI that works on all device sizes
- **Secure Backend Integration**: API client with axios for secure backend communication
- **Authentication**: CAC/Smartcard authentication with JWT tokens
- **Protected Routes**: Route-based access control with role permissions
- **User Registration**: Form with validation for collecting user information
- **MUREP Inventory System**: Manage inventory with transactions and reporting
- **TPFDD Tool**: Transport planning and force deployment tools
- **Process Flow Management**: Visual process flow diagrams and tracking

## Recent Changes

- **Authentication System**: Added JWT-based authentication with CAC/smartcard support
- **Protected Routes**: Implemented route protection with role-based access control
- **API Integration**: Added axios-based API client architecture with token handling
- **User Registration**: Form with comprehensive validation and API integration  
- **Component Renaming**: Renamed ArmsVault to MUREP and AirTrackPro to TPFDD
- **URL Updates**: Updated route paths to match new component names
- **UI Enhancement**: Added Apple-inspired tech gradient background for homepage
- **Route Organization**: Moved routes to a separate file for better code organization

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/frontend
├── public/               # Static assets
├── src/
│   ├── api/              # API integration
│   │   ├── apiClient.ts  # Axios configuration and interceptors
│   │   ├── authService.ts # Authentication methods and token handling
│   │   └── userService.ts # User-related API methods
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable UI components
│   │   ├── AuthButton.tsx # Login/logout button with auth state
│   │   ├── LoginPrompt.tsx # CAC login prompt for protected routes
│   │   └── ProtectedRoute.tsx # Route access control component
│   ├── context/
│   │   └── AuthContext.tsx # Authentication state management
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page with techy background
│   │   ├── MUREP.tsx     # Inventory management system
│   │   ├── TPFDDTool.tsx # Transport planning tools
│   │   ├── ProcessFlow.tsx # Process flow visualization
│   │   └── Register.tsx  # User registration form
│   ├── App.css           # Global styles
│   ├── App.tsx           # App component
│   ├── routes.tsx        # Centralized route definitions with access control
│   └── main.tsx          # App entry point
└── vite.config.ts        # Vite configuration
```

## API Integration

The frontend uses axios for API communication:

```typescript
// Example API call using the user service
import { userService } from '../api/userService';

// Register a new user
const registerUser = async (userData) => {
  try {
    const response = await userService.register(userData);
    console.log('User registered successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
```

## MUREP Functionality

The MUREP (formerly ArmsVault) system provides:

- Inventory tracking across multiple locations
- Transaction management (gains, expenditures, transfers)
- Reporting and analytics
- Storage location management

## Authentication and Protected Routes

The application uses JWT tokens with CAC (Common Access Card) authentication:

```typescript
// Authentication with CAC/smartcard
import { useAuth } from '../context/AuthContext';

const LoginButton = () => {
  const { login, isAuthenticated } = useAuth();
  
  const handleLogin = async () => {
    try {
      // This will trigger CAC selection in browser
      await login();
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };
  
  return (
    <button onClick={handleLogin}>
      Login with CAC
    </button>
  );
};
```

Protected routes prevent unauthorized access:

```typescript
// routes.tsx with protected routes
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes - require authentication */}
      <Route path="/tpfdd" element={
        <ProtectedRoute>
          <TPFDDTool />
        </ProtectedRoute>
      } />
      
      {/* Role-protected routes */}
      <Route path="/processflow" element={
        <ProtectedRoute requiredRole="admin">
          <ProcessFlow />
        </ProtectedRoute>
      } />
    </Routes>
  );
};
```

## Future Enhancements

- Enhance CAC integration with certificate validation
- Implement real-time updates with WebSockets
- Add more granular permission controls
- Enhance MUREP inventory system with barcode scanning
- Add data visualization for inventory analytics
- Implement comprehensive test coverage