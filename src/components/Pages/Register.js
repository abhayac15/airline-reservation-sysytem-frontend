import React, { useState } from "react";
import "../registrationcomp/Form.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import flight from '../../images/flight.jpg';
export function Register() {
  const history = useHistory();
   const get_user = sessionStorage.getItem("userId");
   console.log(get_user);
    if (get_user != undefined) {
      history.push("/");
    }

 const { register, handleSubmit } = useForm();
 const [error,setError] = useState('');

  function onSubmitForm(data) {
    console.log("Data submitted: ", data);
    if(data.username == null){
       setError("username empty");
       return;
    }
    if(data.password != data.password2){
        setError("Password doesnt match");
    }else{
      if(data.username != null && data.password != null){
            axios
              .post("https://localhost:7216/api/Auth/register", {
                username: data.username,
                password: data.password,
              })
              .then((response) => {
                if (response.data == "Register Successful") {
                  history.push("/login");
                }
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          }
      }
    
  }

  return (
    <section className="w-[100vw] h-[100vh] flex font-sans ">
      <div className="flex ">
        <div className="bg-gray-200">
          <img src={flight} alt="flight" className="w-full h-full" />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[50vw] bg-gray-200 flex flex-col justify-center items-center h-full">
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              noValidate
              className="flex justify-center items-center"
            >
              <div className="flex flex-col justify-center m-2">
                <label className="font-bold ">Username :</label>
                <input
                  type="text"
                  className="w-72 rounded m-2"
                  name="username"
                  placeholder="User Name *"
                  // className={`${errors.username} ? "error" : "success"`}
                  onBlur={handleSubmit}
                  autoComplete="off"
                  ref={register({
                    required: "Enter your e-mail",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Enter a valid e-mail address",
                    },
                  })}
                />
                <label className="font-bold ">password :</label>
                <input
                  type="password"
                  name="password"
                  className="w-72 rounded m-2"
                  placeholder="Password *"
                  // className={`${errors.password} ? "error" : "success"`}
                  onBlur={handleSubmit}
                  autoComplete="off"
                  ref={register({ required: "Enter your password" })}
                />
                <label className="font-bold ">Confirm password :</label>
                <input
                  type="password"
                  name="password2"
                  className="w-72 rounded m-2"
                  placeholder="Confirm Password *"
                  onBlur={handleSubmit}
                  autoComplete="off"
                  ref={register({ required: "Enter your password" })}
                />
                {error && <p className="font-red">{error}</p>}
                <button type="submit" className="rounded">
                  Register
                </button>
              </div>
            </form>
            <p className="font-red">
              already a user?{" "}
              <a className="font-bold" href="/login">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

