# Installation & Verification Guide

## 📦 Installation Steps

### Step 1: Navigate to Project
```bash
cd "/Users/vishnu/Documents/Documents - Mac/CSE(AI&ML)/Projects/Hackathons/0.Team Hacksters/3.EY Techathon 6/FrontEnds/Customer"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React ecosystem (React, React DOM, React Router)
- TypeScript and type definitions
- Vite build tool
- TanStack Query for data fetching
- Tailwind CSS for styling
- React Three Fiber and Three.js for 3D
- Axios for HTTP requests
- All dev dependencies (ESLint, etc.)

**Expected time**: 2-3 minutes depending on internet speed

### Step 3: Create Environment File
```bash
cp .env.example .env
```

The default `.env` will point to `http://localhost:5000/api` (currently mocked).

### Step 4: Start Development Server
```bash
npm run dev
```

**Expected output**:
```
  VITE v5.2.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 5: Open Browser
Navigate to: `http://localhost:3000`

You should be automatically redirected to: `http://localhost:3000/customer/dashboard`

---

## ✅ Verification Checklist

### Visual Verification

#### Dashboard (`/customer/dashboard`)
- [ ] Page loads without errors
- [ ] Header displays with logo "PM" and "Predictive Maintenance"
- [ ] Vehicle selector shows "Tesla Model S (TN-01-AB-1234)"
- [ ] Navigation links visible: "Appointments" and "History"
- [ ] User profile shows "JD John Doe"
- [ ] 3D car viewer displays with a blue car model
- [ ] Car can be rotated by dragging
- [ ] Car can be zoomed with scroll wheel
- [ ] Instruction text visible: "Click on car parts to view details"
- [ ] Vehicle Health Card shows:
  - Overall Health: 87%
  - Green progress bar
  - Component health: Battery 92%, Engine 88%, Brakes 85%, Suspension 90%
  - Mileage: 45,230 km
  - Last Service and Next Service dates
- [ ] Quick Actions card shows 3 buttons
- [ ] Predicted Issues shows 3 issues:
  - Front Brake Pads (Medium severity, orange badge)
  - Battery Pack (Low severity, green badge)
  - Suspension System (Medium severity, orange badge)
- [ ] Each issue has "Ask AI" and "Book Service" buttons

#### Chat Widget
- [ ] Floating blue chat button visible in bottom-right corner
- [ ] Click opens chat panel
- [ ] Can type message and send
- [ ] Typing indicator shows while waiting
- [ ] AI response appears after ~800ms
- [ ] Chat closes with X button

#### Complaints Page (`/customer/complaints`)
- [ ] Navigate via Quick Actions → "Raise a Complaint"
- [ ] Form displays with all fields:
  - Vehicle dropdown
  - Affected Part dropdown
  - Symptom Category dropdown
  - Description textarea
  - When it occurs text field
- [ ] Can fill out form
- [ ] Submit shows success message
- [ ] Auto-redirects to dashboard after 2 seconds

#### Appointments Page (`/customer/appointments`)
- [ ] Navigate via header "Appointments" link or Quick Actions
- [ ] "Book New Appointment" button visible
- [ ] Next appointment card shows (if exists)
- [ ] Table displays appointment with:
  - Date: January 15, 2025
  - Time: 10:00 AM - 11:00 AM
  - Service Center: Tesla Service Center - Chennai
  - Status: Scheduled (blue badge)
  - Service Type: Routine Maintenance
- [ ] Click "Book New Appointment"
- [ ] Modal opens with 3-step progress
- [ ] Step 1: Can enter service details
- [ ] Click "Next" to Step 2
- [ ] Step 2: Shows 3 service centers
- [ ] Select one and click "Next"
- [ ] Step 3: Date picker works
- [ ] After selecting date, time slots appear
- [ ] Can select a time slot
- [ ] "Confirm Booking" button enabled
- [ ] Can go "Back" to previous steps
- [ ] Modal closes on success

#### History Page (`/customer/history`)
- [ ] Navigate via header "History" link
- [ ] Table shows 2 service records
- [ ] Records display:
  - Date, Service Type, Description
  - Service Center name
  - Mileage
  - Cost in ₹

### Functional Verification

