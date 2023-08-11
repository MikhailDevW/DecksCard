import {
  GET_MY_DECKS,
  GET_MY_DECKS_FAILED,
  GET_MY_DECKS_SUCCESS,
  GET_DECK_INFO,
  GET_DECK_INFO_FAILED,
  GET_DECK_INFO_SUCCESS,
  ADD_DECK,
  ADD_DECK_FAILED,
  ADD_DECK_SUCCESS,
  EDIT_DECK,
  EDIT_DECK_FAILED,
  EDIT_DECK_SUCCESS,
  DELETE_DECK,
  DELETE_DECK_FAILED,
  DELETE_DECK_SUCCESS,

  ADD_CARD,
  ADD_CARD_FAILED,
  ADD_CARD_SUCCESS,
  EDIT_CARD,
  EDIT_CARD_FAILED,
  EDIT_CARD_SUCCESS,
  DELETE_CARD,
  DELETE_CARD_FAILED,
  DELETE_CARD_SUCCESS,
  GET_CARD_INFO,
  GET_CARD_INFO_FAILED,
  GET_CARD_INFO_SUCCESS,
  GET_TODAY_CARDS,
  GET_TODAY_CARDS_FAILED,
  GET_TODAY_CARDS_SUCCESS,
  GET_DECK_CARDS,
  GET_DECK_CARDS_FAILED,
  GET_DECK_CARDS_SUCCESS,
} from "../../utils/constants";
  
const initialState = {
  decksRequest: false,
  decksRequestFailed: false,
  decks: null,
  addDeckRequest: false,
  addDeckRequestFailed: false,
  addDeckRequestRes: null,
  editDeckRequest: false,
  editDeckRequestFailed: false,
  editDeckRequestRes: null,
  removeDeckRequest: false,
  removeDeckRequestFailed: false,
  removeDeckRequestRes: null,
  addCardRequest: false,
  addCardRequestFailed: false,
  addCardRequestRes: null,
  editCardRequest: false,
  editCardRequestFailed: false,
  editCardRequestRes: null,
  removeCardRequest: false,
  removeCardRequestFailed: false,
  removeCardRequestRes: null,
  getDeckCardsRequest: false,
  getDeckCardsRequestFailed: false,
  deckCards: null
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_DECKS: {
      return {
        ...state,
        decksRequest: true,
        decksRequestFailed: false,
      };
    }
    case GET_MY_DECKS_SUCCESS: {
      return { 
        ...state, 
        decks: action.decks, 
        decksRequest: false 
      };
    }
    case GET_MY_DECKS_FAILED: {
      return { 
        ...state,
        decksRequestFailed: true, 
        decksRequest: false 
      };
    }
    case ADD_DECK: {
      return {
        ...state,
        addDeckRequest: true,
        addDeckRequestFailed: false,
      };
    }
    case ADD_DECK_SUCCESS: {
      return {
        ...state,
        decks: [
          ...state.decks,
          action.newDeck
        ],
        addDeckRequest: false
      };
    }
    case ADD_DECK_FAILED: {
      return { 
        ...state, 
        addDeckRequestFailed: true, 
        addDeckRequest: false 
      };
    }
    case DELETE_DECK_SUCCESS: {
      console.log(action);
      let decksAfterDeleting = state.decks.filter(
        (item1) => (item1.slug !== action.ID)
      );
      console.log(action.ID);
      console.log(decksAfterDeleting);
      return {
        ...state,
        decks: [...decksAfterDeleting]
      };
    }
    case EDIT_DECK: {
      return {
        ...state,
        editDeckRequest: true,
        editDeckRequestFailed: false,
      };
    }
    case EDIT_DECK_SUCCESS: {
      let newDecks = state.decks.map(item => {if (item.slug === action.editedDeck.slug) {console.log (item); return action.editedDeck} else return item});
      return {
        ...state,
        decks: newDecks
      };
    }
    case EDIT_DECK_FAILED: {
      return { 
        ...state, 
        editDeckRequestFailed: true, 
        editDeckRequest: false 
      };
    }
    case ADD_CARD: {
      return {
        ...state,
        addCardRequest: true,
        addCardRequestFailed: false,
      };
    }
    case ADD_CARD_SUCCESS: {
      //let newDecks = state.decks.map(item => {if (item.slug === action.editedDeck.slug) {console.log (item); return action.editedDeck} else return item});
      return {
        ...state,
        addCardRequestRes: action.newCard,
        deckCards: [
          ...state.deckCards,
          action.newCard
        ],
      };
    }
    case ADD_CARD_FAILED: {
      return { 
        ...state,
        addCardRequestFailed: true, 
        addCardRequest: false 
      };
    }
    case GET_DECK_CARDS: {
      return {
        ...state,
        getDeckCardsRequest: true,
        getDeckCardsRequestFailed: false,
      };
    }
    case GET_DECK_CARDS_SUCCESS: {
      //let newDecks = state.decks.map(item => {if (item.slug === action.editedDeck.slug) {console.log (item); return action.editedDeck} else return item});
      return {
        ...state,
        deckCards: action.deckCards
      };
    }
    case GET_DECK_CARDS_FAILED: {
      return { 
        ...state,
        getDeckCardsRequestFailed: true, 
        getDeckCardsRequestt: false 
      };
    }
    case DELETE_CARD: {
      return {
        ...state,
        removeCardRequest: true,
        removeCardRequestFailed: false,
      };
    }
    case DELETE_CARD_SUCCESS: {
      console.log(action);
      let cardsAfterDeleting = state.deckCards.filter(
        (item1) => (item1.id !== action.deletedCard)
      );
      console.log(cardsAfterDeleting);
      return {
        ...state,
        deckCards: [...cardsAfterDeleting]
      };
    }
    case DELETE_CARD_FAILED: {
      return { 
        ...state,
        removeCardRequestFailed: true, 
        removeCardRequest: false 
      };
    }
    case EDIT_CARD: {
      return {
        ...state,
        editCardRequest: true,
        editCardRequestFailed: false,
      };
    }
    case EDIT_CARD_SUCCESS: {
      let newCards = state.deckCards.map(item => {if (item.id === action.editedCard.id) {console.log (item); return action.editedCard} else return item});
      return {
        ...state,
        deckCards: newCards
      };
    }
    case EDIT_CARD_FAILED: {
      return { 
        ...state, 
        editCardRequestFailed: true, 
        editCardRequest: false 
      };
    }
    default: {
      return state
    }
  }
}
