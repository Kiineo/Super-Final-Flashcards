import React, { useEffect, useState, Fragment } from "react";

import {
  Link,
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { readDeck } from "../utils/api";
import { readCard } from "../utils/api";
import CardComponet from "../Componets/CardComponet";
import Header from "../Layout/Header";

function EditCardMain({ header, initialFormData, submitHandler }) {
  const history = useHistory();
  const { deckId } = useParams();
  const { cardId } = useParams();
  const { url } = useRouteMatch();

  const [Cards, setCards] = useState([]);
  const [Title, setTitle] = useState([]);
  const [Description, setDescription] = useState([]);

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setTitle(response.name);
      setDescription(response.description);
      setCards(response.cards);
      console.log(response.cards[cardId]);
      readCard(cardId).then((response) => {
        setFormData(response);
      });
      // const found = response.cards.find(element => element.id == cardId );
      // console.log(found)
      // setFormData(found);
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
    // console.log("hello")
    event.preventDefault();
    console.log(formData);
    // using the prop to pass the information back to the App component
    submitHandler(formData).then(() => history.push(`/decks/${deckId}`));
    setFormData({ ...initialFormData });
  }
  return (
    <React.Fragment>
      <Header />
      <CardComponet
        handleFormSubmit={handleFormSubmit}
        header={header}
        deckId={deckId}
        Title={Title}
        cardId={cardId}
        formData={formData}
        handleInput={handleInput}
      />
      <NavLink to={`/decks/${deckId}`}>
        <button> Cancel </button>
      </NavLink>
    </React.Fragment>
  );
}

export default EditCardMain;
