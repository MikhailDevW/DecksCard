import {
  SET_DECK,
  CLEAR_CURRENT_DECK,
  SET_WORD,
  CLEAR_CURRENT_WORD
} from "../../utils/constants";

export function setCurrentDeck(data, index) {
  return {
    type: SET_DECK,
    item: {...data, number: index + 1}
  }
}

export function removeCurrentDeck() {
  return {
    type: CLEAR_CURRENT_DECK
  }
} 

export function setCurrentWord(data) {
  return {
    type: SET_WORD,
    item: data
  }
}

export function removeCurrentWord() {
  return {
    type: CLEAR_CURRENT_WORD
  }
} 
