import { motion } from 'framer-motion';
import { Loader2, BarChart3, TrendingUp, MapPin } from 'lucide-react';
import { useOEMOverview } from '@/hooks/oem/useOEMOverview';
import { OEMKPISection, OEMStatsRow } from '@/components/oem/OEMKPISection';
import { OEMModelTable } from '@/components/oem/OEMModelTable';
import { OEMRegionalTable } from '@/components/oem/OEMRegionalTable';

export const OEMDashboardPage = () => {
  const { data, isLoading, error } = useOEMOverview();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-oem-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-oem-text-muted">Loading fleet data...</p>
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
            Unable to fetch fleet performance metrics. Please try again later.
          </p>
          <button className="btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oem-blue-500/20 to-oem-teal-500/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-oem-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Fleet Control Dashboard</h1>
              <p className="text-oem-text-muted">
                Monitor vehicle health, regional performance, and service demand across your fleet
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-oem-text-muted" />
          <span className="text-oem-text-muted">Last updated:</span>
          <span className="text-white font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* KPI Section */}
      <OEMKPISection
        totalVehicles={data.totalVehicles}
        vehiclesWithActiveIssues={data.vehiclesWithActiveIssues}
        highSeverityCases={data.highSeverityCases}
        forecastedServiceDemand={data.forecastedServiceDemand7Days}
      />

      {/* Stats Row */}
      <OEMStatsRow
        avgResponseTime={2.4}
        serviceCapacity={78}
        customerSatisfaction={94}
      />

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance Table */}
        <OEMModelTable models={data.modelSummary} compact />

        {/* Regional Overview Table */}
        <OEMRegionalTable regions={data.regionalSummary} compact />
      </div>

      {/* Quick Insights Section */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-oem-border">
          <h2 className="text-lg font-bold text-white">Fleet Insights</h2>
          <p className="text-sm text-oem-text-muted mt-1">
            AI-generated insights based on current fleet data
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              className="p-4 rounded-xl bg-oem-dark-gray border border-oem-border/50 hover:border-oem-blue-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-warning">Trending</span>
              </div>
              <p className="text-sm text-white font-medium">Battery issues up 12% in Northern region</p>
              <p className="text-xs text-oem-text-muted mt-1">Recommend preventive maintenance campaign</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-oem-dark-gray border border-oem-border/50 hover:border-oem-teal-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">Improving</span>
              </div>
              <p className="text-sm text-white font-medium">Model X repair times reduced by 18%</p>
              <p className="text-xs text-oem-text-muted mt-1">New training program showing results</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-oem-dark-gray border border-oem-border/50 hover:border-oem-violet-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-info">Forecast</span>
              </div>
              <p className="text-sm text-white font-medium">26% demand spike expected next week</p>
              <p className="text-xs text-oem-text-muted mt-1">Consider staffing adjustments in South</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
