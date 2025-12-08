import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, ArrowRight, Car } from 'lucide-react';
import type { OEMModelSummary, Trend } from '@/lib/types';

interface OEMModelTableProps {
  models: OEMModelSummary[];
  compact?: boolean;
}

export const OEMModelTable = ({ models, compact = false }: OEMModelTableProps) => {
  const getTrendIcon = (trend: Trend) => {
    switch (trend) {
      case 'INCREASING':
        return <TrendingUp className="w-4 h-4 text-oem-rose-400" />;
      case 'DECREASING':
        return <TrendingDown className="w-4 h-4 text-oem-emerald-400" />;
      default:
        return <Minus className="w-4 h-4 text-oem-text-muted" />;
    }
  };

  const getTrendBadge = (trend: Trend) => {
    switch (trend) {
      case 'INCREASING':
        return <span className="badge badge-danger">Rising</span>;
      case 'DECREASING':
        return <span className="badge badge-success">Improving</span>;
      default:
        return <span className="badge badge-neutral">Stable</span>;
    }
  };

  const getFailureRateBadge = (rate: number) => {
    const ratePercent = rate * 100;
    if (ratePercent > 5) return <span className="badge badge-danger">{ratePercent.toFixed(1)}%</span>;
    if (ratePercent > 2) return <span className="badge badge-warning">{ratePercent.toFixed(1)}%</span>;
    return <span className="badge badge-success">{ratePercent.toFixed(1)}%</span>;
  };

  const displayModels = compact ? models.slice(0, 5) : models;

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-oem-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-blue-600/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-oem-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Model Performance</h2>
              <p className="text-sm text-oem-text-muted">Issues and failure rates by model</p>
            </div>
          </div>
        </div>
        {compact && (
          <Link
            to="/oem/models"
            className="btn-ghost flex items-center gap-1 text-sm text-oem-blue-400 hover:text-oem-blue-300"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-oem-dark-gray/50">
              <th className="table-header">Model</th>
              <th className="table-header text-right">Vehicles</th>
              <th className="table-header text-right">Active Issues</th>
              <th className="table-header text-right">Failure Rate</th>
              <th className="table-header text-center">Trend</th>
            </tr>
          </thead>
          <tbody>
            {displayModels.map((model, idx) => (
              <motion.tr
                key={model.modelId}
                className="table-row-clickable"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="table-cell">
                  <Link
                    to={`/oem/model/${model.modelId}`}
                    className="font-medium text-white hover:text-oem-blue-400 transition-colors"
                  >
                    {model.modelName}
                  </Link>
                </td>
                <td className="table-cell text-right">
                  <span className="text-oem-text-secondary font-mono">
                    {model.vehicles.toLocaleString()}
                  </span>
                </td>
                <td className="table-cell text-right">
                  <span className={`font-mono font-semibold ${model.activeIssues > 100 ? 'text-oem-amber-400' : 'text-white'}`}>
                    {model.activeIssues.toLocaleString()}
                  </span>
                </td>
                <td className="table-cell text-right">
                  {getFailureRateBadge(model.failureRate)}
                </td>
                <td className="table-cell">
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(model.trend)}
                    {getTrendBadge(model.trend)}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!compact && models.length > 10 && (
        <div className="px-6 py-3 border-t border-oem-border bg-oem-dark-gray/30">
          <p className="text-sm text-oem-text-muted">
            Showing {displayModels.length} of {models.length} models
          </p>
        </div>
      )}
    </div>
  );
};
