import { api } from '../../utils/Api';

import {
  SEND_LOGIN_DATA,
  SEND_LOGIN_DATA_FAILED,
  SEND_LOGIN_DATA_SUCCESS,
  REMOVE_LOGIN_DATA,
  SEND_REGISTER_DATA,
  SEND_REGISTER_DATA_FAILED,
  SEND_REGISTER_DATA_SUCCESS,
  REMOVE_REGISTER_DATA,
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_FAILED_TOKEN,
  GET_USER_REQUEST_SUCCESS,
  SEND_UPDATED_USER_REQUEST,
  SEND_USER_REQUEST_FAILED,
  SEND_USER_REQUEST_SUCCESS,
  REMOVE_USER_DATA,
  SEND_LOGOUT_REQUEST,
  SEND_LOGOUT_REQUEST_FAILED,
  SEND_LOGOUT_REQUEST_SUCCESS,
  REMOVE_LOGOUT_DATA,
  SEND_REFRESH_TOKEN_REQUEST,
  SEND_REFRESH_TOKEN_REQUEST_FAILED, 
  SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
  REMOVE_REFRESH_TOKEN_DATA,
  REMOVE_ALL_AUTH_DATA
} from "../../utils/constants";

export function login(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_LOGIN_DATA
    })
    api.signIn(data).then( res  => {
      if (res) {
        dispatch({
          type: SEND_LOGIN_DATA_SUCCESS,
          sendLogin: res
        })
      } else {
        dispatch({
          type: SEND_LOGIN_DATA_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_LOGIN_DATA_FAILED
      })
    })
  }
}

export function removeLogin() {
  return {
    type: REMOVE_LOGIN_DATA
  }
}

export function removeAllAuthData() {
  return {
    type: REMOVE_ALL_AUTH_DATA
  }
}

export function register(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_REGISTER_DATA
    })
    api.signUp(data).then( res  => {
      if (res) {
        console.log(res);
        dispatch({
          type: SEND_REGISTER_DATA_SUCCESS,
          sendRegister: res
        })
      } else {
        dispatch({
          type: SEND_REGISTER_DATA_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_REGISTER_DATA_FAILED
      })
    })
  }
}

export function removeRegister() {
  return {
    type: REMOVE_REGISTER_DATA
  }
}

/*export function getUserData() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    api.getUserRequest().then( res  => {
      if (res) {
        dispatch({
          type: GET_USER_REQUEST_SUCCESS,
          userData: res
        })
      } *//*else if (res && !res.success) {
        dispatch({
            type: GET_USER_REQUEST_FAILED_TOKEN,
            userDataRequestRes: res
          })
      } *//*else {
        dispatch({
          type: GET_USER_REQUEST_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_USER_REQUEST_FAILED
      })
    })
  }
}*/

/*export function updateUserData(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_UPDATED_USER_REQUEST
    })
    api.editUserInfo(data).then( res  => {
      if (res) {
        dispatch({
          type: SEND_USER_REQUEST_SUCCESS,
          newUserData: res
        })
      } else {
        dispatch({
          type: SEND_USER_REQUEST_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_USER_REQUEST_FAILED
      })
    })
  }
}*/

/*export function logOut() {
  return function(dispatch) {
    dispatch({
      type: SEND_LOGOUT_REQUEST
    })
    api.signOut().then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_LOGOUT_REQUEST_SUCCESS,
          logOutRequest: res
        })
      } else {
        dispatch({
          type: SEND_LOGOUT_REQUEST_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_LOGOUT_REQUEST_FAILED
      })
    })
  }
}*/

/*export function removeLogOutData() {
  return {
    type: REMOVE_LOGOUT_DATA
  }
}*/

export function removeUserData() {
  return {
    type: REMOVE_USER_DATA
  }
} 

/*export function getNewToken() {
  return function(dispatch) {
    dispatch({
      type: SEND_REFRESH_TOKEN_REQUEST
    })
    api.refreshToken(localStorage.getItem('refreshToken')).then( res  => {
      if (res && res.success) {
        dispatch({
          type: SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
          refreshTokenRequest: res
        })
      } else {
        dispatch({
          type: SEND_REFRESH_TOKEN_REQUEST_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_REFRESH_TOKEN_REQUEST_FAILED
      })
    })
  }
}

export function removeTokenRequest() {
  return {
    type: REMOVE_REFRESH_TOKEN_DATA
  }
}*/
