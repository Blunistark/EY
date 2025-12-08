# Quick Start Guide - Customer Portal

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

---

## 📱 What You'll See

### Default Route
The app automatically redirects to `/customer/dashboard`

### Available Pages
- **Dashboard** (`/customer/dashboard`) - Main view with 3D car, health metrics, and predicted issues
- **Complaints** (`/customer/complaints`) - Submit vehicle complaints
- **Appointments** (`/customer/appointments`) - View and book service appointments
- **History** (`/customer/history`) - Service history records

---

## 🎯 Key Features to Test

### Dashboard
1. **3D Car Viewer**: Click on different parts of the car (body, engine, wheels)
2. **Health Card**: View overall and component health metrics
3. **Predicted Issues**: 
   - Click "Ask AI" to open chat with issue context
   - Click "Book Service" to start appointment booking
4. **Quick Actions**: Navigate to complaints, appointments, or open AI assistant

### Complaints
1. Fill out the complaint form
2. Submit to see success message
3. Auto-redirects to dashboard after 2 seconds

### Appointments
1. View next upcoming appointment (if exists)
2. Click "Book New Appointment"
3. Complete 3-step booking process:
   - Step 1: Review issue/service details
   - Step 2: Select service center
   - Step 3: Choose date and time slot
4. Confirm booking

### Chat Widget
1. Click floating chat button (bottom-right)
2. Ask questions about your vehicle
3. Chat provides contextual responses
4. Close with X button

---

## 🎨 UI Overview

### Color Scheme
- **Primary Blue**: Actions, buttons, highlights
- **Success Green**: Positive states, confirmations
- **Warning Amber**: Medium priority alerts
- **Danger Red**: High priority issues

### Components
All components are responsive and follow modern design patterns:
- Cards with hover effects
- Smooth transitions
- Loading states
- Empty states
- Error handling

---

## 🔧 Development Tips

### Mock Data
All data is currently mocked in `src/lib/customerApi.ts`. You can modify:
- Vehicle information
- Health metrics
- Predicted issues
- Service centers
- Appointments

### Adding Real Backend
1. Update `VITE_API_BASE_URL` in `.env`
2. Replace mock functions in `customerApi.ts` with real API calls
3. All components are already wired through React Query hooks

### Customization
- **Colors**: Edit `tailwind.config.js`
- **Types**: Update `src/lib/types/index.ts`
- **Components**: All in `src/components/`
- **Pages**: All in `src/routes/customer/`

---

## 📦 Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## ❓ Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically try the next available port.

### Dependencies Not Installing
Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
The project uses strict TypeScript. If you see errors:
1. Check that all dependencies are installed
2. Ensure you're using Node.js 18+
3. Run `npm run build` to see detailed errors

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

## 📝 Next Steps

1. ✅ Complete the Customer Portal (You are here!)
2. 🔜 Add OEM Portal
3. 🔜 Add Manufacturer Portal
4. 🔜 Connect to real backend APIs
5. 🔜 Add authentication
6. 🔜 Deploy to production

---

**Need Help?** Check the main `README.md` for detailed documentation.
