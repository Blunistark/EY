import { useQuery } from '@tanstack/react-query';
import { getOEMServiceCenterDetail } from '@/lib/oemApi';

export const useOEMServiceCenterDetail = (id: string) => {
  return useQuery({
    queryKey: ['oemServiceCenterDetail', id],
    queryFn: () => getOEMServiceCenterDetail(id),
    enabled: !!id,
  });
};
