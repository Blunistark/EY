import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Gauge, Calendar, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  glowColor?: 'blue' | 'teal' | 'amber' | 'rose' | 'emerald' | 'violet';
}

const KPICard = ({
  title,
  value,
  subtitle,
  change,
  trend,
  icon: Icon,
  iconColor = 'text-oem-blue-400',
  glowColor = 'blue'
}: KPICardProps) => {
  const getTrendColor = () => {
    if (!trend) return 'text-oem-text-muted';
    if (trend === 'up') return 'text-oem-rose-400';
    if (trend === 'down') return 'text-oem-emerald-400';
    return 'text-oem-text-muted';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const getGlowClass = () => {
    const glowMap = {
      blue: 'hover:shadow-glow-blue',
      teal: 'hover:shadow-glow-teal',
      amber: 'hover:shadow-glow-amber',
      rose: 'hover:shadow-glow-rose',
      emerald: 'hover:shadow-glow-emerald',
      violet: 'hover:shadow-glow-violet',
    };
    return glowMap[glowColor];
  };

  const getIconBgColor = () => {
    const bgMap = {
      blue: 'from-oem-blue-500/20 to-oem-blue-600/10',
      teal: 'from-oem-teal-500/20 to-oem-teal-600/10',
      amber: 'from-oem-amber-500/20 to-oem-amber-600/10',
      rose: 'from-oem-rose-500/20 to-oem-rose-600/10',
      emerald: 'from-oem-emerald-500/20 to-oem-emerald-600/10',
      violet: 'from-oem-violet-500/20 to-oem-violet-600/10',
    };
    return bgMap[glowColor];
  };

  return (
    <motion.div
      className={`glass-card p-6 rounded-2xl card-hover ${getGlowClass()}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getIconBgColor()} flex items-center justify-center ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-white tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-sm text-oem-text-muted">{title}</p>
        {subtitle && (
          <p className="text-xs text-oem-text-secondary mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

interface OEMKPISectionProps {
  totalVehicles: number;
  vehiclesWithActiveIssues: number;
  highSeverityCases: number;
  forecastedServiceDemand: number;
}

export const OEMKPISection = ({
  totalVehicles,
  vehiclesWithActiveIssues,
  highSeverityCases,
  forecastedServiceDemand,
}: OEMKPISectionProps) => {
  const issueRate = ((vehiclesWithActiveIssues / totalVehicles) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <KPICard
        title="Total Vehicles Monitored"
        value={totalVehicles}
        subtitle="Active fleet across all regions"
        icon={Activity}
        iconColor="text-oem-blue-400"
        glowColor="blue"
      />
      <KPICard
        title="Vehicles with Active Issues"
        value={vehiclesWithActiveIssues}
        subtitle={`${issueRate}% of total fleet`}
        change="+3.2%"
        trend="up"
        icon={AlertTriangle}
        iconColor="text-oem-amber-400"
        glowColor="amber"
      />
      <KPICard
        title="High Severity Cases"
        value={highSeverityCases}
        subtitle="Requiring immediate attention"
        change="-1.8%"
        trend="down"
        icon={Gauge}
        iconColor="text-oem-rose-400"
        glowColor="rose"
      />
      <KPICard
        title="Forecasted Demand (7 Days)"
        value={forecastedServiceDemand}
        subtitle="Expected service appointments"
        change="+5.4%"
        trend="up"
        icon={Calendar}
        iconColor="text-oem-teal-400"
        glowColor="teal"
      />
    </div>
  );
};

// Additional Stats Row Component for summary metrics
interface StatsRowProps {
  avgResponseTime: number;
  serviceCapacity: number;
  customerSatisfaction: number;
}

export const OEMStatsRow = ({ avgResponseTime, serviceCapacity, customerSatisfaction }: StatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-oem-violet-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-oem-violet-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{avgResponseTime}h</p>
          <p className="text-xs text-oem-text-muted">Avg Response Time</p>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-oem-teal-500/20 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-oem-teal-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{serviceCapacity}%</p>
          <p className="text-xs text-oem-text-muted">Service Capacity</p>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-oem-emerald-500/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-oem-emerald-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{customerSatisfaction}%</p>
          <p className="text-xs text-oem-text-muted">Customer Satisfaction</p>
        </div>
      </div>
    </div>
  );
};
