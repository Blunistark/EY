import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, AlertTriangle, Building2 } from 'lucide-react';
import type { OEMRegionalSummary } from '@/lib/types';

interface OEMRegionalTableProps {
  regions: OEMRegionalSummary[];
  compact?: boolean;
}

export const OEMRegionalTable = ({ regions, compact = false }: OEMRegionalTableProps) => {
  const getIssuesBadge = (issues: number) => {
    if (issues > 100) return <span className="badge badge-danger">{issues}</span>;
    if (issues > 50) return <span className="badge badge-warning">{issues}</span>;
    return <span className="badge badge-success">{issues}</span>;
  };

  const displayRegions = compact ? regions.slice(0, 5) : regions;

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-oem-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oem-teal-500/20 to-oem-teal-600/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-oem-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Regional Overview</h2>
              <p className="text-sm text-oem-text-muted">Service demand by region</p>
            </div>
          </div>
        </div>
        {compact && (
          <Link
            to="/oem/service-centers"
            className="btn-ghost flex items-center gap-1 text-sm text-oem-teal-400 hover:text-oem-teal-300"
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
              <th className="table-header">Region</th>
              <th className="table-header text-right">Vehicles</th>
              <th className="table-header text-right">Active Issues</th>
              <th className="table-header text-right">Appointments</th>
            </tr>
          </thead>
          <tbody>
            {displayRegions.map((region, idx) => (
              <motion.tr
                key={region.region}
                className="table-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="table-cell">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <Building2 className="w-4 h-4 text-oem-text-muted" />
                    {region.region}
                  </div>
                </td>
                <td className="table-cell text-right">
                  <span className="text-oem-text-secondary font-mono">
                    {region.vehicles.toLocaleString()}
                  </span>
                </td>
                <td className="table-cell text-right">
                  {getIssuesBadge(region.activeIssues)}
                </td>
                <td className="table-cell text-right font-mono text-white">
                  {region.upcomingAppointments.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Stats Footer */}
      {compact && (
        <div className="px-6 py-3 border-t border-oem-border bg-oem-dark-gray/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-oem-text-muted">
            <AlertTriangle className="w-4 h-4 text-oem-amber-400" />
            <span>
              {regions.reduce((sum, r) => sum + r.activeIssues, 0)} total active issues
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
