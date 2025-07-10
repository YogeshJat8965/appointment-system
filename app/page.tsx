'use client';

import React, { useState, useEffect } from 'react';
import { AppointmentProvider } from '@/context/AppointmentContext';
import { Navigation } from '@/components/Navigation';
import { DoctorSchedule } from '@/components/DoctorSchedule';
import { CalendarView } from '@/components/CalendarView';
import { AllAppointments } from '@/components/AllAppointments';
import { BookingModal } from '@/components/BookingModal';
import { useAppointment } from '@/context/AppointmentContext';
import { mockDoctors, mockAppointments } from '@/data/mockData';

const AppContent: React.FC = () => {
  const { dispatch } = useAppointment();
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    // Initialize with mock data
    dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
    dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
  }, [dispatch]);

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <DoctorSchedule />;
      case 'calendar':
        return <CalendarView />;
      case 'appointments':
        return <AllAppointments />;
      default:
        return <DoctorSchedule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <BookingModal />
    </div>
  );
};

export default function Home() {
  return (
    <AppointmentProvider>
      <AppContent />
    </AppointmentProvider>
  );
}