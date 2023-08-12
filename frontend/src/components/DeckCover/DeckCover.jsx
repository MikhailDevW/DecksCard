<<<<<<< HEAD
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../services/actions/currentDeck.js';
import './deckCover.css';

function DeckCover(props) {
  const {item, index} = props;
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(true);

  function handleClick1() {
    dispatch(setCurrentDeck(item, index))
  }

  return (
    <div className="deckCover" onClick={handleClick1}>
      <div className="deckCover__cover">
        <p className="deckCover__number">{`#${index + 1}`}</p>
        <h3 className="deckCover__name">{item.title}</h3>
        <p className="deckCover__count">{item.amount}</p>
        <p className="deckCover__text">REVIEWS</p>
        <p className="deckCover__count">{item.cards_per_day}</p>
        <p className="deckCover__text">TO LEARN</p>
      </div>
    </div>
  );
}  

export default DeckCover;
=======
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../services/actions/currentDeck.js';
import './deckCover.css';

function DeckCover(props) {
  const {item, index} = props;
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(true);

  function handleClick1() {
    dispatch(setCurrentDeck(item, index))
  }

  return (
    <div className="deckCover" onClick={handleClick1}>
      <div className="deckCover__cover">
        <p className="deckCover__number">{`#${index + 1}`}</p>
        <h3 className="deckCover__name">{item.title}</h3>
        <p className="deckCover__count">{item.amount}</p>
        <p className="deckCover__text">REVIEWS</p>
        <p className="deckCover__count">{item.cards_per_day}</p>
        <p className="deckCover__text">TO LEARN</p>
      </div>
    </div>
  );
}  

export default DeckCover;
>>>>>>> 6e74c0a3aec6ba4adcc65121d292aafa40b04daf
