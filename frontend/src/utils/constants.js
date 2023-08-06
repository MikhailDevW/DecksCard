export const bazeUrl = "http://decksapi.pythonanywhere.com/api";
// http://185.22.61.183/api/v1/dashboard/
// http://decksapi.pythonanywhere.com/api/v1/auth/signup/

export const ERROR_MESSAGE = {
  DATA_RECEIVE_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  SIGNUP_ERROR: 'При обработке данных что-то пошло не так. Проверьте введенные данные и попробуйте еще раз.',
  AUTH_ERROR: 'Что-то не так с авторизацией. Пожалуйста, войдите в свой профиль.',
  SOMETHING_WRONG: 'Ошибка по умолчанию.',
  SAME_EMAIL: 'Такой email уже существует.'
};

export const URL_PATTERN = /^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

export const SEND_USER_CARDS_REQUEST = 'SEND_USER_CARDS_REQUEST';
export const SEND_USER_CARDS_REQUEST_FAILED = 'SEND_USER_CARDS_REQUEST_FAILED';
export const SEND_USER_CARDS_REQUEST_SUCCESS = 'SEND_USER_CARDS_REQUEST_SUCCESS';
export const REMOVE_USER_CARDS = 'REMOVE_USER_CARDS';
export const SET_CARD = 'SET_CARD';
export const CLEAR_CURRENT_CARD = 'CLEAR_CURRENT_CARD';
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const REMOVE_EMAIL = 'REMOVE_EMAIL';
export const SEND_REGISTER_DATA = 'SEND_REGISTER_DATA';
export const SEND_REGISTER_DATA_FAILED = 'SEND_REGISTER_DATA_FAILED';
export const SEND_REGISTER_DATA_SUCCESS = 'SEND_REGISTER_DATA_SUCCESS';
export const REMOVE_REGISTER_DATA = 'REMOVE_REGISTER_DATA';
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const SEND_LOGIN_DATA_FAILED = 'SEND_LOGIN_DATA_FAILED';
export const SEND_LOGIN_DATA_SUCCESS = 'SEND_LOGIN_DATA_SUCCESS';
export const REMOVE_LOGIN_DATA = 'REMOVE_LOGIN_DATA';
export const SEND_PASSWORD = 'SEND_PASSWORD';
export const SEND_PASSWORD_FAILED = 'SEND_PASSWORD_FAILED';
export const SEND_PASSWORD_SUCCESS = 'SEND_PASSWORD_SUCCESS';
export const REMOVE_PASSWORD = 'REMOVE_PASSWORD';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';
export const GET_USER_REQUEST_FAILED_TOKEN = 'GET_USER_REQUEST_FAILED_TOKEN';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const SEND_UPDATED_USER_REQUEST = 'SEND_UPDATED_USER_REQUEST';
export const SEND_USER_REQUEST_FAILED = 'SEND_USER_REQUEST_FAILED';
export const SEND_USER_REQUEST_SUCCESS = 'SEND_USER_REQUEST_SUCCESS';
export const SEND_LOGOUT_REQUEST = 'SEND_LOGOUT_USER_REQUEST';
export const SEND_LOGOUT_REQUEST_FAILED = 'SEND_LOGOUT_REQUEST_FAILED';
export const SEND_LOGOUT_REQUEST_SUCCESS = 'SEND_LOGOUT_REQUEST_SUCCESS';
export const REMOVE_LOGOUT_DATA = 'REMOVE_LOGOUT_DATA';
export const SEND_REFRESH_TOKEN_REQUEST = 'SEND_REFRESH_TOKEN_REQUEST';
export const SEND_REFRESH_TOKEN_REQUEST_FAILED = 'SEND_REFRESH_TOKEN_REQUEST_FAILED';
export const SEND_REFRESH_TOKEN_REQUEST_SUCCESS = 'SEND_REFRESH_TOKEN_REQUEST_SUCCESS';
export const REMOVE_REFRESH_TOKEN_DATA = 'REMOVE_REFRESH_TOKEN_DATA';
/*export const SET_LOCATION = 'SET_LOCATION';
export const ON_CLICK = 'ON_CLICK';
export const REMOVE_ON_CLICK = 'REMOVE_ON_CLICK';
export const REMOVE_LOCATIONS = 'REMOVE_LOCATIONS';*/

export const GET_MY_DECKS = 'GET_MY_DECKS';
export const GET_MY_DECKS_FAILED = 'GET_MY_DECKS_FAILED';
export const GET_MY_DECKS_SUCCESS = 'GET_MY_DECKS_SUCCESS';
export const GET_DECK_INFO = 'GET_DECK_INFO';
export const GET_DECK_INFO_FAILED = 'GET_DECK_INFO_FAILED';
export const GET_DECK_INFO_SUCCESS = 'GET_DECK_INFO_SUCCESS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_DECK_FAILED = 'ADD_DECK_FAILED';
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const EDIT_DECK = 'EDIT_DECK';
export const EDIT_DECK_FAILED = 'EDIT_DECK_FAILED';
export const EDIT_DECK_SUCCESS = 'EDIT_DECK_SUCCESS';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_DECK_FAILED = 'DELETE_DECK_FAILED';
export const DELETE_DECK_SUCCESS = 'DELETE_DECK_SUCCESS';

export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_FAILED = 'ADD_CARD_FAILED';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const EDIT_CARD = 'EDIT_CARD';
export const EDIT_CARD_FAILED = 'EDIT_CARD_FAILED';
export const EDIT_CARD_SUCCESS = 'EDIT_CARD_SUCCESS';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_CARD_FAILED = 'DELETE_CARD_FAILED';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const GET_TODAY_CARDS = 'GET_TODAY_CARDS';
export const GET_TODAY_CARDS_FAILED = 'GET_TODAY_CARDS_FAILED';
export const GET_TODAY_CARDS_SUCCESS = 'GET_TODAY_CARDS_SUCCESS';
export const GET_CARD_INFO = 'GET_CARD_INFO';
export const GET_CARD_INFO_FAILED = 'GET_CARD_INFO_FAILED';
export const GET_CARD_INFO_SUCCESS = 'GET_CARD_INFO_SUCCESS';
export const GET_DECK_CARDS = 'GET_DECK_CARDS';
export const GET_DECK_CARDS_FAILED = 'GET_DECK_CARDS_FAILED';
export const GET_DECK_CARDS_SUCCESS = 'GET_DECK_CARDS_SUCCESS';

export const SET_DECK = 'SET_DECK';
export const CLEAR_CURRENT_DECK = 'CLEAR_CURRENT_DECK';
export const SET_WORD = 'SET_WORD';
export const CLEAR_CURRENT_WORD = 'CLEAR_CURRENT_WORD';