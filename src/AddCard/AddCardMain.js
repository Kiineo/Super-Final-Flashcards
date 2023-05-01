import React, { useEffect, useState, Fragment } from "react";

import {
  Link,
  NavLink,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { readDeck } from "../utils/api";
import CardComponet from "../Componets/CardComponet";
import Header from "../Layout/Header";

function AddCard({ header, initialFormData, submitHandler }) {
  const history = useHistory();
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [Cards, setCards] = useState([]);
  const [Title, setTitle] = useState([]);
  const [Description, setDescription] = useState([]);

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setTitle(response.name);
      setDescription(response.description);
      setCards(response.cards);
      console.log(Cards);
    });
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formData);
    // using the prop to pass the information back to the App component
    submitHandler(deckId, formData);
    setFormData({ ...initialFormData });
    history.push(`/decks/${deckId}`);
  }
  return (
    <React.Fragment>
      <Header />
      <CardComponet
        handleFormSubmit={handleFormSubmit}
        header={header}
        deckId={deckId}
        Title={Title}
        formData={formData}
        handleInput={handleInput}
      />
      <NavLink to={`/decks/${deckId}`}>
        <button> Done </button>
      </NavLink>
    </React.Fragment>
  );
}

export default AddCard;
