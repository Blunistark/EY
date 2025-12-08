import { useQuery } from '@tanstack/react-query';
import { getOEMModels } from '@/lib/oemApi';
import type { OEMModelsParams } from '@/lib/types';

export const useOEMModels = (params?: OEMModelsParams) => {
  return useQuery({
    queryKey: ['oemModels', params],
    queryFn: () => getOEMModels(params),
  });
};
