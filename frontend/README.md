# Vite-Go Frontend

This frontend is built with React, TypeScript, and Vite. It provides a modern UI for the Vite-Go application with a focus on dynamic user interaction and responsive design.

## Features

- **Modern UI**: Built with React 19 and styled with TailwindCSS and DaisyUI
- **Type Safety**: Full TypeScript support for better developer experience
- **Fast Development**: Vite provides lightning-fast HMR (Hot Module Replacement)
- **Responsive Design**: Mobile-first UI that works on all device sizes
- **Secure Backend Integration**: API client with axios for secure backend communication
- **User Registration**: Form with validation for collecting user information
- **MUREP Inventory System**: Manage inventory with transactions and reporting
- **TPFDD Tool**: Transport planning and force deployment tools
- **Process Flow Management**: Visual process flow diagrams and tracking

## Recent Changes

- **API Integration**: Added axios-based API client architecture for backend communication
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
│   │   └── userService.ts # User-related API methods
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page with techy background
│   │   ├── MUREP.tsx     # Inventory management system
│   │   ├── TPFDDTool.tsx # Transport planning tools
│   │   ├── ProcessFlow.tsx # Process flow visualization
│   │   └── Register.tsx  # User registration form
│   ├── App.css           # Global styles
│   ├── App.tsx           # App component
│   ├── routes.tsx        # Centralized route definitions
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

## Routing

Routes are now centralized in a dedicated file:

```typescript
// routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MUREP from './pages/MUREP';
import TPFDDTool from './pages/TPFDDTool';
import ProcessFlow from './pages/ProcessFlow';
import Register from './pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/murep" element={<MUREP />} />
      <Route path="/tpfdd" element={<TPFDDTool />} />
      <Route path="/processflow" element={<ProcessFlow />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
```

## Future Enhancements

- Add user authentication and authorization
- Implement real-time updates with WebSockets
- Enhance MUREP inventory system with barcode scanning
- Add data visualization for inventory analytics
- Implement comprehensive test coverage