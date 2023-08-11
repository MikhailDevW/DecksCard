import React, { useEffect, useState } from "react";
import './CurrentWord.css';
import DeckCover from '../DeckCover/DeckCover.jsx';
import RepeatingMode from '../RepeatingMode/RepeatingMode.jsx';
import add from '../../images/add_button.png';
import dots from '../../images/dots.png';
import find from '../../images/find.png';
import { deleteCard } from '../../services/actions/cards.js';
import { setCurrentDeck, setCurrentWord, removeCurrentWord } from '../../services/actions/currentDeck.js';
import { useSelector, useDispatch } from 'react-redux';

function CurrentWord(props) {

  //const { cards } = useSelector(state => state.cardsReducer);
  const {setEditWordModalIsOpen} = props;
  const { currentDeck, currentWord  } = useSelector(state => state.currentDeckReducer);
  const { decks, deckCards } = useSelector(state => state.cardsReducer);
  const dispatch = useDispatch();

  function removeDeck() {
    dispatch(deleteCard(currentDeck.slug, currentWord.id));
    dispatch(removeCurrentWord());
  }

  function editCurrentWord() {
    setEditWordModalIsOpen(true);
  }

  return (
    currentWord && 
    <>
      <div className='currentWord__wordBlock'>
        <p 
          className="currentDeck__word">
          {currentWord.front_side}
        </p>
        <p 
          className="currentDeck__word">
          {currentWord.back_side}
        </p>
        {currentWord.example !== '' && currentWord.example !== ' ' &&
        <p 
          className="currentDeck__word">
          {currentWord.example}
        </p>
        }
      </div>
      <div className="currentDeck__button-container">
        <button 
          type="button" 
          className="addNewDeckForm__addButton addNewDeckForm__button-disabled"
          onClick={editCurrentWord}
          >
          EDIT
        </button>
        <button 
          type="button" 
          className="addNewDeckForm__addButton addNewDeckForm__button-disabled"
          onClick={removeDeck}>
          DELETE
        </button> 
      </div>
    </>
  )
}  

export default CurrentWord;
