import { api } from '../../utils/Api';

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
  REMOVE_DECK_INFO,

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

export function getAllDecks() {
  return function(dispatch) {
    dispatch({
      type: GET_MY_DECKS
    })
    api.getUserDecksRequest().then( res  => {
      if (res) {
        dispatch({
          type: GET_MY_DECKS_SUCCESS,
          decks: res
        })
      } else {
        dispatch({
          type: GET_MY_DECKS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_MY_DECKS_FAILED
      })
    })
  }
} 

export function addNewDeck(data) {
  return function(dispatch) {
    dispatch({
      type: ADD_DECK
    })
    api.addNewDeck(data).then( res  => {
      if (res) {
        dispatch({
          type: ADD_DECK_SUCCESS,
          newDeck: res
        })
      } else {
        dispatch({
          type: ADD_DECK_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: ADD_DECK_FAILED
      })
    })
  }
}

export function editDeck(deckID, data) {
  return function(dispatch) {
    dispatch({
      type: EDIT_DECK
    })
    api.editDeckInfo(deckID, data).then( res  => {
      if (res) {
        dispatch({
          type: EDIT_DECK_SUCCESS,
          editedDeck: res
        })
      } else {
        dispatch({
          type: EDIT_DECK_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: EDIT_DECK_FAILED
      })
    })
  }
} 

export function deleteDeck(deckID) {
  return function(dispatch) {
    dispatch({
      type: DELETE_DECK
    })
    api.removeDeck(deckID).then( res  => {
      if (res === 204) {
        console.log(res);
        console.log(deckID);
        dispatch({
          type: DELETE_DECK_SUCCESS,
          ID: deckID
        })
      } else {
        dispatch({
          type: DELETE_DECK_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: DELETE_DECK_FAILED
      })
    })
  }
}

export function getDeckInfo() {
  return function(dispatch) {
    dispatch({
      type: GET_DECK_INFO
    })
    api.getDeckInfo().then( res  => {
      if (res) {
        dispatch({
          type: GET_DECK_INFO_SUCCESS,
          currentDeck: res
        })
      } else {
        dispatch({
          type: GET_DECK_INFO_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_DECK_INFO_FAILED
      })
    })
  }
} 

export function addNewCard(deckID, data) {
  /*console.log(deckID);
  console.log(data);*/
  return function(dispatch) {
    console.log(deckID);
    console.log(data);
    dispatch({
      type: ADD_CARD
    })
    api.addCard(deckID, data).then( res  => {
      if (res) {
        dispatch({
          type: ADD_CARD_SUCCESS,
          newCard: res
        })
      } else {
        dispatch({
          type: ADD_CARD_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: ADD_CARD_FAILED
      })
    })
  }
}

export function editCard(deckID, cardID, data) {
  return function(dispatch) {
    dispatch({
      type: EDIT_CARD
    })
    api.editCard(deckID, cardID, data).then( res  => {
      if (res) {
        dispatch({
          type: EDIT_CARD_SUCCESS,
          editedCardRes: res,
          editedCard: res
        })
      } else {
        dispatch({
          type: EDIT_CARD_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: EDIT_CARD_FAILED
      })
    })
  }
} 

export function deleteCard(deckID, cardID) {
  return function(dispatch) {
    dispatch({
      type: DELETE_CARD
    })
    api.removeCard(deckID, cardID).then( res  => {
      if (res === (204 || 200)) {
        dispatch({
          type: DELETE_CARD_SUCCESS,
          deletedCard: cardID,
          deletedCardRes: res,
        })
      } else {
        dispatch({
          type: DELETE_CARD_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: DELETE_CARD_FAILED
      })
    })
  }
}

export function getTodayCardsInfo(deckID) {
  return function(dispatch) {
    dispatch({
      type: GET_TODAY_CARDS
    })
    api.getTodayCards(deckID).then( res  => {
      if (res) {
        dispatch({
          type: GET_TODAY_CARDS_SUCCESS,
          todayCards: res
        })
      } else {
        dispatch({
          type: GET_TODAY_CARDS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_TODAY_CARDS_FAILED
      })
    })
  }
}

export function getDeckCardsInfo(deckID) {
  return function(dispatch) {
    dispatch({
      type: GET_DECK_CARDS
    })
    api.getDeckCards(deckID).then( res  => {
      if (res) {
        console.log(res);
        dispatch({
          type: GET_DECK_CARDS_SUCCESS,
          deckCards: res
        })
      } else {
        dispatch({
          type: GET_DECK_CARDS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_DECK_CARDS_FAILED
      })
    })
  }
}

export function getCardInfo(deckID, cardID) {
  return function(dispatch) {
    dispatch({
      type: GET_CARD_INFO
    })
    api.getCardInfo(deckID, cardID).then( res  => {
      if (res) {
        dispatch({
          type: GET_CARD_INFO_SUCCESS,
          currentCardInfo: res
        })
      } else {
        dispatch({
          type: GET_CARD_INFO_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_CARD_INFO_FAILED
      })
    })
  }
}

export function removeAllDecksData() {
  return {
    type: REMOVE_DECK_INFO
  }
}
