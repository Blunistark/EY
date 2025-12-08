import { motion } from 'framer-motion';
import { VehicleStatus } from '@/lib/types';
import { AlertTriangle, Activity, Calendar } from 'lucide-react';

interface VehicleHealthCardProps {
  vehicleStatus: VehicleStatus | undefined;
  vehicleName: string;
  registrationNumber: string;
  isLoading?: boolean;
}

export const VehicleHealthCard = ({
  vehicleStatus,
  isLoading,
}: VehicleHealthCardProps) => {
  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-tesla-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!vehicleStatus) {
    return (
      <div className="glass-card p-8 rounded-3xl">
        <div className="text-center text-gray-400 py-12">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Vehicle status unavailable</p>
        </div>
      </div>
    );
  }

  const healthPercentage = vehicleStatus.overallHealth;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (healthPercentage / 100) * circumference;

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-tesla-blue-400';
    if (health >= 40) return 'text-yellow-400';
    return 'text-tesla-red-400';
  };

  const getStrokeColor = (health: number) => {
    if (health >= 80) return '#10b981';
    if (health >= 60) return '#3b82f6';
    if (health >= 40) return '#eab308';
    return '#ef4444';
  };

  return (
    <motion.div
      className="glass-card p-8 rounded-3xl relative overflow-hidden group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring' as const, stiffness: 300 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-tesla-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Vehicle Health</h3>
          <p className="text-sm text-gray-400">Real-time diagnostic status</p>
        </div>

        {/* Circular Health Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Background circle */}
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="96"
                cy="96"
                r="90"
                stroke={getStrokeColor(healthPercentage)}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className={`text-6xl font-bold ${getHealthColor(healthPercentage)}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' as const, stiffness: 200 }}
                >
                  {healthPercentage}
                </motion.div>
                <div className="text-sm text-gray-400 font-light">Health Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Status Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <HealthIndicator
            icon={<Activity className="w-5 h-5" />}
            label="Engine"
            value={vehicleStatus.engineHealth}
            valueUnit="%"
            status={vehicleStatus.engineHealth > 80 ? 'good' : 'warning'}
          />
          <HealthIndicator
            icon={<Activity className="w-5 h-5" />}
            label="Battery"
            value={vehicleStatus.batteryHealth}
            valueUnit="%"
            status={vehicleStatus.batteryHealth > 80 ? 'good' : 'warning'}
          />
          <HealthIndicator
            icon={<Activity className="w-5 h-5" />}
            label="Brakes"
            value={vehicleStatus.brakeHealth}
            valueUnit="%"
            status={vehicleStatus.brakeHealth > 80 ? 'good' : 'warning'}
          />
          <HealthIndicator
            icon={<Activity className="w-5 h-5" />}
            label="Suspension"
            value={vehicleStatus.suspensionHealth}
            valueUnit="%"
            status={vehicleStatus.suspensionHealth > 80 ? 'good' : 'warning'}
          />
        </div>

        {/* Service Info */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <Calendar className="w-5 h-5 text-tesla-blue-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1">Last Service</div>
              <div className="text-white font-medium">
                {new Date(vehicleStatus.lastServiceDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1">Next Service Due</div>
              <div className="text-white font-medium">
                {new Date(vehicleStatus.nextRecommendedService).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HealthIndicator = ({
  icon,
  label,
  value,
  valueUnit,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  valueUnit: string;
  status: 'good' | 'warning' | 'critical';
}) => {
  const statusColors = {
    good: 'text-green-400',
    warning: 'text-yellow-400',
    critical: 'text-tesla-red-400',
  };

  return (
    <motion.div
      className="glass-strong p-4 rounded-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring' as const, stiffness: 400 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={statusColors[status]}>{icon}</div>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${statusColors[status]}`}>{value}</span>
        <span className="text-xs text-gray-500">{valueUnit}</span>
      </div>
    </motion.div>
  );
};
