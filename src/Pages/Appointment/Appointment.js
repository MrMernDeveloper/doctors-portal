import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';
import AvailableApointment from './AvailableApointment/AvailableApointment';
import BookingModal from './AvailableApointment/BookingModal';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
         
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvailableApointment
                selectedDate={selectedDate}
                
            
            ></AvailableApointment>
            
        </div>
    );
};

export default Appointment;