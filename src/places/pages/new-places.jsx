import React, { useContext } from "react";
import {useHistory} from "react-router-dom";// to redirect the user to new location
import Input from "../../shared/components/form-elements/input/input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators/validators";
import Button from "../../shared/components/form-elements/button";
import { useForm } from "../../shared/custom-hooks/form-hook";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/model/error-model";
import LoadingSpinner from "../../shared/components/UIElements/loading-spinner/loading-spinner";
import "./new-places.scss";

const NewPlace = () => {
  const history=useHistory();// to redirect the user to new location.
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [formState, inputHandler] = useForm(
    /* Object destructuring - according to (custom)form-hook -> useForm function, it return the formState and inputHandle. so using destructuring we can catch their values easily.  */
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:8000/api/places/",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {'Content-Type':'application/json'}
      );
      console.log(formState.inputs);
      history.push('/'); //redirecting user to main page
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
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
    </React.Fragment>
  );
};

export default NewPlace;
