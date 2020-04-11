import React from "react";
import Input from "../../shared/components/form-elements/input/input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators/validators";
import Button from "../../shared/components/form-elements/button";
import {useForm} from "../../shared/custom-hooks/form-hook";
import "./new-places.scss";

const NewPlace = () => {
  const [formState,inputHandler] =useForm(/* Object destructuring - according to (custom)form-hook -> useForm function, it return the formState and inputHandle. so using destructuring we can catch their values easily.  */
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address:{
        value:"",
        isValid:false
      }
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        onInput={inputHandler}
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="something went worong!"
        validators={[VALIDATOR_REQUIRE()]}
      ></Input>
      <Input
        onInput={inputHandler}
        id="description"
        element="textArea"
        type="textArea"
        label="Description"
        errorText="Minimum 3 characters needed!"
        validators={[VALIDATOR_MINLENGTH(3)]}
      ></Input>
      <Input
        onInput={inputHandler}
        id="address"
        element="input"
        type="textArea"
        label="Address"
        errorText="Addres is Required"
        validators={[VALIDATOR_REQUIRE()]}
      ></Input>
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
