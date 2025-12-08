# OEM Control Center - Predictive Maintenance Platform

A comprehensive OEM (Original Equipment Manufacturer) dashboard for monitoring vehicle fleet performance, analyzing predictive maintenance data, and managing service center operations.

## 🚀 Features

### Dashboard Overview
- **Real-time Fleet Monitoring**: Track total vehicles, active issues, and high-severity cases
- **Forecasted Service Demand**: 7-day service demand prediction
- **Model Performance Analytics**: Failure rates and trends for all vehicle models
- **Regional Analytics**: Geographic distribution of vehicles and service needs

### Model Management
- **Model Performance Tracking**: Detailed metrics for each vehicle model
- **Component Breakdown**: Analysis of most common failure points
- **Severity Distribution**: LOW/MEDIUM/HIGH severity categorization
- **Regional Distribution**: Geographic analysis of model-specific issues

### Service Center Management
- **Service Center Overview**: Complete list of all service centers
- **Utilization Tracking**: Real-time and forecasted capacity utilization
- **Common Issues Tracking**: Most frequently serviced issues per location
- **Model Service Distribution**: Which models are serviced at each center

### AI-Powered Insights
- **OEM AI Assistant**: Context-aware chatbot for analytics queries
- **Natural Language Queries**: Ask about trends, regions, components, and forecasts
- **Intelligent Recommendations**: Proactive suggestions for service center staffing

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) v5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx         # AI assistant chat interface
│   ├── layout/
│   │   └── OEMLayout.tsx          # Main layout with nav and filters
│   └── oem/
│       ├── OEMKPISection.tsx      # KPI cards component
│       ├── OEMModelTable.tsx      # Models overview table
│       └── OEMRegionalTable.tsx   # Regional summary table
├── hooks/
│   └── oem/
│       ├── useOEMOverview.ts      # Dashboard data hook
│       ├── useOEMModels.ts        # Models list hook
│       ├── useOEMModelPerformance.ts
│       ├── useOEMServiceCenters.ts
│       └── useOEMServiceCenterDetail.ts
├── lib/
│   ├── apiClient.ts               # Axios instance
│   ├── oemApi.ts                  # Mock API functions
│   ├── queryClient.ts             # React Query client
│   └── types/
│       └── index.ts               # TypeScript types
├── routes/
│   └── oem/
│       ├── OEMRoutes.tsx          # Route configuration
│       ├── OEMDashboardPage.tsx
│       ├── OEMModelsPage.tsx
│       ├── OEMModelDetailPage.tsx
│       ├── OEMServiceCentersPage.tsx
│       └── OEMServiceCenterDetailPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the OEM folder
cd FrontEnds/OEM

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

## 🔌 API Integration

Currently, the application uses **mock data** for development. To integrate with real backend APIs:

1. Update `lib/oemApi.ts` to use actual HTTP calls:

```typescript
export const getOEMOverview = async (params?: OEMOverviewParams): Promise<OEMOverview> => {
  const response = await apiClient.get('/oem/overview', { params });
  return response.data;
};
```

2. Set the `VITE_API_BASE_URL` environment variable:

```bash
VITE_API_BASE_URL=https://your-backend-api.com/api
```

## 🗺️ Routes

- `/oem` → Redirects to dashboard
- `/oem/dashboard` → Main OEM dashboard
- `/oem/models` → Vehicle models list
- `/oem/model/:modelId` → Detailed model performance
- `/oem/service-centers` → Service centers list
- `/oem/service-center/:id` → Service center details

## 🎨 Styling & Theme

The application uses a Tesla-inspired dark theme with:

- **Primary Color**: Tesla Blue (#3B82F6)
- **Background**: Tesla Black (#000000)
- **Glass Morphism**: Frosted glass effects throughout
- **Gradient Accents**: Blue gradient text and glow effects

### Custom Tailwind Classes

- `glass` - Light glass effect
- `glass-strong` - Strong glass effect
- `gradient-text` - Blue gradient text
- `shadow-glow-blue/red/green` - Colored glow shadows

## 🔍 Key Features Implementation

### Time Range & Region Filters

Filters are managed in `OEMLayout` and passed as context to the chat widget. They can be used to filter data across all pages:

```typescript
const [timeRange, setTimeRange] = useState<TimeRange>('30days');
const [region, setRegion] = useState<Region>('All');
```

### React Query Caching

All data is cached with React Query for optimal performance:

```typescript
queryKey: ['oemOverview', params],
staleTime: 1000 * 60 * 5, // 5 minutes
```

### Responsive Design

The application is fully responsive with Tailwind's responsive utilities:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## 🤖 AI Chat Assistant

The chat widget provides intelligent insights:

- **Context-Aware**: Includes current time range and region filters
- **Natural Language**: Understands queries about trends, regions, components
- **Proactive Recommendations**: Suggests actions based on metrics

Example queries:
- "What's the highest failure rate?"
- "Which region has the most issues?"
- "Forecast service demand for next week"

## 📊 Mock Data

Mock data generators in `lib/oemApi.ts` provide realistic data:

- **Randomized**: Different data on each load
- **Realistic Ranges**: Failure rates, vehicle counts, etc.
- **Configurable**: Easy to adjust ranges for testing

## 🔧 Development

### Code Quality

```bash
# Run linter
npm run lint

# Type checking
npm run build
```

### TypeScript Strict Mode

The project uses strict TypeScript for type safety. All props, state, and API responses are fully typed.

## 🚀 Deployment

### Vercel / Netlify

```bash
npm run build
# Deploy the 'dist' folder
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "preview"]
```

## 📝 TODO / Future Enhancements

- [ ] Add data export functionality (CSV/PDF)
- [ ] Implement user authentication
- [ ] Add real-time WebSocket updates
- [ ] Create advanced filtering and search
- [ ] Add data visualization charts (using Chart.js or Recharts)
- [ ] Implement notification system
- [ ] Add dark/light theme toggle
- [ ] Create PDF report generation

## 🤝 Contributing

This is part of the EY Techathon 6 project. Follow the existing code patterns and TypeScript conventions.

## 📄 License

Proprietary - Team Hacksters

---

**Built with ❤️ by Team Hacksters for EY Techathon 6**
