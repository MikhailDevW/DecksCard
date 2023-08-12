import { combineReducers } from 'redux';
import { currentDeckReducer } from "./currentDeckReducer";
/*import { resetPasswordReducer } from "./resetPasswordReducer";*/
import { cardsReducer } from "./cardsReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  cardsReducer,
  authReducer,
  currentDeckReducer
}) 