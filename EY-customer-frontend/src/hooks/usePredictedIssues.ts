import { useQuery } from '@tanstack/react-query';
import { getPredictedIssues } from '@/lib/customerApi';

export const usePredictedIssues = (vehicleId: string | undefined) => {
  return useQuery({
    queryKey: ['customer', 'predicted-issues', vehicleId],
    queryFn: () => getPredictedIssues(vehicleId!),
    enabled: !!vehicleId,
  });
};
