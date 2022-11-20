import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption;
    return (
        <div>
            <div className="shadow-lg rounded">
                <div className="card-body text-center">
                    <h2 className=" text-center text-2xl text-secondary font-semibold">{ name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try another Day '}</p>
                    <p>{slots.length} { slots.length > 1 ? 'spaces' : 'space'} 
                        available</p>
                    <p>Price ${price }</p>
                    <div className="card-actions justify-center">
                        <label
                            disabled={slots.length === 0}
                            onClick={()=>setTreatment(appointmentOption)}
                            htmlFor="booking-modal"
                            className="btn btn-primary text-white">
                            Book Appointment</label>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AppointmentOption;