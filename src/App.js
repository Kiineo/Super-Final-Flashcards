import React, { Fragment, useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout/index";
import StudyCardsMain from "./Study/StudyCardsMain";
import DeckProfileMain from "./DeckProfile/DeckProfileMain";
import CreateDeck from "./CreateDeck/CreateDeck";
import AddCardMain from "./AddCard/AddCardMain";
import { listDecks } from "./utils/api/index";
import EditDeck from "./EditDeck/EditDeck";
import EditCardMain from "./EditCard/EditCardMain";
import { createDeck } from "./utils/api/index";
import { updateDeck } from "./utils/api/index";
import { createCard } from "./utils/api/index";
import { updateCard } from "./utils/api/index";
import Study from "./Study/Study"
import NotFound from "./Layout/NotFound";
// import CardList from "./home/CardList";
// import User from "./user/User";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const [Decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  function addDeck(newDeck) {
    createDeck(newDeck).then(() => listDecks().then(setDecks));
  }

  function addCard(deckId, newCard) {
    createCard(deckId, newCard).then(() => listDecks().then(setDecks));
  }

  function replaceDeck(newDeck) {
    return updateDeck(newDeck).then(() => listDecks().then(setDecks));
  }

  function replaceCard(newCard) {
    return updateCard(newCard).then(() => listDecks().then(setDecks));
  }

  let initialDeckData = {
    name: "",
    description: "",
  };

  let initialCardData = {
    front: "",
    back: "",
  };

  return (
    <Fragment>
      <div className="app-routes">
        <Switch>
          <Route exact path="/">
            <Layout Decks={Decks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck
              Decks={Decks}
              submitHandler={addDeck}
              header="Create Deck"
              initialFormData={initialDeckData}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCardMain
              submitHandler={addCard}
              header="Add Card"
              initialFormData={initialCardData}
            />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckProfileMain Decks={Decks} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck
              Decks={Decks}
              submitHandler={replaceDeck}
              header="Edit Deck"
              initialFormData={initialCardData}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCardMain
              Decks={Decks}
              submitHandler={replaceCard}
              header="Edit Card"
              initialFormData={initialCardData}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
