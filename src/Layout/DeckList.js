import React, { useEffect, useState, Fragment } from "react";

import {
  Link,
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import StudyCardsMain from "../Study/StudyCardsMain";
import CreateDeck from "../CreateDeck/CreateDeck";
import Deck from "./Deck";

function DeckList({ Decks }) {
  // console.log(Decks);
  const list = Decks.map((deck, idx) => {
    console.log(deck);
    return <Deck deckId={deck.id} key={`${deck.id}${idx}`} deck={deck} />;
  });
  // const studyList = Decks.map((deck) => (
  //   <StudyCardsMain key={deck.id} deck={deck} />
  // ));

  return (
    <React.Fragment>
      <main className="container">
        <NavLink to={`/decks/new`}>
          <button> + Create Deck </button>
        </NavLink>
        <section className="row">{list}</section>
      </main>
    </React.Fragment>
  );
}

export default DeckList;
