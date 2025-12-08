import { useNavigate } from 'react-router-dom';
import { useOEMServiceCenters } from '@/hooks/oem/useOEMServiceCenters';
import { motion } from 'framer-motion';
import { Loader2, Building2, MapPin, AlertCircle, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import type { Utilization } from '@/lib/types';

export const OEMServiceCentersPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useOEMServiceCenters();

  const getUtilizationBadge = (utilization: Utilization) => {
    if (utilization === 'High') return <span className="badge badge-danger">{utilization}</span>;
    if (utilization === 'Medium') return <span className="badge badge-warning">{utilization}</span>;
    return <span className="badge badge-success">{utilization}</span>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-oem-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-oem-text-muted">Loading service center data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-oem-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-oem-rose-400" />
          </div>
          <p className="text-oem-rose-400 text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-oem-text-muted text-sm">
            Unable to fetch service center data. Please try again later.
          </p>
          <button className="btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Summary stats
  const totalCenters = data.length;
  const totalVehiclesCovered = data.reduce((sum, c) => sum + c.vehiclesCovered, 0);
  const highUtilization = data.filter(c => c.utilization === 'High').length;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-oem-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Service Centers</h1>
              <p className="text-oem-text-muted">
                Monitor service center performance, utilization, and coverage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-blue-500/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-oem-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalCenters}</p>
            <p className="text-xs text-oem-text-muted">Total Centers</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-teal-500/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-oem-teal-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalVehiclesCovered.toLocaleString()}</p>
            <p className="text-xs text-oem-text-muted">Vehicles Covered</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-rose-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-oem-rose-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{highUtilization}</p>
            <p className="text-xs text-oem-text-muted">High Utilization</p>
          </div>
        </div>
      </div>

      {/* Service Centers Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-oem-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">All Service Centers</h2>
            <p className="text-sm text-oem-text-muted">Overview of service center locations and workload</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-oem-dark-gray/50">
                <th className="table-header">Service Center</th>
                <th className="table-header">Region</th>
                <th className="table-header text-right">Vehicles</th>
                <th className="table-header text-right">Issues</th>
                <th className="table-header text-right">Appointments</th>
                <th className="table-header text-center">Utilization</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((center, idx) => (
                <motion.tr
                  key={center.id}
                  className="table-row-clickable"
                  onClick={() => navigate(`/oem/service-center/${center.id}`)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-oem-blue-400" />
                      <span className="text-white font-medium">{center.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-oem-text-muted" />
                      <span className="text-oem-text-secondary">{center.region}</span>
                    </div>
                  </td>
                  <td className="table-cell text-right font-mono text-oem-text-secondary">
                    {center.vehiclesCovered.toLocaleString()}
                  </td>
                  <td className="table-cell text-right">
                    <span className={`font-mono font-semibold ${center.activeIssues > 50 ? 'text-oem-amber-400' : 'text-white'}`}>
                      {center.activeIssues.toLocaleString()}
                    </span>
                  </td>
                  <td className="table-cell text-right font-mono text-white">
                    {center.upcomingAppointments.toLocaleString()}
                  </td>
                  <td className="table-cell text-center">
                    {getUtilizationBadge(center.utilization)}
                  </td>
                  <td className="table-cell">
                    <ChevronRight className="w-5 h-5 text-oem-text-muted" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
