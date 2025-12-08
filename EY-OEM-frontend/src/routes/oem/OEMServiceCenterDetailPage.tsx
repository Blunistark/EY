import { useParams, Link } from 'react-router-dom';
import { useOEMServiceCenterDetail } from '@/hooks/oem/useOEMServiceCenterDetail';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, MapPin, Building2, TrendingUp, Package, AlertCircle, Gauge } from 'lucide-react';

export const OEMServiceCenterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useOEMServiceCenterDetail(id || '');

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

  if (error || !data) {
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

  const getLoadBadge = (load: number) => {
    if (load > 85) return <span className="badge badge-danger">{load}%</span>;
    if (load > 70) return <span className="badge badge-warning">{load}%</span>;
    return <span className="badge badge-success">{load}%</span>;
  };

  const getLoadColor = (load: number) => {
    if (load > 85) return 'text-oem-rose-400';
    if (load > 70) return 'text-oem-amber-400';
    return 'text-oem-emerald-400';
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <Link to="/oem/service-centers">
        <motion.div
          className="inline-flex items-center gap-2 text-oem-blue-400 hover:text-oem-blue-300 transition-colors"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Service Centers</span>
        </motion.div>
      </Link>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-oem-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{data.name}</h1>
              <div className="flex items-center gap-4 text-oem-text-muted mt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{data.region} Region</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-teal"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-oem-teal-400" />
            </div>
            {getLoadBadge(data.currentLoad)}
          </div>
          <h3 className={`text-4xl font-bold ${getLoadColor(data.currentLoad)}`}>
            {data.currentLoad}%
          </h3>
          <p className="text-sm text-oem-text-muted mt-1">Current Load</p>
          <p className="text-xs text-oem-text-secondary mt-1">Current capacity utilization</p>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-blue"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-blue-600/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-oem-blue-400" />
            </div>
            {getLoadBadge(data.upcomingLoad)}
          </div>
          <h3 className={`text-4xl font-bold ${getLoadColor(data.upcomingLoad)}`}>
            {data.upcomingLoad}%
          </h3>
          <p className="text-sm text-oem-text-muted mt-1">Upcoming Load</p>
          <p className="text-xs text-oem-text-secondary mt-1">Forecasted for next 7 days</p>
        </motion.div>
      </div>

      {/* Common Issues */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-amber-500/20 to-oem-amber-600/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-oem-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Common Issues Handled</h2>
            <p className="text-sm text-oem-text-muted">Most frequent service requests at this center</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.commonIssues.map((issue, idx) => (
              <motion.div
                key={idx}
                className="bg-oem-dark-gray border border-oem-border/50 px-4 py-3 rounded-xl flex items-center gap-3 hover:border-oem-amber-500/30 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Package className="w-4 h-4 text-oem-amber-400" />
                <span className="text-white font-medium">{issue}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Models Serviced */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-violet-500/20 to-oem-violet-600/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-oem-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Models Serviced</h2>
            <p className="text-sm text-oem-text-muted">Most frequently serviced vehicle models</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-oem-dark-gray/50">
                <th className="table-header">Model</th>
                <th className="table-header text-right">Service Count</th>
                <th className="table-header">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.modelsServiced.map((model, idx) => {
                const total = data.modelsServiced.reduce((sum, m) => sum + m.count, 0);
                const percentage = ((model.count / total) * 100).toFixed(1);

                return (
                  <motion.tr
                    key={idx}
                    className="table-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="table-cell">
                      <span className="text-white font-medium">{model.modelName}</span>
                    </td>
                    <td className="table-cell text-right font-mono text-oem-text-secondary">
                      {model.count.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-oem-light-gray rounded-full h-2 max-w-[200px]">
                          <div
                            className="bg-oem-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold min-w-[3rem]">
                          {percentage}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
