# 🚀 Quick Start Guide - OEM Portal

Get the OEM Control Center up and running in 5 minutes!

## 📦 Installation

```bash
# Navigate to the OEM folder
cd "FrontEnds/OEM"

# Install dependencies
npm install
```

## 🎯 Run Development Server

```bash
npm run dev
```

Open your browser to: **http://localhost:3001**

## 🧭 Navigation

Once running, you'll see:

### 1. **Dashboard** (`/oem/dashboard`)
- View fleet-wide KPIs
- Monitor model performance
- Check regional distribution
- **Try clicking on a model row** to see detailed analytics

### 2. **Models** (`/oem/models`)
- Complete list of all vehicle models
- Failure rates and trends
- **Click any model** to drill down into component details

### 3. **Service Centers** (`/oem/service-centers`)
- All service center locations
- Current and forecasted utilization
- **Click a service center** to view detailed metrics

### 4. **AI Assistant** (Bottom-right corner)
- Click the chat bubble icon
- Ask questions about your fleet:
  - "What's the highest failure rate?"
  - "Which region has the most issues?"
  - "Forecast service demand"

## 🎨 UI Features

### Top Bar Controls

1. **Time Range Selector** (7/30/90 days)
   - Changes the data time window
   - Currently visual only - ready for backend integration

2. **Region Filter** (All/North/South/East/West)
   - Filter data by geographic region
   - Passed as context to AI assistant

## 🗂️ File Structure Overview

```
src/
├── routes/oem/              # All page components
├── components/oem/          # Reusable OEM components
├── components/layout/       # Layout wrapper
├── components/chat/         # AI chat widget
├── hooks/oem/               # React Query hooks
├── lib/
│   ├── oemApi.ts           # Mock API (replace with real endpoints)
│   └── types/              # TypeScript definitions
```

## 🔄 Mock Data

All data is currently **mocked** with realistic random values. Each page refresh generates new data.

### To Connect Real Backend:

1. Update `.env` file (create if needed):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. Replace mock functions in `src/lib/oemApi.ts`:
```typescript
// Change from:
await new Promise(resolve => setTimeout(resolve, 300));
return { /* mock data */ };

// To:
const response = await apiClient.get('/oem/overview', { params });
return response.data;
```

## 🎭 Sample User Flows

### Flow 1: Investigate High Failure Rate
1. Go to **Dashboard**
2. Check **Model Performance** table
3. Click on model with highest failure rate (red)
4. View **Component Breakdown** to see which parts are failing
5. Check **Regional Distribution** to identify problem areas
6. Ask AI assistant: "What's causing the high failure rate for [model]?"

### Flow 2: Service Center Planning
1. Go to **Service Centers**
2. Sort by **Utilization** (High/Medium/Low)
3. Click on a **High utilization** center
4. Review **Current Load** and **Upcoming Load**
5. Check **Common Issues** to understand workload
6. Ask AI assistant: "Which service center needs more capacity?"

### Flow 3: Regional Analysis
1. Go to **Dashboard**
2. Set **Region Filter** to a specific region
3. View **Regional Overview** table
4. Check **Active Issues** and **Upcoming Appointments**
5. Ask AI assistant: "What are the trends in [region]?"

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in vite.config.ts
server: { port: 3002 }
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
The project uses strict TypeScript. If you see errors:
```bash
# Check for type issues
npm run build
```

Most import errors (lucide-react, react-router-dom) will resolve after `npm install`.

## 📚 Learn More

- Full documentation: See `README.md`
- API types: Check `src/lib/types/index.ts`
- Mock data: Review `src/lib/oemApi.ts`

## ✅ Checklist

- [ ] Ran `npm install`
- [ ] Started dev server with `npm run dev`
- [ ] Opened browser to `http://localhost:3001`
- [ ] Navigated through all main pages
- [ ] Tested the AI chat assistant
- [ ] Tried clicking on table rows for details
- [ ] Experimented with filters

## 🎉 You're Ready!

The OEM Portal is now running. Explore the interface, test the features, and prepare to integrate with your backend API.

**Happy coding! 🚀**
