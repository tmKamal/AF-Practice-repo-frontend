import React, { useState, useContext } from "react";
import Input from "../../shared/components/form-elements/input/input";
import "./auth.scss";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators/validators";
import { useForm } from "../../shared/custom-hooks/form-hook";
import Button from "../../shared/components/form-elements/button";
import Card from "../../shared/components/UIElements/card/card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/model/error-model";
import LoadingSpinner from "../../shared/components/UIElements/loading-spinner/loading-spinner";

const Auth = () => {
  const auth = useContext(AuthContext); //useContext is a special one, which will help us to pass some data obj without using props. we can use it like session.

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        /* fetch is not handles the error throwing from backend as 404, 500, etc.
           because they are also a valid response.
           so we have to handle them manually.
        */
        const response = await fetch("http://localhost:8000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({//json to js
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          
          throw new Error(responseData.message); // this will execute the catch block.
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login(); //we called the login function of the auth-context. actullly its a empty function, but we have declared its values in app.js
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "something went wrong!!!");
      }
    } else {
      //SIGN UP
      try {
        /* fetch is not handles the error throwing from backend as 404, 500, etc.
           because they are also a valid response.
           so we have to handle them manually.
        */
        const response = await fetch("http://localhost:8000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log("whhhayyyy");
          throw new Error(responseData.message); // this will execute the catch block.
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login(); //we called the login function of the auth-context. actullly its a empty function, but we have declared its values in app.js
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "something went wrong!!!");
      }
    }
  };

  const errorModalCloser=()=>{
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorModalCloser}></ErrorModal>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <h2>Login Required</h2>
        <hr></hr>
        <form onSubmit={submitHandler}>
          {!isLoginMode && (
            <Input
              onInput={inputHandler}
              id="name"
              element="input"
              type="text"
              label="Your Name"
              errorText="Please enter a valid Name"
              validators={[VALIDATOR_REQUIRE()]}
            ></Input>
          )}
          <Input
            onInput={inputHandler}
            id="email"
            element="input"
            type="email"
            label="Email"
            errorText="Please enter a valid email"
            validators={[VALIDATOR_EMAIL()]}
          ></Input>
          <Input
            onInput={inputHandler}
            id="password"
            element="input"
            type="password"
            label="Password"
            errorText="Minnimum length is 3 characters."
            validators={[VALIDATOR_MINLENGTH(3)]}
          ></Input>
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LogIn" : "SignUp"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Switch to SignUp" : "Switch to Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};
export default Auth;
