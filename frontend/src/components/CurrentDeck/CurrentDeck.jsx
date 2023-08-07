import React, { useEffect, useState } from "react";
import './CurrentDeck.css';
import DeckCover from '../DeckCover/DeckCover.jsx';
import CurrentWord from '../CurrentWord/CurrentWord.jsx';
import add from '../../images/add_button.png';
import dots from '../../images/dots.png';
import find from '../../images/find.png';
import greenplus from '../../images/greenplus.svg';
import { addNewDeck, removeCard, editCard, deleteDeck, editDeck, getDeckCardsInfo } from '../../services/actions/cards.js';
import { setCurrentDeck, setCurrentWord } from '../../services/actions/currentDeck.js';
import { useSelector, useDispatch } from 'react-redux';

function CurrentDeck(props) {

  //const { cards } = useSelector(state => state.cardsReducer);
  const {setAddDeckModalIsOpen, setEditDeckModalIsOpen, setAddWordModalIsOpen, setEditWordModalIsOpen, setRepeatMode} = props;
  const { currentDeck, currentWord } = useSelector(state => state.currentDeckReducer);
  const { decks, deckCards } = useSelector(state => state.cardsReducer);
  const dispatch = useDispatch();
  const [searchForm, setSearchFormValue] = useState({ search: '' });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [arrToSearch, setArrToSearch] = useState([]);


  useEffect(() => {
    dispatch(getDeckCardsInfo(currentDeck.slug))
  }, [currentDeck])

  useEffect(() => {
   console.log(currentDeck);
   console.log(arrToSearch)
  }, [currentDeck])

  useEffect(() => {
    if (deckCards && deckCards !== null &&  deckCards.length !== 0)
    {setArrToSearch(deckCards)};
    if (currentDeck && deckCards && deckCards.length === 0) {console.log('0'); setArrToSearch([]);}
  }, [currentDeck, deckCards])

  useEffect(() => {
    console.log(arrToSearch)
  }, [arrToSearch])

  useEffect(() => {
    /*setArrToSearch(arrToSearch.map(item => item.test(searchForm.search)))*/
    if (deckCards && deckCards !== null) {
      console.log(arrToSearch);
      console.log(searchForm.search);
      setArrToSearch(deckCards.filter(item => {if (item.front_side.includes(searchForm.search)) return item; else return}));}
    if (searchForm.search === '') setArrToSearch(deckCards);
    if (currentDeck && deckCards && deckCards.length === 0) {console.log('0'); setArrToSearch([]);}
  }, [searchForm.search])

  
  const onAddNewDeckChange = e => {
    setSearchFormValue({ ...searchForm, [e.target.name]: e.target.value });
  };

  function showAddWordForm() {
    setAddWordModalIsOpen(true);
  }

  function removeDeck() {
    dispatch(deleteDeck(currentDeck.slug));
    dispatch(setCurrentDeck(decks[0]));
  }

  function editCurrentDeck() {
    setEditDeckModalIsOpen(true);
  }

  function startRepeating() {
    setRepeatMode(true);
  }

  function chooseWord(item) {
    console.log(item);
    dispatch(setCurrentWord(item));
  }

  function openMenu() {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <section id="currentDeck" className="currentDeck1">
        <div className="currentDeck">
          <div className='currentDeck__dotsBlock'>
            <h3 className="currentDeck__number">
              #{currentDeck.number}
            </h3>
            <img 
              className="currentDeck__dots-img" 
              src={dots} 
              alt="Dots"
              onClick={openMenu}/>
            {isMenuOpen && 
              <div className="currentDeck__menu">
                <p onClick={editCurrentDeck} className="currentDeck__menuText">
                  EDIT
                </p>
                <p onClick={removeDeck} className="currentDeck__menuText">
                  DELETE
                </p>
              </div>
            }
          </div>
          <h2 className="currentDeck__title">{currentDeck.title}</h2>  
          <label className="currentDeck__input-container">
            <input 
              placeholder="Searching for words" 
              value={searchForm.search} 
              name="search" 
              onChange={onAddNewDeckChange}
              type="text"
              className='currentDeck__input'
              autoComplete="none" 
              id="search_input" 
              list="huge_list"
              />
            <img 
              className="currentDeck__find-img" 
              src={find} 
              alt="Лупа"
            />
          </label>

          <div className="currentDeck__button-container">
            <button 
              type="button" 
              className="addNewDeckForm__addButton addNewDeckForm__button-disabled"
              onClick={showAddWordForm}>
              ADD
              <img 
              className="currentDeck__plus-img" 
              src={greenplus} 
              alt="Dots"/>
            </button>
          </div>
        {currentWord && currentWord !== null &&
          <CurrentWord 
          setEditWordModalIsOpen={setEditWordModalIsOpen}/>
        }
        </div>
        <div className="cardsHolder__wordsContainer">
          {deckCards !== null && arrToSearch && arrToSearch !== null && arrToSearch.map((item, i) => (
            <p 
              key={i} 
              item={item} 
              className="currentDeck__word"
              onClick={e => chooseWord(item)}>
                {item.front_side}
            </p>
          ))
        }
      </div>
      {currentDeck && deckCards && deckCards.length > 0 &&
      <button
          onClick={startRepeating}
          className="currentDeck__repeatButton">
          REPEAT
        </button>
      }
      </section>
      
    </>
  );
}  

export default CurrentDeck;

/*
            <div className="currentDeck__options">
              {((arrToSearch !== [] )  
              && arrToSearch1.map((item, i) => (
                <>
                  <option key={i} value={item}>
                    {item}
                  </option>
                </>
              )))}
            </div>
            */
