'use client';

import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppointment } from '@/context/AppointmentContext';
import { generateTimeSlots } from '@/data/mockData';
import { Button } from './ui/Button';

export const CalendarView: React.FC = () => {
  const { state, dispatch } = useAppointment();
  
  const weekDays = useMemo(() => {
    const days = [];
    const startOfWeek = new Date(state.selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  }, [state.selectedDate]);

  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

  const getAppointmentForSlot = (doctorId: string, date: string, time: string) => {
    return state.appointments.find(
      apt => apt.doctorId === doctorId && apt.date === date && apt.timeSlot === time
    );
  };

  const isDoctorAvailable = (doctorId: string, time: string) => {
    const doctor = state.doctors.find(d => d.id === doctorId);
    if (!doctor || !doctor.isOnDuty) return false;
    
    const slotTime = new Date(`2000-01-01 ${time}`);
    const dutyStart = new Date(`2000-01-01 ${doctor.dutyStart}`);
    const dutyEnd = new Date(`2000-01-01 ${doctor.dutyEnd}`);
    
    return slotTime >= dutyStart && slotTime < dutyEnd;
  };

  const handleSlotClick = (doctorId: string, date: string, time: string) => {
    const appointment = getAppointmentForSlot(doctorId, date, time);
    if (appointment) return; // Slot already booked
    
    if (!isDoctorAvailable(doctorId, time)) return; // Doctor not available
    
    dispatch({
      type: 'OPEN_BOOKING_MODAL',
      payload: { doctorId, date, time }
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(state.selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    dispatch({ type: 'SET_SELECTED_DATE', payload: newDate });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Weekly Schedule</h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateWeek('prev')}
              className="text-blue-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {weekDays[0]?.toLocaleDateString()} - {weekDays[6]?.toLocaleDateString()}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateWeek('next')}
              className="text-blue-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-3 text-sm font-medium text-gray-500">Time</div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center border-l border-gray-200">
                <div className="text-sm font-medium text-gray-900">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="divide-y divide-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8">
                <div className="p-3 text-sm text-gray-600 font-medium bg-gray-50">
                  {time}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dateStr = day.toISOString().split('T')[0];
                  return (
                    <div key={dayIndex} className="border-l border-gray-200 min-h-[60px]">
                      {state.doctors.map((doctor) => {
                        const appointment = getAppointmentForSlot(doctor.id, dateStr, time);
                        const isAvailable = isDoctorAvailable(doctor.id, time);
                        
                        if (appointment) {
                          return (
                            <div
                              key={doctor.id}
                              className="m-1 p-2 bg-blue-100 border border-blue-300 rounded text-xs"
                            >
                              <div className="font-medium text-blue-900">
                                {appointment.patientName}
                              </div>
                              <div className="text-blue-700">
                                {doctor.name.split(' ')[1]}
                              </div>
                            </div>
                          );
                        }
                        
                        if (isAvailable) {
                          return (
                            <button
                              key={doctor.id}
                              onClick={() => handleSlotClick(doctor.id, dateStr, time)}
                              className="m-1 p-2 border border-gray-200 rounded text-xs hover:bg-green-50 hover:border-green-300 transition-colors w-full text-left"
                            >
                              <div className="text-gray-700">
                                {doctor.name.split(' ')[1]}
                              </div>
                              <div className="text-gray-500 text-xs">
                                Available
                              </div>
                            </button>
                          );
                        }
                        
                        return <div key={doctor.id} className="m-1 p-2 opacity-30"></div>;
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};