import React from 'react';
import MakeApointMent from './MakeApointMent/MakeApointMent';
import Banner from './Banner/Banner';
import InfoCards from './InfoCards/InfoCards';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeApointMent></MakeApointMent>
            <Testimonial></Testimonial>
            
        </div>
    );
};

export default Home;