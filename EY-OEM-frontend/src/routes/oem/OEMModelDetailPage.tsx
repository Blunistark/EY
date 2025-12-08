import { useParams, Link } from 'react-router-dom';
import { useOEMModelPerformance } from '@/hooks/oem/useOEMModelPerformance';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, AlertTriangle, MapPin, Car, Activity, Gauge, BarChart3 } from 'lucide-react';

export const OEMModelDetailPage = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { data, isLoading, error } = useOEMModelPerformance(modelId || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-oem-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-oem-text-muted">Loading model analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-oem-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-oem-rose-400" />
          </div>
          <p className="text-oem-rose-400 text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-oem-text-muted text-sm">
            Unable to fetch model data. Please try again later.
          </p>
          <button className="btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  const getFailureRateBadge = (rate: number) => {
    if (rate > 7) return <span className="badge badge-danger">{(rate).toFixed(1)}%</span>;
    if (rate > 5) return <span className="badge badge-warning">{(rate).toFixed(1)}%</span>;
    return <span className="badge badge-success">{(rate).toFixed(1)}%</span>;
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <Link to="/oem/models">
        <motion.div
          className="inline-flex items-center gap-2 text-oem-blue-400 hover:text-oem-blue-300 transition-colors"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Models</span>
        </motion.div>
      </Link>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-teal-500/20 flex items-center justify-center">
              <Car className="w-6 h-6 text-oem-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{data.modelName}</h1>
              <p className="text-oem-text-muted">
                Detailed analytics and component breakdown
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getFailureRateBadge(data.failureRate * 100)}
          <span className="text-oem-text-muted text-sm">Overall Failure Rate</span>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-blue"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-blue-600/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-oem-blue-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">{data.totalVehicles.toLocaleString()}</h3>
          <p className="text-sm text-oem-text-muted">Total Vehicles</p>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-amber"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-amber-500/20 to-oem-amber-600/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-oem-amber-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">{data.activeIssues.toLocaleString()}</h3>
          <p className="text-sm text-oem-text-muted">Active Issues</p>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-teal"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-oem-teal-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">{(data.failureRate * 100).toFixed(1)}%</h3>
          <p className="text-sm text-oem-text-muted">Failure Rate</p>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl card-hover hover:shadow-glow-rose"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-rose-500/20 to-oem-rose-600/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-oem-rose-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-oem-rose-400">{data.highSeverityCount}</h3>
          <p className="text-sm text-oem-text-muted">High Severity Cases</p>
        </motion.div>
      </div>

      {/* Component Breakdown */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-violet-500/20 to-oem-violet-600/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-oem-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Component Breakdown</h2>
            <p className="text-sm text-oem-text-muted">Most common failure points and severity distribution</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-oem-dark-gray/50">
                <th className="table-header">Component</th>
                <th className="table-header text-right">Incidents</th>
                <th className="table-header text-right">Failure %</th>
                <th className="table-header text-center">Low</th>
                <th className="table-header text-center">Medium</th>
                <th className="table-header text-center">High</th>
              </tr>
            </thead>
            <tbody>
              {data.componentBreakdown.map((component, idx) => (
                <motion.tr
                  key={component.component}
                  className="table-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-oem-amber-400" />
                      <span className="text-white font-medium">{component.component}</span>
                    </div>
                  </td>
                  <td className="table-cell text-right font-mono">{component.incidents}</td>
                  <td className="table-cell text-right">
                    {component.failurePercentage > 30
                      ? <span className="badge badge-danger">{component.failurePercentage.toFixed(1)}%</span>
                      : component.failurePercentage > 15
                        ? <span className="badge badge-warning">{component.failurePercentage.toFixed(1)}%</span>
                        : <span className="badge badge-success">{component.failurePercentage.toFixed(1)}%</span>
                    }
                  </td>
                  <td className="table-cell text-center">
                    <span className="text-oem-emerald-400 font-mono">{component.severityDistribution.LOW}%</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="text-oem-amber-400 font-mono">{component.severityDistribution.MEDIUM}%</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="text-oem-rose-400 font-mono">{component.severityDistribution.HIGH}%</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-oem-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Regional Distribution</h2>
            <p className="text-sm text-oem-text-muted">Geographic analysis of issues by region</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-oem-dark-gray/50">
                <th className="table-header">Region</th>
                <th className="table-header text-right">Vehicles</th>
                <th className="table-header text-right">Issues</th>
                <th className="table-header text-center">High Severity</th>
                <th className="table-header text-right">Issue Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.regionalBreakdown.map((region, idx) => {
                const issueRate = (region.issues / region.vehicles) * 100;

                return (
                  <motion.tr
                    key={region.region}
                    className="table-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-oem-blue-400" />
                        <span className="text-white font-medium">{region.region}</span>
                      </div>
                    </td>
                    <td className="table-cell text-right font-mono text-oem-text-secondary">
                      {region.vehicles.toLocaleString()}
                    </td>
                    <td className="table-cell text-right font-mono">
                      {region.issues.toLocaleString()}
                    </td>
                    <td className="table-cell text-center">
                      {region.highSeverity > 10
                        ? <span className="text-oem-rose-400 font-semibold">{region.highSeverity}</span>
                        : <span className="text-oem-text-secondary">{region.highSeverity}</span>
                      }
                    </td>
                    <td className="table-cell text-right">
                      {issueRate > 10
                        ? <span className="badge badge-danger">{issueRate.toFixed(1)}%</span>
                        : issueRate > 7
                          ? <span className="badge badge-warning">{issueRate.toFixed(1)}%</span>
                          : <span className="badge badge-success">{issueRate.toFixed(1)}%</span>
                      }
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
