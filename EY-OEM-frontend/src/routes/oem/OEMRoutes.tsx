import { Routes, Route, Navigate } from 'react-router-dom';
import { OEMLayout } from '@/components/layout/OEMLayout';
import { OEMDashboardPage } from './OEMDashboardPage';
import { OEMModelsPage } from './OEMModelsPage';
import { OEMModelDetailPage } from './OEMModelDetailPage';
import { OEMServiceCentersPage } from './OEMServiceCentersPage';
import { OEMServiceCenterDetailPage } from './OEMServiceCenterDetailPage';

export const OEMRoutes = () => {
  return (
    <OEMLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/oem/dashboard" replace />} />
        <Route path="/dashboard" element={<OEMDashboardPage />} />
        <Route path="/models" element={<OEMModelsPage />} />
        <Route path="/model/:modelId" element={<OEMModelDetailPage />} />
        <Route path="/service-centers" element={<OEMServiceCentersPage />} />
        <Route path="/service-center/:id" element={<OEMServiceCenterDetailPage />} />
      </Routes>
    </OEMLayout>
  );
};
