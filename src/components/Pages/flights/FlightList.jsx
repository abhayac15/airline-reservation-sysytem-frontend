import React from 'react'
import { useHistory } from 'react-router-dom';

function FlightList({ flights, flyingFrom, flyingTo, departureDate,flightBookingPage=true }) {
  const history = useHistory();
  const get_user = sessionStorage.getItem("userId");
  console.log(flights);
  const bookNow = (e) => {
    if (get_user == null || get_user == undefined) {
      history.push("/login");
    }
    const flightId = e.target.id;
    history.push(`/bookFlight/${flightId}?dates=${departureDate}`);
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="w-full">
          <tr className="border-2 p-2 w-full border-black ">
            <th className="px-8">
              <h3>flightName</h3>
            </th>
            <th className="px-8">
              <h3>sourcePlace</h3>
            </th>
            <th className="px-8">
              <h3>destinationPlace</h3>
            </th>
            <th className="px-8">
              <h3>price</h3>
            </th>
            <th className="px-8">
              <h3>Book</h3>
            </th>
          </tr>
        </thead>

        {flights ? (
          flights.map((flight, index) => (
            <tr id={index} className="border-2 p-2 border-black">
              <th>
                <h3>✈{flight?.flightName}</h3>
              </th>
              <th>
                <h6>{flight.sourcePlace}</h6>
              </th>
              <th>
                <h6>{flight.destinationPlace}</h6>
              </th>
              <th>
                <h6>&#8377; {flight.price}</h6>
              </th>
              <th className="w-80">
                <h6>{flight.dataOfJourney.slice(0, 10)}</h6>
              </th>
              {flightBookingPage && (
                <th>
                  <button
                    id={flight?.flightsId}
                    className="h-10 flex justify-center items-center w-24 rounded-sm p-2"
                    onClick={(e) => bookNow(e)}
                  >
                    Book Now!
                  </button>
                </th>
              )}
            </tr>
          ))
        ) : (
          <div className="w-full flex justify-center items-center text-center">
            <div>
              <p>No flights</p>
            </div>
          </div>
        )}
      </table>
      
    </div>
  );
};

export default FlightList