import { useQuery } from '@tanstack/react-query';
import { useCustomerVehicles } from '@/hooks/useCustomerVehicles';
import { getServiceHistory } from '@/lib/customerApi';

export const HistoryPage = () => {
  const { data: vehicles } = useCustomerVehicles();
  const selectedVehicle = vehicles?.[0];
  
  const { data: serviceHistory, isLoading } = useQuery({
    queryKey: ['customer', 'service-history', selectedVehicle?.id],
    queryFn: () => getServiceHistory(selectedVehicle!.id),
    enabled: !!selectedVehicle,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service History</h1>
        <p className="text-gray-600 mt-1">View your vehicle's complete service records</p>
      </div>

      {/* Service History Table */}
      {!serviceHistory || serviceHistory.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No service history</h3>
          <p className="text-gray-600">Service records will appear here once available.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{record.serviceType}</div>
                      <div className="text-sm text-gray-500">{record.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.serviceCenter?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.mileageAtService.toLocaleString()} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{record.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-primary-600 hover:text-primary-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
