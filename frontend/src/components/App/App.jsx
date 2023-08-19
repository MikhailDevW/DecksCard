import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../pages/Main/Main.jsx';
import PageNotFound from '../../pages/PageNotFound/PageNotFound.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { api } from '../../utils/Api';
import ProtectedRoute from '../ProtectedRoute';
import { getAllDecks } from '../../services/actions/cards';
/*import { ERROR_MESSAGE } from '../../utils/constants.js';*/
//import { getUserData } from '../../services/actions/auth';
import './App.css';
import { setCurrentDeck } from "../../services/actions/currentDeck.js";

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  //const [userErrorMessage, setUserErrorMessage] = useState('');
  const [addDeckModalIsOpen, setAddDeckModalIsOpen] = React.useState(false);
  const [editDeckModalIsOpen, setEditDeckModalIsOpen] = React.useState(false);
  const [addWordModalIsOpen, setAddWordModalIsOpen] = React.useState(false);
  const [editWordModalIsOpen, setEditWordModalIsOpen] = React.useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const { decks, deckCards } = useSelector(state => state.cardsReducer);
  const { currentDeck } = useSelector(state => state.currentDeckReducer);
  const { userDataRequestRes, sendLogin } = useSelector(state => state.authReducer);

  useEffect(() => {
    // console.log(sendLogin.authtoken !== undefined);
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
      console.log(localStorage.getItem('token'));
      dispatch(getAllDecks())}
  }, [])

  useEffect(() => {
    if (decks === null) {
      console.log('not LoggedIn');
      setLoggedIn(false);}
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && decks !== null) {console.log(loggedIn);
      setLoggedIn(true);
    }
  }, [decks])

  useEffect(() => {
    if (decks && decks !== null && decks.length > 0) {
      console.log(decks[0]);
      dispatch(setCurrentDeck(decks[0], 0))
    }
  }, [decks])

  useEffect(() => {
    console.log(deckCards)
  }, [currentDeck])

  /*useEffect(() => {
    if (decks !== null) {
      console.log('LoggedIn');
      setLoggedIn(true);}
    else {console.log(loggedIn);
      setLoggedIn(false);
    }
  }, [decks])*/

  /*useEffect(() => {
    console.log(currentDeck);
  }, [currentDeck])*/

  /*useEffect(() => {
    console.log(currentDeck);
  }, [])

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn])*/

  useEffect(() => {
    console.log(decks);
  }, [decks])

  function closeModal() {
    setAddDeckModalIsOpen(false);
    setEditDeckModalIsOpen(false);
    setAddWordModalIsOpen(false);
    setEditWordModalIsOpen(false);
  }

  /*useEffect(() => {
    if (sendLogin.access) {
      localStorage.setItem('token', sendLogin.access);
      dispatch(getAllDecks());
      //navigate('/profile');
 } }, [sendLogin]);*/

  /*useEffect(()=> {
    dispatch(getPlants());
  }, [])*/

  /*useEffect(() => {
    if (sendLogin.auth_token && (userDataRequestRes === {})) {
      console.log(localStorage);
      dispatch(getUserData());
 } }, [sendLogin]);*/

  // проверка токена
/*  function handleCheckToken() {
    mainApi.checkToken()
    .then(() => {
      setLoggedIn(true);
      getUserData()
    })
    .catch((err) => {
      setLoggedIn(false);
      console.log(err)
    })
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  useEffect(() => {
    setUserErrorMessage('')
  }, [])*/

  return (
    <>
      <div className="page">
        <Routes>
          <Route 
            exact path="/" 
            element={
              <Main 
                loggedIn={loggedIn}
                addDeckModalIsOpen={addDeckModalIsOpen}
                setAddDeckModalIsOpen={setAddDeckModalIsOpen}
                editDeckModalIsOpen={editDeckModalIsOpen}
                setEditDeckModalIsOpen={setEditDeckModalIsOpen}
                addWordModalIsOpen={addWordModalIsOpen}
                setAddWordModalIsOpen={setAddWordModalIsOpen}
                editWordModalIsOpen={editWordModalIsOpen}
                setEditWordModalIsOpen={setEditWordModalIsOpen}
                closeModal={closeModal}
                setLoggedIn={setLoggedIn}/>
            }>  
          </Route>
          <Route 
            path="*" 
            element={
              <PageNotFound/>
            }>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
