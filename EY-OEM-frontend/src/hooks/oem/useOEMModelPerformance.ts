import { useQuery } from '@tanstack/react-query';
import { getOEMModelPerformance } from '@/lib/oemApi';

export const useOEMModelPerformance = (modelId: string) => {
  return useQuery({
    queryKey: ['oemModelPerformance', modelId],
    queryFn: () => getOEMModelPerformance(modelId),
    enabled: !!modelId,
  });
};
