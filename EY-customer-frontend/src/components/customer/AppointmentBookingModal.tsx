import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAppointment,
  getServiceCenters,
  getAvailableTimeSlots,
  getPredictedIssues,
} from '@/lib/customerApi';
import type { ServiceCenter, TimeSlot } from '@/lib/types';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  issueId?: string;
}

export const AppointmentBookingModal = ({
  isOpen,
  onClose,
  vehicleId,
  issueId,
}: AppointmentBookingModalProps) => {
  const queryClient = useQueryClient();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceCenterId: '',
    date: '',
    timeSlot: '',
    serviceType: issueId ? 'Predicted Issue Service' : 'General Service',
    notes: '',
  });

  // Fetch service centers
  const { data: serviceCenters } = useQuery({
    queryKey: ['service-centers'],
    queryFn: getServiceCenters,
  });

  // Fetch time slots when date and service center are selected
  const { data: timeSlots } = useQuery({
    queryKey: ['time-slots', formData.serviceCenterId, formData.date],
    queryFn: () => getAvailableTimeSlots(formData.serviceCenterId, formData.date),
    enabled: !!formData.serviceCenterId && !!formData.date,
  });

  // Fetch issue details if issueId is provided
  const { data: issues } = useQuery({
    queryKey: ['customer', 'predicted-issues', vehicleId],
    queryFn: () => getPredictedIssues(vehicleId),
    enabled: !!issueId,
  });

  const selectedIssue = issues?.find((i) => i.id === issueId);

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer', 'appointments'] });
      onClose();
      // Reset form
      setStep(1);
      setFormData({
        serviceCenterId: '',
        date: '',
        timeSlot: '',
        serviceType: issueId ? 'Predicted Issue Service' : 'General Service',
        notes: '',
      });
    },
  });

  const handleSubmit = () => {
    if (!formData.serviceCenterId || !formData.date || !formData.timeSlot) {
      alert('Please complete all required fields');
      return;
    }

    createAppointmentMutation.mutate({
      vehicleId,
      serviceCenterId: formData.serviceCenterId,
      date: formData.date,
      timeSlot: formData.timeSlot,
      serviceType: formData.serviceType,
      issueId,
      notes: formData.notes,
    });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Service Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {['Issue', 'Service Center', 'Date & Time'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step > index + 1
                      ? 'bg-success-500 text-white'
                      : step === index + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step === index + 1 ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
                {index < 2 && <div className="w-12 h-0.5 bg-gray-300 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Issue Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Service Details</h3>
              
              {selectedIssue ? (
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <h4 className="font-semibold text-primary-900">{selectedIssue.componentName}</h4>
                  <p className="text-sm text-primary-700 mt-1">{selectedIssue.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="text-primary-800">
                      Severity: <span className="font-medium">{selectedIssue.severity}</span>
                    </span>
                    <span className="text-primary-800">
                      Probability: <span className="font-medium">{selectedIssue.probability}%</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-700">General service appointment</p>
                </div>
              )}

              <div>
                <label className="label">Service Type</label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Brake Service, Battery Check"
                />
              </div>

              <div>
                <label className="label">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Any specific requirements or concerns..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Service Center */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Service Center</h3>
              
              <div className="space-y-3">
                {serviceCenters?.map((center: ServiceCenter) => (
                  <label
                    key={center.id}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.serviceCenterId === center.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceCenter"
                      value={center.id}
                      checked={formData.serviceCenterId === center.id}
                      onChange={(e) => setFormData({ ...formData, serviceCenterId: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{center.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{center.address}</p>
                        <p className="text-sm text-gray-600">{center.phone}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {center.availableServices.map((service) => (
                            <span
                              key={service}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      {formData.serviceCenterId === center.id && (
                        <div className="ml-4">
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Date & Time</h3>
              
              <div>
                <label className="label">Select Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value, timeSlot: '' })}
                  min={getMinDate()}
                  className="input-field"
                />
              </div>

              {formData.date && (
                <div>
                  <label className="label">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots?.map((slot: TimeSlot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                        disabled={!slot.available}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          formData.timeSlot === slot.time
                            ? 'border-primary-600 bg-primary-50 text-primary-900'
                            : slot.available
                            ? 'border-gray-200 hover:border-gray-300 text-gray-900'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                        {!slot.available && <span className="block text-xs mt-1">(Booked)</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="btn-secondary px-6"
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 2 && !formData.serviceCenterId}
              className="btn-primary px-6"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData.timeSlot || createAppointmentMutation.isPending}
              className="btn-primary px-6"
            >
              {createAppointmentMutation.isPending ? 'Booking...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
