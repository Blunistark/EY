import { useQuery } from '@tanstack/react-query';
import { getCustomerAppointments } from '@/lib/customerApi';

export const useCustomerAppointments = (vehicleId: string | undefined) => {
  return useQuery({
    queryKey: ['customer', 'appointments', vehicleId],
    queryFn: () => getCustomerAppointments(vehicleId!),
    enabled: !!vehicleId,
  });
};
