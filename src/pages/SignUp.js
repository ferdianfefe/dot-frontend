import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./SignUp.scss";
import { signup } from "../actions/auth";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const [signedUp, setSignedUp] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    let { name, username, email, password } = data;

    dispatch(signup(name, username, email, password))
      .then((data) => {
        setSignedUp(true);
      })
      .catch((error) => {
        console.log(error);
        setError("confirmPassword", {
          type: "duplicate",
          message: error,
        });
      });
  };

  return (
    <div className="sign-up-full-container">
      {signedUp && <Navigate to="/signin" />}
      <h2 className="sign-up-text">SIGN UP</h2>
      <div className="sign-up-container p-2">
        <form className="sign-up-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <h4 className="input-text">Name :</h4>
            <div className="input-icon">
              <div className="icon">
                <i className="far fa-user"></i>
              </div>
              <input
                {...register("name", {
                  required: "Name field cannot be empty",
                })}
                type="text"
                className="input-box"
                placeholder="wealwaysloveu"
              />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <small className="color-error">{message}</small>
            )}
          />
          <div className="input-wrapper">
            <h4 className="input-text">Email :</h4>
            <div className="input-icon">
              <div className="icon">
                <i className="far fa-envelope"></i>
              </div>
              <input
                {...register("email", {
                  required: "Email field cannot be empty",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
                type="email"
                className="input-box"
                placeholder="loveuall@rocketmail.com"
              />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <small className="color-error">{message}</small>
            )}
          />
          <div className="input-wrapper">
            <h4 className="input-text">Username :</h4>
            <div className="input-icon">
              <div className="icon">
                <i className="far fa-user"></i>
              </div>
              <input
                {...register("username", {
                  required: "Username field cannot be empty",
                })}
                type="text"
                className="input-box"
                placeholder="johndoe"
              />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <small className="color-error">{message}</small>
            )}
          />
          <div className="input-wrapper">
            <h4 className="input-text">Password :</h4>
            <div className="input-icon">
              <div className="icon">
                <i className="fas fa-lock"></i>
              </div>
              <input
                {...register("password", {
                  required: "Password field cannot be empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type="Password"
                className="input-box"
                placeholder="**********"
              />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <small className="color-error">{message}</small>
            )}
          />
          <div className="input-wrapper">
            <h4 className="input-text">Repeat Password :</h4>
            <div className="input-icon">
              <div className="icon">
                <i className="fas fa-lock"></i>
              </div>
              <input
                {...register("confirmPassword", {
                  required: "Confirm password field cannot be empty",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Password does not match",
                })}
                type="Password"
                className="input-box"
                placeholder="**********"
              />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => (
              <small className="color-error">{message}</small>
            )}
          />
          <button className="btn--" type="submit">
            SIGN UP
          </button>
          <h6 className="login-txt">
            Already have an account? <Link to="/signin"> Sign In </Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
