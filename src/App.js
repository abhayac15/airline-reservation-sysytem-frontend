import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Book } from "./components/Pages/Book";
import { Register } from "./components/Pages/Register";
import { Contact } from "./components/Pages/Contact";
import {Login} from "./components/Pages/Login";
import {noti} from "./components/Pages/noti";
import FlightSearch from "./components/Pages/FlightSearch";
import Booknow from "./components/Pages/booking/Booknow";
import Tickets from "./components/Pages/tickets/tickets";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="w-[100vw] h-full mt-2 bg-blue-100 flex flex-col justify-center items-center">
          <Switch>
            <Route exact path="/" component={FlightSearch} />
            <Route path="/about" component={Book} />
            <Route path="/register" component={Register} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/noti" component={noti} />
            <Route path="/bookFlight/:flightId" component={Booknow} />
            <Route path="/tickets" component={Tickets} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
