import React from 'react';
import { useNavigate } from "react-router-dom";
import './PageNotFound.css';
import logo from '../../images/add.png';
import { Link } from 'react-router-dom';

function PageNotFound () {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="pageNotFound">
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="pageNotFound__logo"
        />
      </Link>
      <h3 className="pageNotFound__title">404</h3>
      <p className="pageNotFound__text">
        Увы, такой страницы нет
      </p>
      <p 
        className="pageNotFound__text pageNotFound__link" 
        onClick={goBack} >
          Вернитесь назад и попробуйте снова
      </p>
    </section>
  )
}

export default PageNotFound;
