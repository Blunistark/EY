# Customer Portal - Predictive Maintenance Platform

This is the **Customer Portal** frontend for the Agentic AI Predictive Maintenance Platform, built with React, TypeScript, Vite, and modern web technologies.

## Features

- **Vehicle Dashboard**: 3D/2.5D car visualization with interactive parts
- **Health Monitoring**: Real-time vehicle health metrics and component status
- **Predictive Maintenance**: AI-powered issue prediction with probability and severity
- **Complaint Management**: Easy-to-use complaint submission system
- **Appointment Booking**: Multi-step booking flow with service center selection
- **Service History**: Complete service record tracking
- **AI Assistant**: Contextual chat widget for instant help
- **Mock API Layer**: Fully functional with mock data for development

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D visualization
- **Three.js** - 3D graphics library
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, CustomerLayout)
│   ├── customer/        # Customer-specific components
│   ├── chat/            # Chat widget
│   └── three/           # 3D components (CarViewer3D)
├── routes/
│   └── customer/        # Customer portal pages
├── lib/
│   ├── types/           # TypeScript type definitions
│   ├── apiClient.ts     # Axios configuration
│   ├── customerApi.ts   # API functions with mock data
│   └── queryClient.ts   # React Query configuration
├── hooks/               # Custom React hooks
├── styles/              # Global styles
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository and navigate to the Customer folder:
   ```bash
   cd FrontEnds/Customer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### 1. Dashboard
- 3D car viewer with clickable parts (engine, wheels, battery, suspension)
- Vehicle health card with overall and component-level health metrics
- Predicted issues list with severity indicators
- Quick actions for common tasks

### 2. Complaints
- Multi-field complaint form
- Symptom categorization
- Part selection
- Success feedback with auto-redirect

### 3. Appointments
- Next appointment summary card
- Full appointments table with status indicators
- Multi-step booking modal:
  - Step 1: Issue/service selection
  - Step 2: Service center selection
  - Step 3: Date and time slot selection

### 4. Service History
- Complete service record table
- Mileage and cost tracking
- Technician information

### 5. AI Chat Assistant
- Floating chat widget
- Context-aware responses
- Issue-specific conversations
- Mock AI responses with realistic delays

## Mock Data

All API functions in `src/lib/customerApi.ts` currently use mock data:

- **Vehicles**: 2 sample vehicles
- **Vehicle Status**: Health metrics for each vehicle
- **Predicted Issues**: Sample maintenance predictions
- **Service Centers**: 3 sample locations
- **Appointments**: Mock booking data
- **Service History**: Past service records
- **Chat Responses**: Contextual AI responses

To switch to real backend APIs:
1. Update `VITE_API_BASE_URL` in `.env`
2. Replace mock implementations in `customerApi.ts` with actual HTTP calls using the configured `apiClient`

## Styling

The app uses **Tailwind CSS** with a custom configuration:

- **Primary color**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

Custom utility classes are defined in `src/index.css`:
- `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.card`
- `.input-field`, `.label`

## TypeScript

All components and functions are fully typed. Type definitions are in:
- `src/lib/types/index.ts` - API types
- Component prop interfaces defined in each component file

## Next Steps

1. **Connect to real backend**: Replace mock API implementations
2. **Authentication**: Add login/signup flow
3. **3D Model**: Replace placeholder geometry with actual car GLTF model
4. **Notifications**: Add real-time notification system
5. **Payment Integration**: For service bookings
6. **Multi-language**: i18n support

## Contributing

When adding new features:
1. Keep components small and focused
2. Use TypeScript throughout
3. Follow the existing file structure
4. Update mock data in `customerApi.ts` if needed
5. Maintain consistent styling with Tailwind utilities

## License

Proprietary - EY Techathon 6 Project

---

Built with ❤️ by Team Hacksters
