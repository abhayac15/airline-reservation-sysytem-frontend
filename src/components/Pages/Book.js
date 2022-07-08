import React, { useEffect, useState } from "react";
import "./Book.css"
import { useParams } from "react-router-dom";
import axios from "axios";
export const Book = () => {
  const   urlParams = new URLSearchParams(window.location.search);
  const dates = urlParams.get('dates');
  console.log(dates);
      const [flights,setFlights] = useState(null);
      useEffect(()=>{
            axios.get("https://localhost:7216/api/Flights")
              .then((res) => {
                console.log(res.data);
                setFlights(res.data);
                 flights.forEach((f) => {
                   f.dataOfJourney = dates;
                 });
              })
              .catch((err) => {
                console.log(err);
              });
      },[]);
  return (
    <div>
      <table>
        <thead>
          <tr className="border-2 p-2 border-black"> 
              <th>
                <h3>flight</h3>
              </th>
            </tr>
        </thead>
        {flights && flights.map((flight,index) =>(
            <tr id={index} className="border-2 p-2 border-black"> 
              <th>
                <h3>✈{flight?.flightName}</h3>
              </th>
              <th>
                <h6>{flight.sourcePlace}</h6>
              </th>
              <th>
                <h6 >{flight.destinationPlace}</h6>
              </th>
              <th className="w-80">
                <h6>{flight.dataOfJourney.slice(0, 10)}</h6>
              </th>
            </tr>
        ))}
        
      </table>
    </div>
  );
};
