import React, { useState,useEffect } from 'react'
import FlightList from './flights/FlightList';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const FlightSearch = () => {
  
  const history = useHistory();
    const get_user = sessionStorage.getItem("userId");
    const [flights, setFlights] = useState([]);
    const [trip, setTrip] = useState('');
    const [flyingFrom, setFlyingFrom] = useState(null);
    const [flyingTo, setFlyingTo] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [returneDate, setReturnDate] = useState(null);

    const [TripError,setTripError] = useState(null);
    const [dateError,setDateError] = useState(null);
    
  
     const submitValue = () => {
        if (returneDate < departureDate){
          setDateError("return date cant be before departure");
          return;
        }
          if (get_user == null || get_user == undefined) {
            history.push("/login");
          }
      console.log(departureDate);
      if(trip == null || trip == ""){
        setTripError("trip type is empty");
        return;
      }
      if (departureDate == null || trip == "") {
        setTripError("select departure date");
        return;
      }
    
      const frmdetails = {
        trip:trip,
        destinationPlace: flyingTo,
        sourcePlace: flyingFrom
      };
        axios
          .post(
            `https://localhost:7216/api/Flights/searchFlightByPlace?destinationPlace=${flyingFrom}&sourcePlace=${flyingTo}`
          )
          .then((res) => {
            const tempFlights = res.data;
             tempFlights.forEach((f) => {
               f.dataOfJourney = departureDate;
               console.log(f);
             });
           
           setFlights(tempFlights);
           
          })
          .catch((err) => {
            console.log(err);
          });
     };

     const tripSelect = (e) =>{
        const value = e.target.value;
        if(value == "round trip"){
            flights.forEach((p) => {
              p.price *= 2;
            });
        }else{
          flights.forEach((p) => {
            p.price /= 2;
          });
        }
        setTrip(value);
     }
 
  return (
    <div className="w-full flex flex-col justify-center p-4 items-center mt-10">
      <div className="w-[80%] flex p-2 ">
        <div className="p-2 mx-4 flex">
          <input
            id="roundTrip"
            type="radio"
            className="w-4 h-4 p-2"
            name="trip"
            value="round trip"
            onChange={(e) => tripSelect(e)}
          />
          <p className="px-2">Round Trip</p>
        </div>
        <div className="p-2 mx-4 flex">
          <input
            id="oneWay"
            type="radio"
            className="w-4 h-4 p-2 mx-4"
            name="trip"
            value="one way"
            onChange={(e) => tripSelect(e)}
          />
          <p>One way</p>
        </div>
      </div>
      <p className="text-red-900">{TripError}</p>
      <div className="flex justify-evenly w-full">
        <div className="">
          <div>Flying from</div>
          <select
            value={flyingFrom}
            onChange={(e) => {
              setFlyingFrom(e.target.value);
            }}
          >
            {" "}
            <option value="" selected disabled hidden>
              --Select Airport--
            </option>
            <option value="England Newcastle International Airport">
              {" "}
              England Newcastle International Airport
            </option>
            <option value="Italy Naples International Airport">
              {" "}
              Italy Naples International Airport
            </option>
            <option value="Malaysia Mulu Airport">
              {" "}
              Malaysia Mulu Airport
            </option>
            <option value="Kenya Malindi Airport">
              {" "}
              Kenya Malindi Airport
            </option>
          </select>
        </div>
        <div className="">
          <div>Flying to</div>
          <select
            value={flyingTo}
            onChange={(e) => {
              setFlyingTo(e.target.value);
            }}
          >
            {" "}
            <option value="" selected disabled hidden>
              --Select Airport--
            </option>
            <option value="England Newcastle International Airport">
              {" "}
              England Newcastle International Airport
            </option>
            <option value="Italy Naples International Airport">
              Italy Naples International Airport
            </option>
            <option value="Malaysia Mulu Airport">
              {" "}
              Malaysia Mulu Airport
            </option>
            <option value="Kenya Malindi Airport">
              {" "}
              Kenya Malindi Airport
            </option>
          </select>
        </div>
        <div>
          <p className="">departure date</p>
          <input
            type="date"
            className=""
            onChange={(e) => {
              setDepartureDate(e.target.value);
            }}
          />
        </div>
        {trip != "one way" && (
          <div>
            <p className="">return date</p>
            <input
              type="date"
              className=""
              onChange={(e) => {
                setReturnDate(e.target.value);
              }}
            />
          </div>
        )}
        <div>
          <p>Search</p>
          <input
            type="submit"
            value="Find flight"
            className="p-2"
            onClick={submitValue}
          />
        </div>
      </div>
      <p>{dateError && dateError}</p>

      <div className="mt-10">
        {flights.length == 0 ? (
          <p>Search your flight</p>
        ) : (
          <FlightList flights={flights} departureDate={departureDate} />
        )}
      </div>
    </div>
  );
}

export default FlightSearch