import { NavLink } from 'react-router-dom';
import './Header.css';
import React from "react";

function Header(props) {
  const {loggedIn, handleLogout} = props;

  return (
    <header className="header">
      <h1 className="header__title"><span>BrainDecks. </span>Excellent place to memorize words</h1>
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
