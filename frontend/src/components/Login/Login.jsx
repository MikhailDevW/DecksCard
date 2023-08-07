import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import { login, getUserData } from '../../services/actions/auth';
import logo from '../../images/add.png';
import plus from '../../images/Vector.png';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDecks } from '../../services/actions/cards';

function Login (props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {setShowLogin/*handleLogin, loginUser, userErrorMessage, setUserErrorMessage*/} = props;
  const emailInput = document.getElementById('emailLogin');
  const passwordInput = document.getElementById('passwordLogin');  
  const submitButton = document.getElementById('buttonLogin')
  const emailErrorSpan = document.getElementById('emailSpanLogin')
  const passwordErrorSpan = document.getElementById('passwordSpanLogin')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sendLogin, sendLoginRequest, sendLoginFailed } = useSelector(state => state.authReducer);

  /*function handleSubmit(e) {
    e.preventDefault();
    const data = {password, email};
    loginUser(data);
    handleLogin();
  }*/

  /*useEffect(() => {
    setUserErrorMessage('')
  }, [])*/
  function changeToRegister() {
    setShowLogin(false)
  }

  function validate() {
    if(emailInput && passwordInput && !(emailInput.validationMessage || passwordInput.validationMessage)) 
    return (submitButton.classList.remove('login__button-disabled'), submitButton.classList.add('login__button-active'), submitButton.disabled = false); 
    else if (emailInput && passwordInput) return (submitButton.classList.remove('login__button-active'), submitButton.classList.add('login__button-disabled'), submitButton.disabled = true)
  }

  function handleLogin(e) {
    e.preventDefault();
    const data = { 
      'email': email, 
      'password': password
    };
    console.log(data);
    dispatch(login(data));
  }

  useEffect(() => {
    if (sendLogin.access) {
      localStorage.setItem('token', sendLogin.access);
      console.log(localStorage);
      dispatch(getAllDecks());
 } }, [sendLogin]);
  
  return(
    <section className="login__background">
      <div className="login__container">
        <img
          src={plus}
          alt="Логотип"
          className="register__logo"
        />
        <p className="login__title">
          Greetings!
        </p>
        <form onSubmit={(e) => {handleLogin(e)}} className="login__form-container">
          <span className="login__text">
            E-mail
          </span>
          <input 
            formNoValidate
            required 
            id="emailLogin" 
            name="email" 
            placeholder="E-mail" 
            type="email" 
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              validate();
              if (emailInput) 
                return (emailErrorSpan.textContent = emailInput.validationMessage);}}
            className="login__input"/>
          <span 
            className="login__text input-emailLogin-error login__input-error" 
            id='emailSpanLogin'> 
          </span>
          <span className="login__text">
            Password
          </span>
          <input 
            formNoValidate
            required 
            id="passwordLogin" 
            name="password" 
            type="password" 
            placeholder="Password"
            autoComplete="on" 
            value={password} 
            onChange={e => {
              setPassword(e.target.value);
              validate();
              if (passwordInput) 
                return (passwordErrorSpan.textContent = passwordInput.validationMessage);
            }}
            className="login__input" />
          <span 
            className="login__text input-passwordLogin-error login__input-error" 
            id='passwordSpanLogin'> 
          </span>
          <button 
            type="submit"
            id="buttonLogin"
            disabled
            className="login__button login__button-active button_type_primary">
              LOGIN
          </button>
        </form>
        <div className="login__link-container">
          <p className="login__underbottom-text">
            Not registered yet?
          </p>
          <p 
            className="login__underbottom-text login__link"
            onClick={changeToRegister}>
              Register
          </p>
        </div>
      </div>  
    </section>
  )
}

export default Login;

/*
          {userErrorMessage !== '' && 
            <p className="login__text-error">
              {userErrorMessage}
            </p>
          }
*/