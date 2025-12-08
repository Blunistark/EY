import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '@/components/layout/CustomerLayout';
import { DashboardPage } from './DashboardPage';
import { ComplaintsPage } from './ComplaintsPage';
import { AppointmentsPage } from './AppointmentsPage';
import { HistoryPage } from './HistoryPage';

export const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
};
