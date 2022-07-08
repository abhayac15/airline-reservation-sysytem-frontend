import React,{useState,useEffect} from 'react';
import axios from 'axios';
import FlightList from '../flights/FlightList';
import Passenger from './Passenger';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius:"10px"
  },
};
const Booknow = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dates = urlParams.get("dates");
      console.log(dates);
    
    const [flights, setFlights] = useState([]);
     
    const { flightId } = useParams();
     useEffect(() => {
       axios
         .post(
           `https://localhost:7216/api/Flights/searchFlight?flightId=${flightId}`
         )
         .then((res) => {
           const flightTemp = res.data;
           flightTemp.forEach((e) => {
             e.dataOfJourney = dates;
             console.log(e);
           });
           setFlights(flightTemp);
           console.log(flightTemp);
         })
         .catch((err) => {
           console.log(err);
         });
     }, [flightId]);

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        {flights && <FlightList flights={flights} flightBookingPage={false}/>}
        <Passenger flights={flights[0]} />
      
      </div>
    </div>
  );
}

export default Booknow