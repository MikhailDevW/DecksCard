import { api } from '../../utils/Api';

import {
  SEND_EMAIL,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,
  REMOVE_EMAIL,
  SEND_PASSWORD,
  SEND_PASSWORD_FAILED,
  SEND_PASSWORD_SUCCESS,
  REMOVE_PASSWORD
} from "../../utils/constants";

export function sendEmailToResetPassword(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_EMAIL
    })
    api.requestToResetPassword(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          sendEmailRes: res
        })
      } else {
        dispatch({
          type: SEND_EMAIL_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_EMAIL_FAILED
      })
    })
  }
}

export function removeEmail() {
  return {
    type: REMOVE_EMAIL
  }
} 

export function resetPassword(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_PASSWORD
    })
    api.resetPassword(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_PASSWORD_SUCCESS,
          sendPasswordRes: res
        })
      } else {
        dispatch({
          type: SEND_PASSWORD_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_PASSWORD_FAILED
      })
    })
  }
}

export function removePassword() {
  return {
    type: REMOVE_PASSWORD
  }
} 