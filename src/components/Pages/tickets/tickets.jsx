import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Tickets() {
    const [ticket,setTicket] = useState();
    const get_user = sessionStorage.getItem("userId");
    useEffect(()=>{
        axios
          .post(
            `https://localhost:7216/api/Ticket/searchTicketByUserId?userId=${get_user}`
          )
          .then((response) => {
            console.log(response);
            setTicket(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },[]);

    const removeTicket = (e) =>{
        const ticketId = e.target.id;

        axios
          .post(
            `https://localhost:7216/api/Ticket/deleteTicket?ticketId=${ticketId}`
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }
   
    
    return (
      <div>
        <div className="p-2 flex">
          <div className="font-bold">Tickets user : </div> {get_user}
        </div>
        {ticket &&
          ticket.map((t, index) => (
            <div className="m-2 bg-gray-400 p-2 rounded">
              <div className="flex ">
                <div className="p-2">
                  {" "}
                  <p>{t.ticketId}</p>
                </div>
                <div className="p-2 w-40">
                  <p>{t.ticketNumber}</p>
                </div>
                <div className="p-2 w-40">
                  {" "}
                  <p>{t.price}</p>
                </div>
                <div className="p-2 w-60">
                  <p>{t.flyingTo}</p>
                </div>
                <div className="p-2 w-60">
                  {" "}
                  <p>{t.flyingFrom}</p>
                </div>
                <div className="float-right flex items-center">
                  <div className="px-4 p-2 mx-2 bg-black text-white rounded">
                    resedule
                  </div>
                  <div className="">
                    <div
                      className="px-4 p-2 bg-black text-white rounded"
                      id={t.ticketId}
                      onClick={(e) => removeTicket(e)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
}

export default Tickets