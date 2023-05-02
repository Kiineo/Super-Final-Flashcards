import React, { Fragment, useEffect, useState } from "react";

import {
  Link,
  NavLink,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Header from "../Layout/Header";
import { readDeck } from "../utils/api/index";
import { deleteCard } from "../utils/api/index";
import { deleteDeck } from "../utils/api/index";
import { readCard } from "../utils/api/index";

export const StudyCardsMain = (Decks) => {
  // const history = useHistory();
  // const { deckId } = useParams();
  // const { url } = useRouteMatch();

  // const [Cards, setCards] = useState([]);
  // const [Title, setTitle] = useState([]);
  // const [Description, setDescription] = useState([]);

  // useEffect(() => {
  //   readDeck(deckId).then((response) => {
  //     setTitle(response.name);
  //     setDescription(response.description);
  //     setCards(response.cards);
  //     console.log(Cards);
  //   });
  // }, []);

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

      // const found = response.cards.find(element => element.id == cardId );
      // console.log(found)
      // setFormData(found);
    });
  }, []);

  function deleteCardHandler(cardId) {
    console.log("cardId", cardId);
    let confirmationMessage = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmationMessage) {
      deleteCard(cardId).then((response) => {
        history.go(0);
      });
    } else {
      history.go(0);
    }
  }

  function deleteDeckHandler() {
    let confirmationMessage = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmationMessage) {
      deleteDeck(deckId).then((response) => {
        history.push("/");
        history.go(0);
      });
    }
  }

  const cardForm = Cards.map((v, idx) => {
    console.log(v.id);
    let cardId = v.id;
    // let key = v.id;
    // let cardId = v.id;
    //     // readCard(cardId).then((response) => {
    //     //   let frontCard = response.front;
    //     //   let backCard = response.back;
    //     // });
    return (
      <div key={idx}>
        <div className="card" style={{ width: 1000 }}>
          <div className="row">
            <div className="column card-body">{v.front}</div>
            <div className="column card-body">{v.back}</div>
          </div>
        </div>
        <NavLink to={`/decks/${deckId}/cards/${cardId}/edit`}>
          <button> Edit </button>
        </NavLink>
        <button onClick={() => deleteCardHandler(cardId)}>Delete</button>
      </div>
    );
  });

  return (
    <Fragment>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {Title}
          </li>
        </ol>
      </nav>
      <h1>{Title}</h1>
      <h3>{Description}</h3>
      <NavLink to={`/decks/${deckId}/edit`}>
        <button> Edit </button>
      </NavLink>
      <NavLink to={`/decks/${deckId}/study`}>
        <button> Study </button>
      </NavLink>
      <NavLink to={`/decks/${deckId}/cards/new`}>
        <button> + Add Cards </button>
      </NavLink>
      <button onClick={deleteDeckHandler}>Delete</button>
      <h1>Cards</h1>
      {cardForm}
    </Fragment>
  );
};

export default StudyCardsMain;
