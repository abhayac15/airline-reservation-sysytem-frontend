import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import axios from 'axios';
const LoginForm = () => {
  const { register, handleSubmit  } = useForm();

  function onSubmit(data) {
    console.log("Data submitted: ", data);
  }
 
    axios.get("https://localhost:7216/api/Auth").then((res,err) => {
      console.log(res);
    }).catch(err =>{
      console.log(err);
    });
 
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="inputEmail">E-mail</label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          ref={register({
            required: "Enter your e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
        />
        {/* {errors.email && <p className="error">{errors.email.message}</p>} */}

        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          ref={register({ required: "Enter your password" })}
        />
        {/* {errors.password && <p className="error">{errors.password.message}</p>} */}

        <button type="submit" >Login</button>
        
        <button id="bt" type="button">Register</button>
        
      </form>
      
      
    </div>
    
  );
};

export default LoginForm;
