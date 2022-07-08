import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import {useHistory} from 'react-router-dom';
function NavBar() {
  const [click, setClick] = useState(false);
  const [userName,setUsername] = useState();
  const get_user = sessionStorage.getItem("userId");
  const history = useHistory();
 
  function logout(){
    setUsername(null);
    sessionStorage.clear();
    sessionStorage.removeItem("userId");
    history.push("/login");
  }
  console.log(sessionStorage);
  useEffect(() => {
    setUsername(sessionStorage.getItem("userId"));
    console.log(userName);
  }, [sessionStorage,get_user]);

  const handleClick = () => setClick(!click);
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <i className="fa-solid fa-ticket-airline"></i>✈ Airline Reservation
            System
            <i className="fa-solid fa-ticket-airline"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                ⌂ Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/tickets"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                ticket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                🎫 Book Flight
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                📞 Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              {userName ? (
                <p className="text-white">{userName}</p>
              ) : (
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <div className="px-2" onClick={logout}>
                <div className="border-0 border-red-200 rounded text-white">
                  Logout
                </div>
              </div>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
