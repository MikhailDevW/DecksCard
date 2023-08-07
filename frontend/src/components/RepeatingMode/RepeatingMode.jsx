import React, { useEffect, useState } from "react";
import './RepeatingMode.css';
import { useSelector, useDispatch } from 'react-redux';
import { addNewDeck, removeCard, editCard, deleteDeck, editDeck, getDeckCardsInfo } from '../../services/actions/cards.js';
import { setCurrentDeck, setCurrentWord } from '../../services/actions/currentDeck.js';

import dots from '../../images/dots.png';

function RepeatingMode(props) {
  
  const {setAddDeckModalIsOpen, setEditDeckModalIsOpen, setAddWordModalIsOpen, setEditWordModalIsOpen, setRepeatMode} = props;
  const dispatch = useDispatch();
  const { decks, deckCards } = useSelector(state => state.cardsReducer);
  const [showWord, setShowWord] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentWord1, setCurrentWord1] = useState({});
  const [repeatingForm, setMeaning] = useState({ word: '' });
  const [repeatedWords, setRepeatedWords] = useState([]);
  const [wordsToRepeat, setWordsToRepeat] = useState([]);
  const repeatingInput = document.getElementById('cardsHolderRepeatingInput');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { currentDeck } = useSelector(state => state.currentDeckReducer);
  //const { currentDeck, currentWord } = useSelector(state => state.currentDeckReducer);

  function removeDeck() {
    dispatch(deleteDeck(currentDeck.slug));
    dispatch(setCurrentDeck(decks[0]));
  }

  function editCurrentDeck() {
    setEditDeckModalIsOpen(true);
  }


  useEffect(()=> {
    if (deckCards && deckCards !== []) 
    {setWordsToRepeat(deckCards);
    setCurrentWord1(deckCards[0]);}
  }, [])

  useEffect(()=> {
    if (deckCards && deckCards !== []) {
      setWordsToRepeat(deckCards);
      setCurrentWord1(deckCards[0]);
    }
  }, [deckCards])

  useEffect(()=> {
    console.log(currentDeck)
  }, [])

  function showTranslation() {
    setShowWord(true);
  };

  const onRepeatChange = e => {
    setMeaning({ ...repeatingForm, [e.target.name]: e.target.value });
  };

  function stopRepeating() {
    setShowWord(false);
    setIsCorrect(false);
    setMeaning({ ...repeatingForm, word: '' });
    setRepeatMode(false)
  }

  function word() {
    return (
    <>
      {currentWord1 && currentWord1 !== {} &&
      <p className="repeatingMode__title">
        {currentWord1.back_side}
      </p>
      }
      {showWord && 
      <>
        {currentWord1 && currentWord1 !== {} && 
        <>
          <p className="cardsHolder__name">
            {currentWord1.front_side}
          </p>
          <p>
            Рекомендуем напечатать правильный вариант все равно: так он лучше запомнится
          </p>
        </>}
      </>}
    </>
    )
  }

  function openMenu() {
    setMenuOpen(!isMenuOpen)
  }

  useEffect(()=> {
    if (repeatingInput && (currentWord1.front_side === repeatingForm.word)) 
    {setIsCorrect(true);
    repeatingInput.classList.add('repeatingMode__input_active');};
    if (repeatingInput && (currentWord1.front_side !== repeatingForm.word) && isCorrect) {
      setIsCorrect(false);
      repeatingInput.classList.remove('repeatingMode__input_active');};
  }, [repeatingForm])

  function nextWord1() {
    setRepeatedWords([...repeatedWords, currentWord1]);
    setShowWord(false);
    setIsCorrect(false);
    setMeaning({ ...repeatingForm, word: '' });
    repeatingInput.classList.remove('repeatingMode__input_active');
    if (wordsToRepeat.length > 1) {setCurrentWord1(wordsToRepeat[1]); 
    setWordsToRepeat(wordsToRepeat.slice(1));}
    else {setCurrentWord1({front_side: 'Правда все. Добавьте новые карточки (или подождите, пока мы добавим кнопку "Начать заново"', back_side: 'Вы повторили все!'})}
  }


  return (
    <section className="repeatingMode">
      <div className="repeatingMode__deckCover">
        <div className="repeatingMode__cover">
          <div className="repeatingMode__dotsBlock">
          <p className="repeatingMode__number">{`#${currentDeck.number}`}</p>
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

          <h3 className="repeatingMode__name">{currentDeck.title}</h3>
          <p className="repeatingMode__count">{deckCards.amount}</p>
          <p className="repeatingMode__text">REVIEWS</p>
          <p className="repeatingMode__count">{currentDeck.cards_per_day}</p>
          <p className="repeatingMode__text">TO LEARN</p>
        </div>
      </div>
      <div className='repeatingMode__form'>
        <div>
          {word()}
        </div>
        <input 
          placeholder="PRINT MEANING HERE" 
          value={repeatingForm.word} 
          id='cardsHolderRepeatingInput'
          type="text"
          name="word" 
          onChange={onRepeatChange}
          required
          className='repeatingMode__input'
          autoComplete="off" />
        <div className='repeatingMode__button-block'>
          <button 
            className='repeatingMode__button'
            onClick={showTranslation}>
              SHOW WORD
          </button>
          <button 
            className='repeatingMode__button'
            onClick={stopRepeating}>
              FINISH REPEATING
          </button>
          <button 
            className='repeatingMode__button'
            onClick={nextWord1}>
              NEXT ONE
          </button>
        </div>
      </div>
      <div className="repeatingMode__imgBlock">
      </div>
    </section>
  );
}  

export default RepeatingMode;