#### Routing
- [ ] Direct URL navigation works:
  - `/customer` → redirects to `/customer/dashboard`
  - `/customer/dashboard` → loads dashboard
  - `/customer/complaints` → loads complaints
  - `/customer/appointments` → loads appointments
  - `/customer/history` → loads history
- [ ] Browser back/forward buttons work
- [ ] All navigation links work

#### Data Flow
- [ ] Dashboard loads vehicle data
- [ ] Switching vehicles (if multiple) updates data
- [ ] Predicted issues match vehicle
- [ ] Appointments filtered by vehicle

#### Interactions
- [ ] 3D car responds to mouse drag
- [ ] 3D car responds to scroll zoom
- [ ] Clicking car parts logs to console
- [ ] Chat input accepts text
- [ ] Chat sends on Enter key
- [ ] Chat sends on button click
- [ ] Forms validate required fields
- [ ] Form submission works
- [ ] Modal opens and closes
- [ ] Modal step navigation works

### Performance Verification

#### Loading States
- [ ] Components show loading spinners initially
- [ ] Skeleton/pulse animations for loading cards
- [ ] Chat shows typing indicator
- [ ] Form buttons show "Loading..." state

#### Error Handling
- [ ] No console errors in browser DevTools
- [ ] No TypeScript errors (check terminal)
- [ ] Empty states display when no data
- [ ] Error messages clear and helpful

### Browser Compatibility
Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

### Responsive Design
Test at different widths:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

---

## 🐛 Common Issues & Solutions

### Issue: Dependencies fail to install
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
**Solution**: Vite will automatically use next available port (3001, 3002, etc.)
Or manually specify:
```bash
npm run dev -- --port 3001
```

### Issue: TypeScript errors
**Check**:
- Node.js version is 18+ (`node --version`)
- All dependencies installed
- Restart VS Code
- Run `npm run build` to see detailed errors

### Issue: 3D car not rendering
**Check**:
- Browser supports WebGL (most modern browsers do)
- Try different browser
- Check browser console for errors

### Issue: Chat responses delayed
**Expected**: This is intentional (800ms mock delay to simulate real API)

### Issue: Styles not applying
**Solution**:
```bash
# Rebuild Tailwind
npm run dev
# Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
```

---

## 📊 Build Verification

### Production Build Test
```bash
npm run build
```

**Expected output**:
```
vite v5.2.0 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB │ gzip: XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB │ gzip: XX.XX kB
✓ built in XXXXms
```

### Preview Production Build
```bash
npm run preview
```

Navigate to displayed URL and verify same functionality.

---

## 📝 Development Workflow

### Recommended VS Code Extensions
When you open the project, VS Code should prompt to install recommended extensions:
- ESLint - Code linting
- Prettier - Code formatting
- Tailwind CSS IntelliSense - Tailwind autocomplete
- TypeScript - Enhanced TypeScript support

### Hot Module Replacement (HMR)
Changes to files should automatically update in browser without full refresh.

Test:
1. Open `src/components/customer/VehicleHealthCard.tsx`
2. Change text "Overall Health" to "Vehicle Health"
3. Save file
4. Browser should update instantly

### TypeScript Checking
Terminal shows TypeScript errors in real-time.
Fix any errors before committing.

---

## 🎯 Success Criteria

You've successfully set up the Customer Portal if:

✅ All verification checklist items pass
✅ No errors in browser console
✅ No errors in terminal
✅ All pages load and navigate correctly
✅ All interactive elements work
✅ Forms submit successfully
✅ Chat widget responds
✅ 3D car displays and responds to input
✅ Data displays correctly
✅ Loading and empty states work

---

## 🚀 Next Steps After Verification

1. **Explore the Code**
   - Check out component structure in `src/components/`
   - Review API layer in `src/lib/customerApi.ts`
   - Understand types in `src/lib/types/index.ts`

2. **Customize**
   - Modify mock data in `customerApi.ts`
   - Change colors in `tailwind.config.js`
   - Add/remove features as needed

3. **Connect Backend**
   - Update `.env` with real API URL
   - Replace mock functions with real API calls
   - Test with real data

4. **Deploy**
   - Build: `npm run build`
   - Deploy `dist/` folder to hosting service
   - Configure environment variables

---

**All set!** 🎉

Your Customer Portal is fully functional and ready for development or demonstration.
