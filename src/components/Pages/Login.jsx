import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import {useHistory} from 'react-router-dom'
export const Login = () => {
  const { register, handleSubmit  } = useForm();
 

const history = useHistory();
 const get_user = sessionStorage.getItem("userId");
  console.log(get_user);
  if (get_user != undefined) {
    history.push("/");
  }
  function onSubmit(data) {
    console.log("Data submitted: ", data);
    if(data.email != null && data.password != null){
      axios
        .post("https://localhost:7216/api/Auth/login", {
          username: data.email,
          password: data.password,
        })
        .then((response) => {
          sessionStorage.setItem("userId",data.email);
          if(response.data == "login successfull"){
            history.push('/');
          }
          console.log(response);
        }).catch(err =>{
          console.log(err);
        });
    }
  }

  return (
    <section className=" ">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col p-10 justify-center items-center">
          <div className="text-4xl font-bold">Welcome to airline</div>
          <div className="bg-gray-100 flex flex-col p-10 rounded mt-20">
            <div className="text-center text-lg font-bold">
              LOGIN TO THE SYSTEM
            </div>
            <div className="mt-10 flex flex-col">
              <label htmlFor="inputEmail">E-mail</label>
              <input
                type="email"
                id="inputEmail"
                name="email"
                className="rounded hover:bg-gray-300"
                ref={register({
                  required: "Enter your e-mail",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid e-mail address",
                  },
                })}
              />
            </div>
            <div className="mt-10 flex flex-col">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="rounded hover:bg-gray-300"
                id="inputPassword"
                name="password"
                ref={register({ required: "Enter your password" })}
              />
            </div>
            <div className="flex">
              <button type="submit" className="mt-10 rounded">
                Login
              </button>
              <a href="/register">
                <button id="bt" type="button" className="mt-10 rounded">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};


