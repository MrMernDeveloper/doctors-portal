
import { useQuery,  } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, {  useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppointmentOption from '../AppointmentOption';
import BookingModal from './BookingModal';

const AvailableApointment = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);

    const date = format(selectedDate, 'PP')

    const [treatment, setTreatment] = useState(null)



    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date, ],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/v2/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    })
   
   /* const { data: appointmentOptions = [] } = useQuery({
        queryKey: ['appointmentOptions'],
        queryFn: () => fetch('http://localhost:5000/appointmentOptions')
        .then(res=>res.json())
    })
    */


    // useEffect(() => {
      
    //         .then(res => res.json())
    //     .then(data=>setAppointmentOptions(data))
    // }, [])

    // console.log(appointmentOptions)

    if (isLoading) {
    return <Loading></Loading>
}
    return (
        <section>
            <p className=' text-primary font-bold mt-16 text-center text-lg'>Available Appointment on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                    
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}

                    >
                        
                    </AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <>
                    <BookingModal
                        selectedDate={selectedDate}
                        treatment={treatment}
                        setTreatment={setTreatment}
                        refetch={refetch}
                    >
                        

                    </BookingModal>
                </>
          }
        </section>
    );
};

export default AvailableApointment;