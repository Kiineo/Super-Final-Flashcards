import React, { useEffect, useState, Fragment } from "react";

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
import { createDeck } from "../utils/api";

function CreateDeck({ header, initialFormData, submitHandler, Decks }) {
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);
  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleFormSubmit(event){
    event.preventDefault();
    createDeck(formData)
        .then(res => {
            history.push(`/decks/${res.id}`)  
        })
}

  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   submitHandler(formData).then((response) => {
  //     setFormData({ ...initialFormData });
  //     history.push(`/decks/${response.id}`);
  //   });
  // }

  return (
    <React.Fragment>
      <Header />
      <form onSubmit={handleFormSubmit}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
        <h3>{header}</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInput}
        />
        <label htmlFor="Description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInput}
        />
        <button type="submit" >Submit</button>
        <NavLink to={`/`}>
          <button> Cancel </button>
        </NavLink>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;
