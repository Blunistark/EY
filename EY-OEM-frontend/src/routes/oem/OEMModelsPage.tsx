import { motion } from 'framer-motion';
import { useOEMModels } from '@/hooks/oem/useOEMModels';
import { OEMModelTable } from '@/components/oem/OEMModelTable';
import { Loader2, Car, TrendingUp, AlertTriangle } from 'lucide-react';

export const OEMModelsPage = () => {
  const { data, isLoading, error } = useOEMModels();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-oem-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-oem-text-muted">Loading model data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-oem-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-oem-rose-400" />
          </div>
          <p className="text-oem-rose-400 text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-oem-text-muted text-sm">
            Unable to fetch model performance data. Please try again later.
          </p>
          <button className="btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate summary stats
  const totalVehicles = data.reduce((sum, m) => sum + m.vehicles, 0);
  const avgFailureRate = (data.reduce((sum, m) => sum + m.failureRate, 0) / data.length) * 100;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-blue-600/10 flex items-center justify-center">
              <Car className="w-6 h-6 text-oem-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Vehicle Models</h1>
              <p className="text-oem-text-muted">
                Detailed performance metrics and issue tracking for all vehicle models
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-blue-500/20 flex items-center justify-center">
            <Car className="w-5 h-5 text-oem-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{data.length}</p>
            <p className="text-xs text-oem-text-muted">Total Models</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-teal-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-oem-teal-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalVehicles.toLocaleString()}</p>
            <p className="text-xs text-oem-text-muted">Total Vehicles</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-oem-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-oem-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{avgFailureRate.toFixed(1)}%</p>
            <p className="text-xs text-oem-text-muted">Avg Failure Rate</p>
          </div>
        </div>
      </div>

      {/* Models Table */}
      <OEMModelTable models={data} />
    </motion.div>
  );
};
