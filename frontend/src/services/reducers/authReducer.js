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
    GET_USER_REQUEST_SUCCESS,
    SEND_UPDATED_USER_REQUEST,
    SEND_USER_REQUEST_FAILED,
    GET_USER_REQUEST_FAILED_TOKEN,
    SEND_USER_REQUEST_SUCCESS,
    REMOVE_USER_DATA,
    SEND_LOGOUT_REQUEST,
    SEND_LOGOUT_REQUEST_FAILED,
    SEND_LOGOUT_REQUEST_SUCCESS,
    REMOVE_LOGOUT_DATA,
    SEND_REFRESH_TOKEN_REQUEST,
    SEND_REFRESH_TOKEN_REQUEST_FAILED, 
    SEND_REFRESH_TOKEN_REQUEST_SUCCESS,
    REMOVE_REFRESH_TOKEN_DATA
  } from "../../utils/constants";
  
  const initialState = {
    sendLoginRequest: false,
    sendLoginFailed: false,
    sendLogin: {},
    sendRegisterRequest: false,
    sendRegisterFailed: false,
    sendRegister: {},
    getUserDataRequest: false,
    getUserDataRequestFailed: false,
    updateUserDataRequest: false,
    updateUserDataRequestFailed: false,
    userDataRequestRes: {},
    updateUserData: {},
    user: null,
    sendLogOutRequest: false,
    sendLogOutRequestFailed: false,
    logOutRequest: {},
    sendRefreshTokenRequest: false,
    sendRefreshTokenFailed: false,
    refreshToken: {}
  }
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_LOGIN_DATA: {
        return {
          ...state,
          sendLoginRequest: true,
          sendLoginFailed: false,
        };
      }
      case SEND_LOGIN_DATA_SUCCESS: {
        return { 
          ...state, 
          sendLogin: action.sendLogin,
          //user: action.sendLogin.user,
          sendLoginRequest: false 
        };
      }
      case SEND_LOGIN_DATA_FAILED: {
        return { 
          ...state, 
          sendLoginFailed: true, 
          sendLoginRequest: false 
        };
      }
      case REMOVE_LOGIN_DATA: {
        return { 
          ...state, 
          sendLoginRequest: false,
          sendLoginFailed: false,
          sendLogin: {},
        };
      }
      case SEND_REGISTER_DATA: {
        return {
          ...state,
          sendRegisterRequest: true,
          sendRegisterFailed: false,
        };
      }
      case SEND_REGISTER_DATA_SUCCESS: {
        return { 
          ...state, 
          sendRegister: action.sendRegister,
          //user: action.sendRegister.user,
          sendRegisterRequest: false 
        };
      }
      case SEND_REGISTER_DATA_FAILED: {
        return { 
          ...state, 
          sendRegisterFailed: true, 
          sendRegisterRequest: false 
        };
      }
      case REMOVE_REGISTER_DATA: {
        return { 
          ...state, 
          sendRegisterRequest: false,
          sendRegisterFailed: false,
          sendRegister: {},
        };
      }
      case GET_USER_REQUEST: {
        return {
          ...state,
          getUserDataRequest: true,
          getUserDataRequestFailed: false,
        };
      }
      case GET_USER_REQUEST_SUCCESS: {
        return { 
          ...state, 
          userDataRequestRes: action.userData,
          user: action.userData.user,
          getUserDataRequest: false 
        };
      }
      case GET_USER_REQUEST_FAILED: {
        return { 
          ...state, 
          userDataRequestRes: action.userData,
          getUserDataRequestFailed: true, 
          getUserDataRequest: false 
        };
      }
      case GET_USER_REQUEST_FAILED_TOKEN: {
        return { 
          ...state, 
          userDataRequestRes: action,
          getUserDataRequest: false 
        };
      }
      case SEND_UPDATED_USER_REQUEST: {
        return {
          ...state,
          updateUserDataRequest: true,
          updateUserDataRequestFailed: false,
        };
      }
      case SEND_USER_REQUEST_SUCCESS: {
        return { 
          ...state, 
          updateUserData: action.newUserData,
          user: action.newUserData.user,
          updateUserDataRequest: false 
        };
      }
      case SEND_USER_REQUEST_FAILED: {
        return { 
          ...state, 
          updateUserDataRequestFailed: true, 
          updateUserDataRequest: false 
        };
      }
      case REMOVE_USER_DATA: {
        return { 
          ...state, 
          getUserDataRequest: false,
          getUserDataRequestFailed: false,
          updateUserDataRequest: false,
          updateUserDataRequestFailed: false,
          //userDataRequestRes: {},
          updateUserData: {},
          user: null
        };
      }
      case SEND_LOGOUT_REQUEST: {
        return {
          ...state,
          sendLogOutRequest: true,
          sendLogOutRequestFailed: false,
        };
      }
      case SEND_LOGOUT_REQUEST_SUCCESS: {
        return { 
          ...state, 
          logOutRequest: action.logOutRequest,
          sendLogOutRequest: false 
        };
      }
      case SEND_LOGOUT_REQUEST_FAILED: {
        return { 
          ...state, 
          sendLogOutRequestFailed: true, 
          sendLogOutRequest: false 
        };
      }
      case REMOVE_LOGOUT_DATA: {
        return { 
          ...state, 
          sendLogOutRequest: false,
          sendLogOutRequestFailed: false,
          logOutRequest: {},
        };
      }
      case SEND_REFRESH_TOKEN_REQUEST: {
        return {
          ...state,
          sendRefreshTokenRequest: true,
          sendRefreshTokenFailed: false,
        };
      }
      case SEND_REFRESH_TOKEN_REQUEST_SUCCESS: {
        return { 
          ...state, 
          refreshToken: action.refreshTokenRequest,
          sendRegisterRequest: false 
        };
      }
      case SEND_REFRESH_TOKEN_REQUEST_FAILED: {
        return { 
          ...state, 
          sendRefreshTokenFailed: true, 
          sendRefreshTokenRequest: false 
        };
      }
      case REMOVE_REFRESH_TOKEN_DATA: {
        return { 
          ...state, 
          sendRefreshTokenRequest: false,
          sendRefreshTokenFailed: false,
          refreshToken: {},
        };
      }
      default: {
        return state
      }
    }
  } 
  