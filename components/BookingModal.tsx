'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useAppointment } from '@/context/AppointmentContext';
import { IBookingForm } from '@/types';

export const BookingModal: React.FC = () => {
  const { state, dispatch, bookAppointment } = useAppointment();
  const [formData, setFormData] = useState<Partial<IBookingForm>>({
    patientFirstName: '',
    patientLastName: '',
    patientEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDoctor = state.doctors.find(d => d.id === state.selectedSlot?.doctorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.selectedSlot) return;

    setIsSubmitting(true);
    
    const booking: IBookingForm = {
      doctorId: state.selectedSlot.doctorId,
      date: state.selectedSlot.date,
      timeSlot: state.selectedSlot.time,
      patientFirstName: formData.patientFirstName || '',
      patientLastName: formData.patientLastName || '',
      patientEmail: formData.patientEmail || '',
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    bookAppointment(booking);
    setIsSubmitting(false);
    setFormData({
      patientFirstName: '',
      patientLastName: '',
      patientEmail: '',
    });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BOOKING_MODAL' });
    setFormData({
      patientFirstName: '',
      patientLastName: '',
      patientEmail: '',
    });
  };

  return (
    <Modal
      isOpen={state.isBookingModalOpen}
      onClose={handleClose}
      title="Book Appointment"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Doctor Info */}
        {selectedDoctor && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <img
                src={selectedDoctor.avatar}
                alt={selectedDoctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.department}</p>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{state.selectedSlot?.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{state.selectedSlot?.time}</span>
          </div>
        </div>

        {/* Patient Information */}
        <div className="space-y-4">
          <h4 className="flex items-center space-x-2 font-medium text-gray-900">
            <User className="h-4 w-4" />
            <span>Patient Information</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={formData.patientFirstName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientFirstName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                value={formData.patientLastName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientLastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.patientEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            isLoading={isSubmitting}
            className="flex-1"
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </Modal>
  );
};