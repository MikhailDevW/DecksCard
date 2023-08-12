import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/add.png';
import './Register.css';
import { useSelector, useDispatch } from 'react-redux';
import { register, getUserData, removeRegister } from '../../services/actions/auth';

function Register(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const {/*registerUser, userErrorMessage, setUserErrorMessage*/setShowLogin} = props;
  const emailInput = document.getElementById('emailRegister');
  const passwordInput = document.getElementById('passwordRegister');
  const submitButton = document.getElementById('buttonRegister');
  const nameErrorSpan = document.getElementById('usernameSpanRegister');
  const emailErrorSpan = document.getElementById('emailSpanRegister');
  const passwordErrorSpan = document.getElementById('passwordSpanRegister');
  const firstNameErrorSpan = document.getElementById('firstNameSpanRegister');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sendRegister, sendRegisterRequest, sendRegisterFailed } = useSelector(state => state.authReducer);

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = { 
      'email': email, 
      'password': password,
      'first_name': '',
      'last_name': ''
    };
    console.log(data);
    dispatch(register(data));
  }

  function changeToLogin() {
    setShowLogin(true)
  }

  /*useEffect(() => {
    setUserErrorMessage('')
  }, [])*/

  React.useEffect(() => {
    if (sendRegister === 200) {
      changeToLogin();
    dispatch(removeRegister())};
  }, [sendRegister]);

  function validate() {
    if(
      emailInput 
      && passwordInput 
      && !(emailInput.validationMessage || passwordInput.validationMessage)) 
      return (
        submitButton.classList.remove('register__button-disabled'), 
        submitButton.classList.add('register__button-active'), 
        submitButton.disabled = false); 
    else if (
      emailInput
      && passwordInput) 
      return (
        submitButton.classList.remove('register__button-active'), 
        submitButton.classList.add('register__button-disabled'), 
        submitButton.disabled = true)
  }
  
  return (
    <>
      <section className='register__background'>
        <div className="register__container">
          <img
              src={logo}
              alt="Логотип"
              className="register__logo"
            />
          <p className="register__title">
            Greetings!!
          </p>
          <form 
            onSubmit={handleSubmit} 
            className="register__form-container">
            <span className="register__text">
              E-mail
            </span>
            <input 
              required
              className="register__input" 
              id="emailRegister" 
              name="email" 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={e => {
                setEmail(e.target.value);
                validate();
                if (emailInput) 
                  return (emailErrorSpan.textContent = emailInput.validationMessage);
              }} />
            <span 
              className="register__text input-emailRegister-error register__input-error" 
              id='emailSpanRegister'> </span>
            <span className="register__text">
              Password
            </span>
            <input 
              required
              className="register__input" 
              id="passwordRegister" 
              name="password" 
              type="password"
              placeholder="Password" 
              value={password} 
              onChange={e => {
                setPassword(e.target.value); 
                validate();
                if(passwordInput) 
                  return (passwordErrorSpan.textContent = passwordInput.validationMessage);
              }} />
            <span 
              className="register__text input-emailLRegister-error register__input-error" 
              id='passwordSpanRegister'> </span>

            <button 
              type="submit" 
              onSubmit={handleSubmit} 
              className="register__button register__button-active button_type_primary"
              disabled
              id="buttonRegister">
                Register
            </button>
          </form>
          <div className="register__link-container">
            <p className="register__underbottom-text">
              Already registered?
            </p>
            <p 
              onClick={changeToLogin}
              className="register__underbottom-text register__link">
                Login
            </p>
          </div>
        </div>  
      </section>
    </>
  );
}

export default Register;

/*
            {userErrorMessage !== '' && 
              <p className="register__text-error">
                {userErrorMessage}
              </p>
            }
*/
