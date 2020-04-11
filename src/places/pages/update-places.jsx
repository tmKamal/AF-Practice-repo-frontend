import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/form-elements/input/input";
import Button from "../../shared/components/form-elements/button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators/validators";
import { useForm } from "../../shared/custom-hooks/form-hook";
import Card from "../../shared/components/UIElements/card/card";
import "./update-places.scss";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    /* useEffect ussed for stop the infinite loop , now it wil only rerender due to dependancies */
    if (identifiedPlace) {
      setFormData(
        {
          /* this function is for loading the data from back end, using this function we can wait till the backend send its data. */
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
      setIsLoading(false);
    }
  }, [setFormData, identifiedPlace]);

  const formSubmitter = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Coudn't find the place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>loading</h2>
      </div>
    );
  }
  return (
    <form onSubmit={formSubmitter} className="place-form">
      <Input
        initialValue={formState.inputs.title.value}
        initailValidity={formState.inputs.title.isValid}
        onInput={inputHandler}
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
      ></Input>
      <Input
        initialValue={formState.inputs.description.value}
        initialValidity={formState.inputs.description.isValid}
        onInput={inputHandler}
        id="description"
        element="textArea"
        type="textArea"
        label="Description"
        errorText="Please enter 3 or more characters"
        validators={[VALIDATOR_MINLENGTH(3)]}
      ></Input>
      <Button type="submit" disabled={!formState.isValid}>
        Edit
      </Button>
    </form>
  );
};
export default UpdatePlace;
