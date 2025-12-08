import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { CustomerRoutes } from './routes/customer/CustomerRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/customer" replace />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
