import React, { useState } from "react";
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

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    if(!isLoginMode){
        setFormData({
            ...formState.inputs,
            name:undefined
        },formState.inputs.email.isValid && formState.inputs.password.isValid)
    }else{
        setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            }
        },false);
    }

    setIsLoginMode((prevMode) => !prevMode);

  };

  const [formState, inputHandler,setFormData] = useForm(
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
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("user has successfully logged in");
  };

  return (
    <Card className="authentication">
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
          {isLoginMode ? 'LogIn':'SignUp'}
        </Button>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Switch to SignUp" : "Switch to Login"}
        </Button>
      </form>
    </Card>
  );
};
export default Auth;
