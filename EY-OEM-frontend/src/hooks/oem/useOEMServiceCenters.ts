import { useQuery } from '@tanstack/react-query';
import { getOEMServiceCenters } from '@/lib/oemApi';
import type { OEMServiceCentersParams } from '@/lib/types';

export const useOEMServiceCenters = (params?: OEMServiceCentersParams) => {
  return useQuery({
    queryKey: ['oemServiceCenters', params],
    queryFn: () => getOEMServiceCenters(params),
  });
};
