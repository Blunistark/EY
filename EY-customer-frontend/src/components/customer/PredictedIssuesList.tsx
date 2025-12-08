import { motion } from 'framer-motion';
import { PredictedIssue } from '@/lib/types';
import { AlertCircle, TrendingUp, Clock, DollarSign, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react';

interface PredictedIssuesListProps {
  issues: PredictedIssue[] | undefined;
  isLoading?: boolean;
  onAskAI?: (issueId: string) => void;
  onBookService?: (issueId: string) => void;
}

export const PredictedIssuesList = ({
  issues,
  isLoading,
  onAskAI,
  onBookService,
}: PredictedIssuesListProps) => {
  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-tesla-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="glass-card p-8 rounded-3xl">
        <h3 className="text-2xl font-bold text-white mb-6">Predicted Issues</h3>
        <div className="text-center py-12">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          <p className="text-xl text-white font-semibold mb-2">All Clear!</p>
          <p className="text-gray-400">No predicted issues at this time</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          bg: 'from-tesla-red-600 to-red-600',
          text: 'text-tesla-red-400',
          border: 'border-tesla-red-500/50',
          glow: 'shadow-glow-red',
        };
      case 'High':
        return {
          bg: 'from-orange-600 to-red-500',
          text: 'text-orange-400',
          border: 'border-orange-500/50',
          glow: 'shadow-glow-red',
        };
      case 'Medium':
        return {
          bg: 'from-yellow-600 to-orange-500',
          text: 'text-yellow-400',
          border: 'border-yellow-500/50',
          glow: 'shadow-glass',
        };
      case 'Low':
        return {
          bg: 'from-green-600 to-emerald-500',
          text: 'text-green-400',
          border: 'border-green-500/50',
          glow: 'shadow-glass',
        };
      default:
        return {
          bg: 'from-gray-600 to-gray-500',
          text: 'text-gray-400',
          border: 'border-gray-500/50',
          glow: 'shadow-glass',
        };
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Predicted Issues</h3>
        <motion.div
          className="glass-strong px-4 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring' as const, stiffness: 400 }}
        >
          <span className="text-tesla-blue-400 font-semibold">
            {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'}
          </span>
        </motion.div>
      </div>

      {/* Horizontal scrollable cards */}
      <div className="overflow-x-auto pb-4 -mx-2 px-2">
        <div className="flex gap-6 min-w-max">
          {issues.map((issue, index) => {
            const colors = getSeverityColor(issue.severity);
            return (
              <motion.div
                key={issue.id}
                className={`glass-strong border ${colors.border} rounded-2xl p-6 w-[380px] flex-shrink-0 hover:${colors.glow} transition-all duration-300 group`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: 'spring' as const, stiffness: 200 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Severity badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colors.bg} bg-opacity-20`}>
                    <span className="text-sm font-bold text-white">{issue.severity}</span>
                  </div>
                  <AlertCircle className={`w-6 h-6 ${colors.text}`} />
                </div>

                {/* Component name */}
                <h4 className="text-xl font-bold text-white mb-2">{issue.componentName}</h4>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{issue.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-tesla-blue-400" />
                    <div>
                      <div className="text-xs text-gray-500">Probability</div>
                      <div className="text-sm font-bold text-white">{issue.probability}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-tesla-blue-400" />
                    <div>
                      <div className="text-xs text-gray-500">Timeline</div>
                      <div className="text-sm font-bold text-white">{issue.recommendedServiceWindow}</div>
                    </div>
                  </div>
                </div>

                {/* Cost */}
                {issue.estimatedCost && issue.estimatedCost > 0 && (
                  <div className="glass-strong p-3 rounded-xl mb-6 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Est. Cost:</span>
                    <span className="text-lg font-bold text-white ml-auto">₹{issue.estimatedCost.toLocaleString()}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => onAskAI?.(issue.id)}
                    className="flex-1 glass-strong px-4 py-3 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask AI
                  </motion.button>
                  <motion.button
                    onClick={() => onBookService?.(issue.id)}
                    className="flex-1 bg-gradient-to-r from-tesla-blue-600 to-blue-600 px-4 py-3 rounded-xl text-sm font-bold text-white shadow-glow-blue hover:shadow-glow-blue/50 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      {issues.length > 1 && (
        <motion.div
          className="text-center mt-4 text-sm text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ← Scroll to see more issues →
        </motion.div>
      )}
    </div>
  );
};
