import {
  SET_DECK,
  CLEAR_CURRENT_DECK,
  SET_WORD,
  CLEAR_CURRENT_WORD
} from "../../utils/constants";

const initialState = {
  currentDeck: {},
  currentWord: null
}

export const currentDeckReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECK:
      return {
        ...state,
        currentDeck: action.item,
        currentWord: null
      }
      case SET_WORD:
        return {
          ...state,
          currentWord: action.item,
        }
    case CLEAR_CURRENT_DECK:
      return initialState
    default: {
      return state
    }
  }
} 
