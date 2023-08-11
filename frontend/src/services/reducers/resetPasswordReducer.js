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

const initialState = {
  sendEmailRequest: false,
  sendEmailFailed: false,
  sendEmailRes: {},
  emailSend: false,
  sendPasswordRequest: false,
  sendPasswordFailed: false,
  sendPasswordRes: {}
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL: {
      return {
        ...state,
        sendEmailRequest: true,
        sendEmailFailed: false,
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return { 
        ...state, 
        sendEmailRes: action.sendEmailRes,
        sendEmailRequest: false,
        emailSend: true
      };
    }
    case SEND_EMAIL_FAILED: {
      return { 
        ...state, 
        sendEmailFailed: true, 
        sendEmailRequest: false 
      };
    }
    case REMOVE_EMAIL: {
      return {
        ...state,
        sendEmailRequest: false,
        sendEmailFailed: false,
        sendEmailRes: {}
      };
    }
    case SEND_PASSWORD: {
      return {
        ...state,
        sendPasswordRequest: true,
        sendPasswordFailed: false,
      };
    }
    case SEND_PASSWORD_SUCCESS: {
      return { 
        ...state, 
        sendPasswordRes: action.sendPasswordRes,
        sendPasswordRequest: false 
      };
    }
    case SEND_PASSWORD_FAILED: {
      return { 
        ...state, 
        sendPasswordFailed: true, 
        sendPasswordRequest: false 
      };
    }
    case REMOVE_PASSWORD: {
      return {
        ...state,
        sendPasswordRequest: false,
        sendPasswordFailed: false,
        sendPasswordRes: {},
        emailSend: false
      };
    }
    default: {
      return state
    }
  }
} 
