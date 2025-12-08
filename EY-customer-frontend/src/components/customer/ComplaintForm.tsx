import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createComplaint } from '@/lib/customerApi';
import { useCustomerVehicles } from '@/hooks/useCustomerVehicles';
import type { SymptomCategory } from '@/lib/types';

const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  'Noise',
  'Vibration',
  'Braking',
  'Engine',
  'Electrical',
  'Transmission',
  'Suspension',
  'Other',
];

const AFFECTED_PARTS = [
  'Engine',
  'Transmission',
  'Brakes',
  'Suspension',
  'Battery',
  'Electrical System',
  'Cooling System',
  'Exhaust System',
  'Wheels & Tires',
  'Steering',
  'Other',
];

export const ComplaintForm = () => {
  const navigate = useNavigate();
  const { data: vehicles } = useCustomerVehicles();
  
  const [formData, setFormData] = useState({
    vehicleId: vehicles?.[0]?.id || '',
    affectedPart: '',
    symptomCategory: '' as SymptomCategory,
    description: '',
    whenOccurs: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const createComplaintMutation = useMutation({
    mutationFn: createComplaint,
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/customer/dashboard');
      }, 2000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.affectedPart || !formData.symptomCategory || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    createComplaintMutation.mutate({
      vehicleId: formData.vehicleId,
      affectedPart: formData.affectedPart,
      symptomCategory: formData.symptomCategory,
      description: formData.description,
      whenOccurs: formData.whenOccurs,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-card p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
          <p className="text-gray-600">
            Your complaint has been registered successfully. Our team will review it shortly.
          </p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Raise a Complaint</h1>
        <p className="text-gray-600 mt-1">Report an issue with your vehicle</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6 space-y-6">
        {/* Vehicle Selection */}
        <div>
          <label htmlFor="vehicleId" className="label">
            Vehicle <span className="text-danger-500">*</span>
          </label>
          <select
            id="vehicleId"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            className="input-field"
            required
          >
            {vehicles?.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.registrationNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Affected Part */}
        <div>
          <label htmlFor="affectedPart" className="label">
            Affected Part <span className="text-danger-500">*</span>
          </label>
          <select
            id="affectedPart"
            name="affectedPart"
            value={formData.affectedPart}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select affected part</option>
            {AFFECTED_PARTS.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
        </div>

        {/* Symptom Category */}
        <div>
          <label htmlFor="symptomCategory" className="label">
            Symptom Category <span className="text-danger-500">*</span>
          </label>
          <select
            id="symptomCategory"
            name="symptomCategory"
            value={formData.symptomCategory}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select symptom category</option>
            {SYMPTOM_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="label">
            Description <span className="text-danger-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="input-field resize-none"
            placeholder="Describe the issue in detail..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Please provide as much detail as possible about the issue you're experiencing.
          </p>
        </div>

        {/* When It Occurs */}
        <div>
          <label htmlFor="whenOccurs" className="label">
            When does it occur? (Optional)
          </label>
          <input
            type="text"
            id="whenOccurs"
            name="whenOccurs"
            value={formData.whenOccurs}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., During acceleration, When turning, At high speeds"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/customer/dashboard')}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createComplaintMutation.isPending}
            className="btn-primary flex-1"
          >
            {createComplaintMutation.isPending ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>

        {createComplaintMutation.isError && (
          <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-danger-700 text-sm">
              Failed to submit complaint. Please try again.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
