// Vehicle types
export interface Vehicle {
  id: string;
  model: string;
  make: string;
  year: number;
  registrationNumber: string;
  vin: string;
  customerId: string;
}

export interface VehicleStatus {
  vehicleId: string;
  overallHealth: number; // 0-100
  mileage: number;
  lastServiceDate: string;
  nextRecommendedService: string;
  batteryHealth: number; // 0-100
  engineHealth: number; // 0-100
  brakeHealth: number; // 0-100
  suspensionHealth: number; // 0-100
}

// Predicted issues
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface PredictedIssue {
  id: string;
  vehicleId: string;
  componentName: string;
  componentId: string;
  probability: number; // 0-100
  severity: Severity;
  description: string;
  recommendedServiceWindow: string;
  estimatedCost?: number;
  predictedDate?: string;
}

// Complaints
export type SymptomCategory = 
  | 'Noise'
  | 'Vibration'
  | 'Braking'
  | 'Engine'
  | 'Electrical'
  | 'Transmission'
  | 'Suspension'
  | 'Other';

export interface Complaint {
  id: string;
  vehicleId: string;
  customerId: string;
  affectedPart: string;
  symptomCategory: SymptomCategory;
  description: string;
  whenOccurs?: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintInput {
  vehicleId: string;
  affectedPart: string;
  symptomCategory: SymptomCategory;
  description: string;
  whenOccurs?: string;
}

// Appointments
export type AppointmentStatus = 
  | 'Scheduled'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  availableServices: string[];
}

export interface Appointment {
  id: string;
  vehicleId: string;
  customerId: string;
  serviceCenterId: string;
  serviceCenter?: ServiceCenter;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  issueId?: string;
  serviceType: string;
  notes?: string;
  createdAt: string;
}

export interface CreateAppointmentInput {
  vehicleId: string;
  serviceCenterId: string;
  date: string;
  timeSlot: string;
  issueId?: string;
  serviceType: string;
  notes?: string;
}

// Service history
export interface ServiceRecord {
  id: string;
  vehicleId: string;
  serviceCenterId: string;
  serviceCenter?: ServiceCenter;
  date: string;
  serviceType: string;
  description: string;
  cost: number;
  mileageAtService: number;
  partsReplaced?: string[];
  technician?: string;
}

// Chat
export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ChatInput {
  vehicleId: string;
  message: string;
  issueId?: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  timestamp: string;
  suggestedActions?: string[];
}

// Time slots
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
