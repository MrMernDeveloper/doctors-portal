import React, { useState } from 'react';
import chair from '../../../src/assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  


    return (
        <header>
            <div className="">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={ chair} alt="Doctor chair" className="lg:w-1/2 rounded-lg shadow-2xl" />
                    <div className='lg:w-9/12 mx-auto'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                    
                </div>
            </div>
       </header>
    );
};

export default AppointmentBanner;