import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './EditDeckForm.css';
import { addNewDeck, removeCard, editCard, editDeck } from '../../services/actions/cards.js';
import { useSelector, useDispatch } from 'react-redux';

function EditDeckForm ({editDeckModalIsOpen, closeEditDeckModal}) {
  const dispatch = useDispatch();
  const { decks } = useSelector(state => state.cardsReducer);
  const { currentDeck } = useSelector(state => state.currentDeckReducer);
  const [form, setValue] = useState({ title: '', description: '' });
  const titleInputEditForm = document.getElementById('titleEditDeckFormInput');
  const descriptionInputEditForm = document.getElementById('descriptionEditDeckFormInput');
  const submitEditButton = document.getElementById('buttonSubmitEditDeckForm');
  const titleErrorSpan = document.getElementById('titleSpanEditDeckForm');
  const descriptionErrorSpan = document.getElementById('descriptionSpanEditDeckForm');

  function validate() {
    if(titleInputEditForm && descriptionInputEditForm && !(titleInputEditForm.validationMessage || descriptionInputEditForm.validationMessage)) 
    return (submitEditButton.classList.remove('addNewDeckForm__button-disabled'), submitEditButton.classList.add('editDeckForm__button-active'), submitEditButton.disabled = false); 
    else if (titleInputEditForm && descriptionInputEditForm) return (submitEditButton.classList.remove('editDeckForm__button-active'), submitEditButton.classList.add('addNewDeckForm__button-disabled'), submitEditButton.disabled = true)
  }

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    validate()
  };

  useEffect(()=> {
    if (editDeckModalIsOpen && currentDeck) {
    setValue({ ...form, title: currentDeck.title, description: currentDeck.description });
    }
    if (editDeckModalIsOpen && submitEditButton !== null) {
      submitEditButton.classList.remove('editDeckForm__button-active');
      submitEditButton.classList.add('addNewDeckForm__bButton-disabled');
      submitEditButton.disabled = true;
    };
    if (editDeckModalIsOpen && titleErrorSpan && titleErrorSpan.textContent !== null) {
    titleErrorSpan.textContent = ''; 
    }
    if (editDeckModalIsOpen && descriptionErrorSpan && descriptionErrorSpan.textContent !== null) {
      descriptionErrorSpan.textContent = ''; 
    }
  }, [editDeckModalIsOpen])

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editDeck(currentDeck.slug, form));
    closeEditDeckModal()
  }

  /*useEffect(()=> {
    if (addNewDeckModalIsOpen && decks) {
    setValue({ ...form, title: `DECK #${decks.length + 1}`, descriptionInput: '' });
    console.log(`DECK #${decks.length + 1}`);
    console.log(`DECK #${decks.length + 1}`);
    titleInput.value = `DECK #${decks.length + 1}`;
  }
  }, [addNewDeckModalIsOpen])*/

  return(
    <div className="addNewDeckForm">
      <h2 className="addNewDeckForm__title">
        EDIT DECK
      </h2>
      <div className="addNewDeckForm__container">
        <form 
          onSubmit={handleSubmit} 
          className="addNewDeckForm__form">
          <label className="addNewDeckForm__label">
            DECK TITLE
            <input 
              required 
              name="title"
              id='titleEditDeckFormInput'
              type="text" 
              value={form.title}
              onChange={e => {
                onChange(e);
                if (titleInputEditForm) 
                return (titleErrorSpan.textContent = titleInputEditForm.validationMessage);}}
              className="addNewDeckForm__text addNewDeckForm__title-container"/>
            <span 
              className="login__text input-userNameEditProfile-error login__input-error" 
              id='titleSpanEditDeckForm'> 
            </span>
          </label>
          <label className="addNewDeckForm__label">
            DESCRIPTION
          <input
            name="description" 
            id='descriptionEditDeckFormInput'
            type="text" 
            value={form.description}
            onChange={e => {
              onChange(e);
              if (descriptionInputEditForm) 
              return (descriptionErrorSpan.textContent = descriptionInputEditForm.validationMessage)}} 
            className="addNewDeckForm__description-text addNewDeckForm__description-container"/>
          <span 
            className="login__text input-emailEditProfile-error login__input-error" 
            id='descriptionSpanEditDeckForm'> 
          </span>
        </label>
        <button 
          type="submit" 
          className="addNewDeckForm__addButton addNewDeckForm__button-disabled" id='buttonSubmitEditDeckForm'>
          EDIT
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

export default EditDeckForm;
