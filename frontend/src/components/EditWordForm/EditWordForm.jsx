import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './EditWordForm.css';
import { addNewDeck, removeCard, editCard, addNewCard } from '../../services/actions/cards.js';
import { useSelector, useDispatch } from 'react-redux';

function EditWordForm (props) {
  const {editWordModalIsOpen, closeEditWordModal} = props;
  const dispatch = useDispatch();
  const { decks } = useSelector(state => state.cardsReducer);
  const { currentDeck, currentWord } = useSelector(state => state.currentDeckReducer);
  const [form, setValue] = useState({front_side: '', back_side: '', prompt: '', example: '' });
  const [deckSlug, setDeckSlug] = useState('');
  const titleInput = document.getElementById('titleEditFormInput');
  const descriptionInput = document.getElementById('descriptionEditFormInput');
  const submitButton = document.getElementById('buttonSubmitEditWordForm');
  const titleErrorSpan = document.getElementById('titleSpanEditForm');
  const descriptionErrorSpan = document.getElementById('descriptionSpanEditForm');

  /*function validate() {
    if(titleInput && descriptionInput && !(titleInput.validationMessage || descriptionInput.validationMessage)) 
    return (submitButton.classList.remove('editProfileForm__button-disabled'), submitButton.classList.add('editProfileForm__button-active', 'button_type_primary'), submitButton.disabled = false); 
    else if (titleInput && descriptionInput) return (submitButton.classList.remove('editProfileForm__button-active', 'button_type_primary'), submitButton.classList.add('editProfileForm__button-disabled'), submitButton.disabled = true)
  }*/

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    //validate()
  };

  useEffect(()=> {
    if (editWordModalIsOpen) {
      setDeckSlug(currentDeck.slug);
      setValue({front_side: currentWord.front_side, back_side: currentWord.back_side, prompt: currentWord.prompt, example: currentWord.example })
    }
  }, [editWordModalIsOpen])

  /*useEffect(()=> {
    if (addDeckModalIsOpen) {
    setValue({ ...form, title: `DECK #${decks.length + 1}`, descriptionInput: '' });
    titleInput.placeholder = `DECK #${decks.length + 1}`;
  }
    if (addDeckModalIsOpen && submitButton !== null) {
      submitButton.classList.remove('editProfileForm__button-active', 'button_type_primary');
      submitButton.classList.add('editProfileForm__button-disabled');
      submitButton.disabled = true;
    };
  if (addDeckModalIsOpen && titleErrorSpan && titleErrorSpan.textContent !== null) {
    titleErrorSpan.textContent = ''; 
  }
  if (addDeckModalIsOpen && descriptionErrorSpan && descriptionErrorSpan.textContent !== null) {
    descriptionErrorSpan.textContent = ''; 
  }
  }, [addDeckModalIsOpen])*/

  function handleSubmit(e) {
    e.preventDefault();
    console.log({deckSlug, form});
    console.log(form);
    console.log(currentWord.id);
    dispatch(editCard(deckSlug, currentWord.id, form));
    closeEditWordModal()
  }

  return(
    <div className="addNewDeckForm">
      <h2 className="addNewDeckForm__title">
        EDIT WORD
      </h2>
      <div className="addNewDeckForm__container">
        <form 
          onSubmit={handleSubmit} 
          className="addNewDeckForm__form">
          <label className="addNewDeckForm__label">
            WORD
            <input 
              required 
              name="front_side"
              id='titleEditFormInput'
              type="text" 
              value={form.front_side}
              onChange={e => {
                onChange(e);
                /*if (titleInput) 
              return (titleErrorSpan.textContent = titleInput.validationMessage);*/}}
              className="addNewDeckForm__text addNewDeckForm__title-container"/>
            <span 
              className="login__text input-userNameEditProfile-error login__input-error" 
              id='titleSpanAddForm'> 
            </span>
          </label>
          <label className="addNewDeckForm__label">
            TRANSLATION
            <input
              name="back_side" 
              id='transcriptionEditFormInput'
              type="text" 
              value={form.back_side}
              onChange={e => {
                onChange(e);
                /*if (descriptionInput) 
              return (descriptionErrorSpan.textContent = descriptionInput.validationMessage)*/}} 
              className="addNewDeckForm__description-text addNewDeckForm__description-container"/>
            <span 
              className="login__text input-emailEditProfile-error login__input-error" 
              id='descriptionSpanAddForm'> 
            </span>
          </label>
          <label className="addNewDeckForm__label">
            DESCRIPTION OR PROMPT
            <input
              name="prompt" 
              id='descriptionEditFormInput'
              type="text" 
              value={form.prompt}
              onChange={e => {
                onChange(e);
                /*if (descriptionInput) 
              return (descriptionErrorSpan.textContent = descriptionInput.validationMessage)*/}} 
              className="addNewDeckForm__description-text addNewDeckForm__middle-input"/>
            <span 
              className="login__text input-emailEditProfile-error login__input-error" 
              id='descriptionSpanAddForm'> 
            </span>
          </label>
          <label className="addNewDeckForm__label">
            EXAMPLES OF USING
            <input
              name="example" 
              id='examplesEditFormInput'
              type="text" 
              value={form.example}
              onChange={e => {
                onChange(e);
                /*if (descriptionInput) 
              return (descriptionErrorSpan.textContent = descriptionInput.validationMessage)*/}} 
              className="addNewDeckForm__description-text addNewDeckForm__middle-input"/>
            <span 
              className="login__text input-emailEditProfile-error login__input-error" 
              id='descriptionSpanAddForm'> 
            </span>
          </label>
          <button 
            type="submit" 
            className="addNewDeckForm__addButton addNewDeckForm__button-disabled" 
            id='buttonSubmitEditWordForm'>
            SAVE
          </button>
        </form>
        <div className="addNewDeckForm__deck">
          <div className="addNewDeckForm__cover">
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditWordForm;
