import { useState } from 'react';
import { useCustomerVehicles } from '@/hooks/useCustomerVehicles';
import { useCustomerAppointments } from '@/hooks/useCustomerAppointments';
import { AppointmentsTable } from '@/components/customer/AppointmentsTable';
import { AppointmentBookingModal } from '@/components/customer/AppointmentBookingModal';

export const AppointmentsPage = () => {
  const { data: vehicles } = useCustomerVehicles();
  const selectedVehicle = vehicles?.[0];
  
  const { data: appointments, isLoading } = useCustomerAppointments(selectedVehicle?.id);
  
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Find next upcoming appointment
  const nextAppointment = appointments?.find(
    (apt) => new Date(apt.date) >= new Date() && apt.status !== 'Cancelled'
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your service appointments</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Book New Appointment
        </button>
      </div>

      {/* Next Appointment Summary */}
      {nextAppointment && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium opacity-90">Next Appointment</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {new Date(nextAppointment.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <p className="text-lg opacity-90">{nextAppointment.timeSlot}</p>
              <p className="mt-2 opacity-90">{nextAppointment.serviceCenter?.name}</p>
              <p className="text-sm opacity-75">{nextAppointment.serviceType}</p>
            </div>
            <div className="ml-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {nextAppointment.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Table */}
      <AppointmentsTable appointments={appointments} isLoading={isLoading} />

      {/* Booking Modal */}
      {showBookingModal && selectedVehicle && (
        <AppointmentBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          vehicleId={selectedVehicle.id}
        />
      )}
    </div>
  );
};
