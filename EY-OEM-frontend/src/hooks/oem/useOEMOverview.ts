import { useQuery } from '@tanstack/react-query';
import { getOEMOverview } from '@/lib/oemApi';
import type { OEMOverviewParams } from '@/lib/types';

export const useOEMOverview = (params?: OEMOverviewParams) => {
  return useQuery({
    queryKey: ['oemOverview', params],
    queryFn: () => getOEMOverview(params),
  });
};
