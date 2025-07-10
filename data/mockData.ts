import { IDoctor, IAppointment } from '@/types';

export const mockDoctors: IDoctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    specialization: 'Heart Specialist',
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '08:00',
    dutyEnd: '17:00',
    isOnDuty: true,
    isMultipleDuties: false,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    department: 'Neurology',
    specialization: 'Brain & Nervous System',
    avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '09:00',
    dutyEnd: '18:00',
    isOnDuty: true,
    isMultipleDuties: true,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    department: 'Pediatrics',
    specialization: 'Children\'s Health',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '07:00',
    dutyEnd: '15:00',
    isOnDuty: true,
    isMultipleDuties: false,
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    department: 'Orthopedics',
    specialization: 'Bone & Joint Specialist',
    avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '10:00',
    dutyEnd: '19:00',
    isOnDuty: false,
    isMultipleDuties: false,
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    department: 'Dermatology',
    specialization: 'Skin Specialist',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '08:30',
    dutyEnd: '16:30',
    isOnDuty: true,
    isMultipleDuties: true,
  },
  {
    id: '6',
    name: 'Dr. David Kumar',
    department: 'Internal Medicine',
    specialization: 'General Medicine',
    avatar: 'https://images.pexels.com/photos/5452292/pexels-photo-5452292.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    dutyStart: '06:00',
    dutyEnd: '14:00',
    isOnDuty: true,
    isMultipleDuties: false,
  },
];

export const mockAppointments: IAppointment[] = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'John Smith',
    patientEmail: 'john.smith@email.com',
    date: '2025-01-15',
    timeSlot: '09:00',
    status: 'confirmed',
    department: 'Cardiology',
    agent: 'Admin',
  },
  {
    id: '2',
    doctorId: '2',
    patientName: 'Maria Garcia',
    patientEmail: 'maria.garcia@email.com',
    date: '2025-01-15',
    timeSlot: '10:30',
    status: 'pending',
    department: 'Neurology',
    agent: 'Nurse Jane',
  },
  {
    id: '3',
    doctorId: '3',
    patientName: 'Robert Jones',
    patientEmail: 'robert.jones@email.com',
    date: '2025-01-16',
    timeSlot: '11:00',
    status: 'confirmed',
    department: 'Pediatrics',
    agent: 'Reception',
  },
  {
    id: '4',
    doctorId: '1',
    patientName: 'Alice Johnson',
    patientEmail: 'alice.johnson@email.com',
    date: '2025-01-16',
    timeSlot: '14:00',
    status: 'completed',
    department: 'Cardiology',
    agent: 'Dr. Assistant',
  },
];

export const generateTimeSlots = (startTime: string, endTime: string): string[] => {
  const slots: string[] = [];
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  
  while (start < end) {
    slots.push(start.toTimeString().slice(0, 5));
    start.setMinutes(start.getMinutes() + 30);
  }
  
  return slots;
};