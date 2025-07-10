'use client';

import React from 'react';
import { Clock, AlertCircle, Calendar } from 'lucide-react';
import { IDoctor } from '@/types';
import { useAppointment } from '@/context/AppointmentContext';

interface DoctorCardProps {
  doctor: IDoctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            {doctor.isMultipleDuties && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-sm text-gray-600">{doctor.department}</p>
          <p className="text-xs text-gray-500">{doctor.specialization}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{doctor.dutyStart} - {doctor.dutyEnd}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              doctor.isOnDuty
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {doctor.isOnDuty ? 'On Duty' : 'Off Duty'}
          </div>
        </div>
      </div>
    </div>
  );
};