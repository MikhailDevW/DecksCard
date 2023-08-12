<<<<<<< HEAD
import { combineReducers } from 'redux';
import { currentDeckReducer } from "./currentDeckReducer";
/*import { getUserFlowersReducer } from "./getUserFlowersReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";*/
import { cardsReducer } from "./cardsReducer";
import { authReducer } from "./authReducer";
//import {locationReducer} from './locationReducer';

export const rootReducer = combineReducers({
  cardsReducer,
  authReducer,
  currentDeckReducer
  /*getUserFlowersReducer,
  currentFlowerReducer,
  resetPasswordReducer,
  locationReducer*/
}) 
=======
import { combineReducers } from 'redux';
import { currentDeckReducer } from "./currentDeckReducer";
/*import { getUserFlowersReducer } from "./getUserFlowersReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";*/
import { cardsReducer } from "./cardsReducer";
import { authReducer } from "./authReducer";
//import {locationReducer} from './locationReducer';

export const rootReducer = combineReducers({
  cardsReducer,
  authReducer,
  currentDeckReducer
  /*getUserFlowersReducer,
  currentFlowerReducer,
  resetPasswordReducer,
  locationReducer*/
}) 
>>>>>>> 6e74c0a3aec6ba4adcc65121d292aafa40b04daf
