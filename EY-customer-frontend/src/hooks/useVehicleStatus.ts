import { useQuery } from '@tanstack/react-query';
import { getVehicleStatus } from '@/lib/customerApi';

export const useVehicleStatus = (vehicleId: string | undefined) => {
  return useQuery({
    queryKey: ['customer', 'vehicle-status', vehicleId],
    queryFn: () => getVehicleStatus(vehicleId!),
    enabled: !!vehicleId,
  });
};
