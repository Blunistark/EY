# 🎨 Tesla UI Quick Reference

## Component Class Cheatsheet

### 🔷 Glass Effects
```tsx
className="glass"           // 5% white, 20px blur
className="glass-strong"    // 10% white, 30px blur  
className="glass-card"      // Glass + padding + rounded-3xl
```

### 🎯 Buttons
```tsx
// Primary Button (Tesla Blue)
className="bg-gradient-to-r from-tesla-blue-600 to-blue-600 px-6 py-3 rounded-xl text-white shadow-glow-blue hover:shadow-glow-blue/50"

// Secondary Button (Glass)
className="glass-strong px-6 py-3 rounded-xl text-white hover:bg-white/10"

// Danger Button (Tesla Red)
className="bg-gradient-to-r from-tesla-red-600 to-red-600 px-6 py-3 rounded-xl text-white shadow-glow-red"
```

### 📝 Text Styles
```tsx
// Heading
className="text-2xl font-bold text-white"

// Gradient Text
className="gradient-text"  // Blue-to-cyan gradient

// Body
className="text-gray-400"

// Subtitle
className="text-sm text-gray-500"
```

### 📦 Cards
```tsx
// Main Card
className="glass-card p-8 rounded-3xl"

// Sub Card
className="glass-strong p-4 rounded-xl"

// Bordered Card
className="glass-strong border border-white/10 rounded-2xl p-6"
```

### 🎭 Animations (Framer Motion)

#### Basic Hover
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
```

#### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

#### Stagger Children
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 200 }
  }
};
```

### 🎨 Color Reference

#### Tesla Blue Variants
```tsx
text-tesla-blue-400   // Lighter blue for text
text-tesla-blue-500   // Standard blue
bg-tesla-blue-600     // Dark blue for backgrounds
from-tesla-blue-600   // Gradient start
```

#### Tesla Red Variants
```tsx
text-tesla-red-400    // Lighter red for warnings
text-tesla-red-500    // Standard red
bg-tesla-red-600      // Dark red for backgrounds
from-tesla-red-600    // Gradient start
```

#### Status Colors
```tsx
text-green-400        // Success
text-yellow-400       // Warning
text-gray-400         // Muted text
text-white            // Primary text
```

### 💡 Shadows & Glows
```tsx
shadow-glass          // Standard card shadow
shadow-glow-blue      // Tesla blue glow
shadow-glow-red       // Tesla red glow
shadow-inner-glow     // Inner glow effect
```

### 🎯 Icon Sizes (Lucide React)
```tsx
<Icon className="w-4 h-4" />   // Small (16px)
<Icon className="w-5 h-5" />   // Medium (20px)
<Icon className="w-6 h-6" />   // Large (24px)
<Icon className="w-8 h-8" />   // XL (32px)
```

### 📐 Spacing System
```tsx
gap-2    // 8px
gap-4    // 16px
gap-6    // 24px
gap-8    // 32px

p-4      // 16px padding
p-6      // 24px padding
p-8      // 32px padding

mb-4     // 16px margin bottom
mb-6     // 24px margin bottom
mb-8     // 32px margin bottom
```

### 🎪 Component Patterns

#### Glassmorphic Card with Hover
```tsx
<motion.div
  className="glass-card p-8 rounded-3xl hover:shadow-glow-blue"
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  <h3 className="text-2xl font-bold text-white mb-4">Title</h3>
  <p className="text-gray-400">Description</p>
</motion.div>
```

#### Stat Display
```tsx
<div className="glass-strong p-4 rounded-xl">
  <div className="text-sm text-gray-400 mb-1">Label</div>
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold text-tesla-blue-400">85</span>
    <span className="text-sm text-gray-500">%</span>
  </div>
</div>
```

#### Action Button Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <motion.button
    className="glass-strong p-6 rounded-2xl hover:shadow-glow-blue"
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-8 h-8 text-tesla-blue-400 mb-2" />
    <h4 className="text-lg font-bold text-white">Action</h4>
    <p className="text-sm text-gray-400">Description</p>
  </motion.button>
</div>
```

### 🌊 Animated Background Orbs
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-0 right-1/4 w-96 h-96 bg-tesla-blue-500 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow" />
  <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-tesla-red-500 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
</div>
```

### 🔄 Loading Spinner
```tsx
<div className="w-16 h-16 border-4 border-tesla-blue-500 border-t-transparent rounded-full animate-spin" />
```

### 📱 Responsive Grid
```tsx
// Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Mobile: 1 col, Desktop: 2 cols
className="grid grid-cols-1 lg:grid-cols-2 gap-6"
```

### 🎨 Gradient Text
```tsx
<span className="gradient-text">
  Tesla Style
</span>
```

### 🌟 Premium Badge
```tsx
<div className="glass-strong px-4 py-2 rounded-full">
  <span className="text-tesla-blue-400 font-semibold">Premium</span>
</div>
```

---

## 🎯 Common Use Cases

### Success State
```tsx
<div className="glass-card p-8 rounded-3xl">
  <CheckCircle2 className="w-10 h-10 text-green-400 mb-4" />
  <h3 className="text-xl font-bold text-white">Success!</h3>
  <p className="text-gray-400">Operation completed</p>
</div>
```

### Error State
```tsx
<div className="glass-strong border border-tesla-red-500/50 p-6 rounded-2xl">
  <AlertCircle className="w-8 h-8 text-tesla-red-400 mb-2" />
  <h4 className="text-lg font-bold text-white">Error</h4>
  <p className="text-sm text-gray-400">Something went wrong</p>
</div>
```

### Info Badge
```tsx
<div className="inline-flex items-center gap-2 glass-strong px-3 py-1.5 rounded-full">
  <Info className="w-4 h-4 text-tesla-blue-400" />
  <span className="text-sm text-white">Info text</span>
</div>
```

---

## 🚀 Quick Tips

1. **Always use `type: 'spring' as const`** in Framer Motion transitions for TypeScript
2. **Prefer `glass-card` for outer containers**, `glass-strong` for inner elements
3. **Use Tesla blue for primary actions**, Tesla red for critical/destructive
4. **Add hover effects** on all interactive elements
5. **Keep text white/gray-400** on dark backgrounds
6. **Use 3xl/2xl/xl border-radius** for modern look
7. **Animate on mount** with initial/animate props
8. **Add subtle glows** on focus/hover states

---

**Run**: `npm run dev` → http://localhost:3000/customer/dashboard
