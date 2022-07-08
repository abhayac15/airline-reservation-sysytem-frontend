import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width:"750px",
    height:"300px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
  },
};

const Passenger = ({ flights }) => {
  const [numberOfPassenger, setNumberOfPassenger] = useState();
  const [passengerName, setPassengerName] = useState("");
  const [panCard, setPanCard] = useState("");
  const [ticketNumber, setTicketNumber] = useState();
  const [Error,setError] = useState(null);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ticketModal,setTicketModal] = useState(false);
  const history = useHistory();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTicketModal(false);
  }

  let data = {
    passengerName: passengerName,
    panNumber: panCard,
    ticketNumberForFlight: ticketNumber,
    userId: 1,
  };
  const get_user = sessionStorage.getItem("userId");
  if(get_user == undefined){
    history.push("/");
  }
  const ticketGenerator = () => {
        if((passengerName == "" || passengerName == null) && (panCard == "" || panCard == null) ){
            setError("Field is empty");
            return;
        }
         setError("");
        const ticketId = flights.flightsId;
        const ticketNumber = flights.ticketNumber;
        let ticket = ticketNumber+flights.flightName.slice(0,4).toUpperCase() + ticketId;
        ticket = ticket + get_user.slice(0,4).toUpperCase();
        console.log(ticket);
        setTicketNumber(ticket);
  };
   
  const passengerData = () => {
    openModal();
    console.log(data);
  };

  const submitPassengerData = () =>{
    console.log(data);
     axios
       .post("https://localhost:7216/api/Passenger/AddPassenger", {
         userId: 1,
         passengerName: passengerName,
         ticketNumberForFlight: ticketNumber,
         panNumber: panCard,
         userName: get_user
       })
       .then((res) => {
         console.log(res);
         closeModal();
         console.log(flights);
         axios
           .post("https://localhost:7216/api/Ticket/addTicket", {
             ticketNumber: ticketNumber,
             flyingFrom: flights.sourcePlace,
             flyingTo: flights.destinationPlace,
             price: flights.price,
             userName: get_user
           })
           .then((res) => {
             setTicketModal(true);
           })
           .catch((err) => {
             
             console.log(err);
           });
       })
       .catch((err) => {
         console.log(err);
       });


  };

 
  return (
    <div className="p-1 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 mt-10 rounded-md">
      <div className="w-full flex flex-col justify-center bg-blue-400 p-10 rounded font-bold text-black">
        <div className="font-bold text-center rounded text-4xl">
          Passenger Details
        </div>
        <div className="mt-10">
          <div className="flex">
            <div>
              <label>Number of passenger : </label>
              <input
                type="number"
                id="numberPassenger"
                name="Number of passenger"
                defaultValue={1}
                onChange={(e) => {
                  setNumberOfPassenger(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex p-2 mt-10">
            <div className="p-2">
              <label htmlFor="inputEmail">passenger Name : </label>
              <input
                type="text"
                id="passengerName"
                name="passengerName"
                onChange={(e) => {
                  setPassengerName(e.target.value);
                }}
              />
            </div>
            <div className="p-2">
              <label htmlFor="inputEmail">pan number : </label>
              <input
                type="text"
                id="passengerName"
                name="passengerName"
                onChange={(e) => {
                  setPanCard(e.target.value);
                }}
              />
            </div>
          </div>
          <div>{Error && Error}</div>
          <div className="flex justify-center items-center">
            <button className="rounded m-2" onClick={ticketGenerator}>
              Check availablity
            </button>
            <div className="p-2">
              {ticketNumber && `Ticket number : ${ticketNumber}`}
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button className="rounded bg-blue-500" onClick={passengerData}>
              Book Confirm
            </button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          data={data}
          contentLabel="Example Modal"
        >
          <h2 className="text-black">passenger name : {data.passengerName}</h2>
          <button onClick={submitPassengerData}>pay now</button>
          <button onClick={closeModal}>close</button>
        </Modal>
        <Modal
          isOpen={ticketModal}
          onRequestClose={closeModal}
          style={customStyles}
          data={data}
          flights={flights}
          contentLabel="Example Modal"
        >
          <div id="modal">
            <div class="flex bg-yellow-300">
              <div class="flex justify-center items-center ">
                <div className="w-20">
                  <div className="fa fa-barcode text-base" />
                </div>
                <div className="p-2">
                  <p className="font-bold">Passenger Name</p>
                  <p>{data.passengerName}</p>
                  <div className="flex">
                    <p className="font-bold">Class</p>
                    <h1>Economy</h1>
                  </div>
                  <div class="seat flex">
                    <p className="font-bold mr-2">Seat</p>
                    <h1>11E</h1>
                  </div>
                  <div class="flight">
                    <p className="font-bold">Flight</p>
                    <h1>{flights && flights.flightName}</h1>
                  </div>
                </div>
              </div>
              <div class="ticket airline">
                <div class="item1">
                  <div class="from">
                    <p className="font-bold">from</p>
                    <h1>{flights && flights.destinationPlace}</h1>
                  </div>
                  <i class="fa fa-plane"></i>
                  <div class="to">
                    <p className="font-bold">to</p>
                    <h1>{flights && flights.sourcePlace}</h1>
                  </div>
                </div>
                <div class="item2">
                  <div class="gate">
                    <p className="font-bold">Gate</p>
                    <h1>B3</h1>
                  </div>
                  <div class="time">
                    <p className="font-bold"> Boarding Time</p>
                    <h1>10:25AM</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Passenger