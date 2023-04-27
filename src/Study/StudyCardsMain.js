import React, { Fragment, useEffect, useState } from "react";

import {
  Link,
  NavLink,
  Route,
  Switch,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Header from "../Layout/Header";
import { readDeck } from "../utils/api/index";

export const StudyCardsMain = (Decks) => {
  const history = useHistory();

  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  function clickHandler() {
    if (currentCardIdx <= Cards.length) {
      setCurrentCardIdx(currentCardIdx + 1);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page"
        )
      ) {
        setCurrentCardIdx(currentCardIdx - Cards.length);
      } else {
        history.push("/");
      }
    }
  }

  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [Cards, setCards] = useState([]);
  const [Title, setTitle] = useState([]);
  const [CurrentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    readDeck(deckId).then((response) => {
      setTitle(response.name);
      setCards(response.cards);
      setCurrentDeck(response.deckId);
    });
  }, [deckId]);

  function notEnoughCards() {
    return (
      <div>
        <h1>Not Enough Cards</h1>
        <h2>
          You need at least 3 cards to study. There are {Cards.length} cards in
          this deck.
        </h2>
        <NavLink to={`/decks/${deckId}/cards/new`}>
          <button> + Add Cards </button>
        </NavLink>
      </div>
    );
  }
  let collectionOfCards = [];
  Cards.map((card, idx) => {
    let frontCard = (
      <div key={card.id + idx}>
        <div className="card" style={{ width: 1000 }}>
          <h5 className="card-title">
            {" "}
            Card {idx + 1} of {Cards.length}
          </h5>
          <div className="card-body">{card.front}</div>
        </div>
        <button onClick={clickHandler}>Flip</button>
      </div>
    );
    let backCard = (
      <div key={card.id}>
        <div className="card" style={{ width: 1000 }}>
          <h5 className="card-title">
            {" "}
            Card {idx + 1} of {Cards.length}
          </h5>
          <div className="card-body">{card.back}</div>
        </div>
        <button onClick={clickHandler}>Next</button>
      </div>
    );
    collectionOfCards.push(frontCard);
    collectionOfCards.push(backCard);
  });

  function whichToDisplay() {
    console.log(Cards?.length);
    if (Cards?.length < 3) {
      return notEnoughCards();
    } else {
      return collectionOfCards[currentCardIdx];
    }
  }

  return (
    <Fragment>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{Title}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <h1>Study:{Title}</h1>
      {whichToDisplay()}
    </Fragment>
  );
};

export default StudyCardsMain;
