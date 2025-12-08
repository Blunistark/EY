import { useQuery } from '@tanstack/react-query';
import { getCustomerVehicles } from '@/lib/customerApi';

export const useCustomerVehicles = () => {
  return useQuery({
    queryKey: ['customer', 'vehicles'],
    queryFn: getCustomerVehicles,
  });
};
