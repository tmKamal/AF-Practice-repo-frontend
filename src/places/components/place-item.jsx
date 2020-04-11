import React, { useState } from "react";
import Card from "../../shared/components/UIElements/card/card";
import Button from "../../shared/components/form-elements/button";
import "./place-item.scss";
import Modal from "../../shared/components/UIElements/model/model";
import Map from "../../shared/components/UIElements/map/map";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfiramationHandeler = () => setDeleteConfirmation(true);
  const closeDeleteConfirmationHandler = () => setDeleteConfirmation(false);
  const deletehandler=()=>{
    console.log("Deleting.....");
    closeDeleteConfirmationHandler();
  }
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map zoom={14} center={props.coordinates} />
        </div>
      </Modal>

      <Modal show={showDeleteConfirmation} 
      onCancel={closeDeleteConfirmationHandler}
      header="Are you Sure!"
      contentClass="place-item__modal-content"
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
          <Button onClick={closeDeleteConfirmationHandler}>Close</Button>
          <Button onClick={deletehandler}>Delete</Button>

        </React.Fragment>
    
    }
      ><p>This can't be undone!</p></Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler} inverse>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button onClick={openDeleteConfiramationHandeler} danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
