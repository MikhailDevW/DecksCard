import { NavLink } from 'react-router-dom';
import './Header.css';
import React from "react";

function Header(props) {
  const {loggedIn, handleLogout, closeRepeatMode, repeatMode } = props;

  return (
    <header className="header">
      <h1
        onClick={repeatMode ? closeRepeatMode : ''}
        className="header__title" ><span className={repeatMode ? "header__title3" : "header__title2"}>BrainDecks. </span>Excellent place to memorize words</h1>
      {loggedIn && 
        <button
          onClick={handleLogout}
          className="header__exitButton">
          EXIT
        </button>
      }
    </header>
    );
  }
  
  export default Header;
