import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  onOpenChat?: () => void;
}

export const QuickActions = ({ onOpenChat }: QuickActionsProps) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'complaint',
      label: 'Raise Complaint',
      description: 'Report vehicle issues',
      icon: <AlertTriangle className="w-8 h-8" />,
      onClick: () => navigate('/customer/complaints'),
      gradient: 'from-tesla-red-600 to-red-500',
      glowColor: 'shadow-glow-red',
    },
    {
      id: 'appointments',
      label: 'Service Booking',
      description: 'Schedule maintenance',
      icon: <Calendar className="w-8 h-8" />,
      onClick: () => navigate('/customer/appointments'),
      gradient: 'from-tesla-blue-600 to-blue-500',
      glowColor: 'shadow-glow-blue',
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      description: 'Get instant help',
      icon: <MessageCircle className="w-8 h-8" />,
      onClick: () => onOpenChat?.(),
      gradient: 'from-purple-600 to-purple-500',
      glowColor: 'shadow-glow-blue',
    },
  ];

  return (
    <div className="glass-card p-8 rounded-3xl">
      <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={action.onClick}
            className={`glass-strong p-6 rounded-2xl group relative overflow-hidden transition-all duration-300 hover:${action.glowColor}`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' as const, stiffness: 200 }}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className={`mb-4 text-gray-400 group-hover:text-white transition-colors duration-300 bg-gradient-to-br ${action.gradient} p-3 rounded-xl w-fit`}>
                {action.icon}
              </div>

              {/* Text */}
              <h4 className="text-lg font-bold text-white mb-1 text-left">{action.label}</h4>
              <p className="text-sm text-gray-400 mb-4 text-left">{action.description}</p>

              {/* Arrow */}
              <div className="flex justify-end">
                <motion.div
                  className="text-tesla-blue-400"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
